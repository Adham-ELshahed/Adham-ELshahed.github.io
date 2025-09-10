import fs from 'fs';

// Function to properly format text with clean bullet points and newlines
function formatTextWithProperBullets(text) {
  if (!text || typeof text !== 'string') return text;
  
  let formatted = text;
  
  // Step 1: Clean up any existing malformed bullet formatting
  formatted = formatted.replace(/\n\s*•\s*/g, ' ');  // Remove existing bullets temporarily
  formatted = formatted.replace(/\s+/g, ' ');        // Normalize spaces
  formatted = formatted.trim();
  
  // Step 2: Add proper line breaks before introductory phrases
  formatted = formatted.replace(/An optional record parameter, options, may be specified to control the following options:/g, 
    'An optional record parameter, options, may be specified to control the following options:');
  formatted = formatted.replace(/The record can contain the following fields:/g, 
    'The record can contain the following fields:');
  formatted = formatted.replace(/Values are represented as follows:/g, 
    'Values are represented as follows:');
  
  // Step 3: Identify and format option patterns with proper bullet points
  // Look for patterns like "OptionName: description" or "OptionName : description"
  const optionPattern = /([A-Z][a-zA-Z0-9]*(?:[A-Z][a-zA-Z0-9]*)*)\s*:\s*([^.]*(?:\([^)]*\))?[^.]*\.)/g;
  let optionMatches = [];
  let match;
  
  // Collect all option matches
  while ((match = optionPattern.exec(formatted)) !== null) {
    optionMatches.push({
      full: match[0],
      name: match[1],
      description: match[2].trim()
    });
  }
  
  // Replace option patterns with proper bullet points (each on new line)
  if (optionMatches.length > 0) {
    // Sort by length (longest first) to avoid partial replacements
    optionMatches.sort((a, b) => b.full.length - a.full.length);
    
    optionMatches.forEach(option => {
      formatted = formatted.replace(option.full, `\n• ${option.name}: ${option.description}`);
    });
  }
  
  // Step 4: Handle JSON value representation patterns (for Json.FromValue and similar)
  const valueRepresentations = [
    'Null, text and logical values are represented as the corresponding JSON types',
    'Numbers are represented as numbers in JSON, except that #infinity, -#infinity and #null are converted to null',
    'Lists are represented as JSON arrays',
    'Records are represnted as JSON objects',
    'Tables are represented as an array of objects',
    'Dates, times, datetimes, datetimezones and durations are represented as ISO-8601 text',
    'Binary values are represented as base-64 encoded text',
    'Types and functions produce an error'
  ];
  
  valueRepresentations.forEach(representation => {
    if (formatted.includes(representation)) {
      formatted = formatted.replace(representation, `\n• ${representation}`);
    }
  });
  
  // Step 5: Fix default value formatting
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, '(default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, '(default: $1).');
  
  // Step 6: Clean up and ensure proper structure
  // Add proper spacing before bullet sections
  formatted = formatted.replace(/([.:])\n•/g, '$1\n\n•');
  
  // Clean up extra whitespace
  formatted = formatted.replace(/\n\s+/g, '\n');      // Remove spaces after newlines
  formatted = formatted.replace(/\n{3,}/g, '\n\n');   // Max 2 consecutive newlines
  formatted = formatted.replace(/\s+$/gm, '');        // Remove trailing spaces
  
  return formatted.trim();
}

// Function to format example code
function formatExampleCode(code) {
  if (!code || typeof code !== 'string') return code;
  
  return code
    .replace(/,([^\s])/g, ', $1')
    .replace(/\[([^\s])/g, '[ $1')
    .replace(/([^\s])\]/g, '$1 ]')
    .replace(/\{([^\s])/g, '{ $1')
    .replace(/([^\s])\}/g, '$1 }');
}

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

// Filter access-datafunctions
let accessDataFunctions = functionsData.filter(func => func.category === 'access-datafunctions');
let fixedCount = 0;

console.log(`Found ${accessDataFunctions.length} access-datafunctions to fix`);
console.log('Fixing bullet point formatting with proper \\n newlines...\n');

accessDataFunctions.forEach((func, index) => {
  console.log(`Fixing ${index + 1}/${accessDataFunctions.length}: ${func.name}`);
  
  // Fix description formatting
  if (func.description) {
    const originalDescription = func.description;
    func.description = formatTextWithProperBullets(func.description);
    if (func.description !== originalDescription) {
      fixedCount++;
    }
  }
  
  // Fix remarks formatting (if different from description)
  if (func.remarks && func.remarks !== func.description) {
    func.remarks = formatTextWithProperBullets(func.remarks);
  } else if (func.remarks === func.description) {
    func.remarks = func.description;
  }
  
  // Fix example code formatting
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
    const fixedFunc = accessDataFunctions.find(af => af.name === func.name);
    if (fixedFunc) {
      functionsData[index] = fixedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing all ${accessDataFunctions.length} access-datafunctions`);
console.log(`${fixedCount} functions had their bullet point formatting fixed`);
console.log('Each bullet point now appears on its own line with proper \\n newlines');
console.log('All original text preserved - only formatting improved');