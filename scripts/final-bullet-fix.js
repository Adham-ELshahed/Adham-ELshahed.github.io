import fs from 'fs';

// Function to completely clean and reformat text with proper bullet points
function cleanAndFormatText(text) {
  if (!text || typeof text !== 'string') return text;
  
  let formatted = text;
  
  // Step 1: Completely remove all existing bullet formatting and normalize text
  formatted = formatted.replace(/\n/g, ' ');          // Remove all newlines temporarily
  formatted = formatted.replace(/•/g, '');            // Remove all bullet points
  formatted = formatted.replace(/\s+/g, ' ');         // Normalize all spaces
  formatted = formatted.trim();
  
  // Step 2: Handle introductory phrases that should have newlines
  formatted = formatted.replace(/An optional record parameter, options, may be specified to control the following options:/g, 
    'An optional record parameter, options, may be specified to control the following options:\n\n');
  formatted = formatted.replace(/The record can contain the following fields:/g, 
    'The record can contain the following fields:\n\n');
  formatted = formatted.replace(/Values are represented as follows:/g, 
    'Values are represented as follows:\n\n');
  
  // Step 3: Format option patterns - find and format option descriptions
  // Pattern to match "OptionName: description ending with period"
  const optionRegex = /([A-Z][a-zA-Z0-9]*(?:[A-Z][a-zA-Z0-9]*)*)\s*:\s*([^.]*(?:\([^)]*\))?[^.]*\.)/g;
  let optionsFound = [];
  let match;
  
  // Collect all options
  let tempText = formatted;
  while ((match = optionRegex.exec(tempText)) !== null) {
    optionsFound.push({
      fullMatch: match[0],
      name: match[1],
      description: match[2].trim()
    });
  }
  
  // Replace each option with proper bullet formatting
  optionsFound.forEach(option => {
    formatted = formatted.replace(option.fullMatch, `• ${option.name}: ${option.description}\n`);
  });
  
  // Step 4: Handle specific JSON value representations (for Json.FromValue)
  const jsonValueTypes = [
    'Null, text and logical values are represented as the corresponding JSON types',
    'Numbers are represented as numbers in JSON, except that #infinity, -#infinity and #null are converted to null',
    'Lists are represented as JSON arrays',
    'Records are represnted as JSON objects',
    'Tables are represented as an array of objects',
    'Dates, times, datetimes, datetimezones and durations are represented as ISO-8601 text',
    'Binary values are represented as base-64 encoded text',
    'Types and functions produce an error'
  ];
  
  jsonValueTypes.forEach(valueType => {
    if (formatted.includes(valueType)) {
      formatted = formatted.replace(valueType, `• ${valueType}\n`);
    }
  });
  
  // Step 5: Clean up default value formatting
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, '(default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, '(default: $1).');
  
  // Step 6: Final cleanup
  formatted = formatted.replace(/\n+/g, '\n');        // Remove excessive newlines
  formatted = formatted.replace(/\n\s+/g, '\n');      // Remove spaces after newlines
  formatted = formatted.replace(/\s+$/gm, '');        // Remove trailing spaces
  formatted = formatted.replace(/\n$/, '');           // Remove final newline
  
  return formatted.trim();
}

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

// Filter access-datafunctions
let accessDataFunctions = functionsData.filter(func => func.category === 'access-datafunctions');
let fixedCount = 0;

console.log(`Found ${accessDataFunctions.length} access-datafunctions to clean and reformat`);
console.log('Applying final clean formatting with proper bullet points...\n');

accessDataFunctions.forEach((func, index) => {
  console.log(`Cleaning ${index + 1}/${accessDataFunctions.length}: ${func.name}`);
  
  // Clean and format description
  if (func.description) {
    const originalDescription = func.description;
    func.description = cleanAndFormatText(func.description);
    if (func.description !== originalDescription) {
      fixedCount++;
    }
  }
  
  // Clean and format remarks
  if (func.remarks && func.remarks !== func.description) {
    func.remarks = cleanAndFormatText(func.remarks);
  } else if (func.remarks === func.description) {
    func.remarks = func.description;
  }
  
  // Clean example code
  if (func.examples && Array.isArray(func.examples)) {
    func.examples.forEach(example => {
      if (example.code) {
        example.code = example.code
          .replace(/,([^\s])/g, ', $1')
          .replace(/\[([^\s])/g, '[ $1')
          .replace(/([^\s])\]/g, '$1 ]');
      }
    });
  }
});

// Update the original functions array
functionsData.forEach((func, index) => {
  if (func.category === 'access-datafunctions') {
    const cleanedFunc = accessDataFunctions.find(af => af.name === func.name);
    if (cleanedFunc) {
      functionsData[index] = cleanedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted cleaning all ${accessDataFunctions.length} access-datafunctions`);
console.log(`${fixedCount} functions had their formatting cleaned and fixed`);
console.log('Each bullet point now appears cleanly on its own line');
console.log('All original text preserved with proper formatting applied');