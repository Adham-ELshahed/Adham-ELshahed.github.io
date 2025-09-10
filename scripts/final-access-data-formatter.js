import fs from 'fs';

// Function to format text with clean bullet points and proper newlines like the home page
function formatText(text) {
  if (!text || typeof text !== 'string') return text;
  
  let formatted = text;
  
  // Step 1: Normalize the text - remove any existing bullet formatting to start fresh
  formatted = formatted.replace(/\n\s*•\s*/g, ' ');
  formatted = formatted.replace(/\s+/g, ' ');
  formatted = formatted.trim();
  
  // Step 2: Add proper line breaks before introductory text patterns
  formatted = formatted.replace(/An optional record parameter, options, may be specified to control the following options:/g, 
    'An optional record parameter, options, may be specified to control the following options:\n');
  formatted = formatted.replace(/The record can contain the following fields:/g, 
    'The record can contain the following fields:\n');
  formatted = formatted.replace(/Values are represented as follows:/g, 
    'Values are represented as follows:\n');
  
  // Step 3: Handle specific option patterns - convert option descriptions to bullet points
  // Pattern for options like "OptionName: description"
  const optionPattern = /([A-Z][a-zA-Z0-9]*(?:[A-Z][a-zA-Z0-9]*)*)\s*:\s*([^.]*(?:\([^)]*\))?[^.]*\.)/g;
  let optionMatches = [];
  let match;
  while ((match = optionPattern.exec(formatted)) !== null) {
    optionMatches.push({
      full: match[0],
      name: match[1],
      description: match[2].trim()
    });
  }
  
  // Replace option patterns with bullet points
  if (optionMatches.length > 0) {
    optionMatches.forEach(option => {
      formatted = formatted.replace(option.full, `\n• ${option.name}: ${option.description}`);
    });
  }
  
  // Step 4: Handle JSON value representation patterns (for Json.FromValue)
  const valuePatterns = [
    'Null, text and logical values are represented as the corresponding JSON types',
    'Numbers are represented as numbers in JSON, except that #infinity, -#infinity and #null are converted to null',
    'Lists are represented as JSON arrays',
    'Records are represnted as JSON objects',
    'Tables are represented as an array of objects',
    'Dates, times, datetimes, datetimezones and durations are represented as ISO-8601 text',
    'Binary values are represented as base-64 encoded text',
    'Types and functions produce an error'
  ];
  
  valuePatterns.forEach(pattern => {
    if (formatted.includes(pattern)) {
      formatted = formatted.replace(pattern, `\n• ${pattern}`);
    }
  });
  
  // Step 5: Fix default value formatting consistently
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, '(default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, '(default: $1).');
  
  // Step 6: Clean up spacing and ensure proper structure
  formatted = formatted.replace(/\n\s+/g, '\n'); // Remove extra spaces after newlines
  formatted = formatted.replace(/\n{3,}/g, '\n\n'); // Limit to maximum 2 consecutive newlines
  formatted = formatted.replace(/\s+$/gm, ''); // Remove trailing spaces from lines
  
  // Step 7: Ensure first bullet point has proper spacing from preceding text
  formatted = formatted.replace(/([.:])\n•/g, '$1\n\n•');
  
  return formatted.trim();
}

// Function to format example code
function formatExampleCode(code) {
  if (!code || typeof code !== 'string') return code;
  
  // Add proper spacing around brackets and commas
  let formatted = code
    .replace(/,([^\s])/g, ', $1')
    .replace(/\[([^\s])/g, '[ $1')
    .replace(/([^\s])\]/g, '$1 ]')
    .replace(/\{([^\s])/g, '{ $1')
    .replace(/([^\s])\}/g, '$1 }');
  
  return formatted;
}

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

// Filter access-datafunctions
let accessDataFunctions = functionsData.filter(func => func.category === 'access-datafunctions');
let formattedCount = 0;

console.log(`Found ${accessDataFunctions.length} access-datafunctions to format`);
console.log('Applying clean formatting with proper \\n usage...\n');

accessDataFunctions.forEach((func, index) => {
  console.log(`Formatting ${index + 1}/${accessDataFunctions.length}: ${func.name}`);
  
  // Format description
  if (func.description) {
    const originalDescription = func.description;
    func.description = formatText(func.description);
    if (func.description !== originalDescription) {
      formattedCount++;
    }
  }
  
  // Format remarks (only if different from description)
  if (func.remarks && func.remarks !== func.description) {
    func.remarks = formatText(func.remarks);
  } else if (func.remarks === func.description) {
    func.remarks = func.description;
  }
  
  // Format examples
  if (func.examples && Array.isArray(func.examples)) {
    func.examples.forEach(example => {
      if (example.code) {
        example.code = formatExampleCode(example.code);
      }
    });
  }
});

// Update the original functions array
functionsData.forEach((func, index) => {
  if (func.category === 'access-datafunctions') {
    const formattedFunc = accessDataFunctions.find(af => af.name === func.name);
    if (formattedFunc) {
      functionsData[index] = formattedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted formatting all ${accessDataFunctions.length} access-datafunctions`);
console.log(`${formattedCount} functions had their descriptions improved`);
console.log('Applied clean formatting with proper newlines and bullet points');
console.log('All original text preserved, only formatting improved');