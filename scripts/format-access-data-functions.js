import fs from 'fs';

// Function to format text with proper spacing, bullet points, and structure
function formatText(text) {
  if (!text || typeof text !== 'string') return text;
  
  let formatted = text;
  
  // Add spacing after colons followed by capital letters (for option descriptions)
  formatted = formatted.replace(/(:)([A-Z])/g, ': $2');
  
  // Format options lists - detect patterns like "OptionName: description"
  formatted = formatted.replace(/([A-Z][a-zA-Z]+)(\s*:\s*)([^.]*\.|[^.]*(?=\s[A-Z][a-zA-Z]+\s*:))/g, '\n• $1$2$3');
  
  // Format specific patterns common in function descriptions
  formatted = formatted.replace(/The record can contain the following fields:/g, '\n\nThe record can contain the following fields:');
  formatted = formatted.replace(/An optional record parameter, options, may be specified to control the following options:/g, '\n\nAn optional record parameter, options, may be specified to control the following options:');
  formatted = formatted.replace(/Values are represented as follows:/g, '\n\nValues are represented as follows:');
  
  // Format common patterns like "Null, text and logical values are represented..."
  formatted = formatted.replace(/(Null, text and logical values[^.]*\.)(Numbers[^.]*\.)/g, '\n• $1\n• $2');
  formatted = formatted.replace(/(Lists are represented[^.]*\.)(Records[^.]*\.)/g, '\n• $1\n• $2');
  formatted = formatted.replace(/(Tables are represented[^.]*\.)(Dates[^.]*\.)/g, '\n• $1\n• $2');
  formatted = formatted.replace(/(Binary values[^.]*\.)(Types[^.]*\.)/g, '\n• $1\n• $2');
  
  // Format default value patterns
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, ' (default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, ' (default: $1).');
  
  // Clean up extra spaces and line breaks
  formatted = formatted.replace(/\s+/g, ' ').trim();
  formatted = formatted.replace(/\n\s+/g, '\n');
  formatted = formatted.replace(/\n+/g, '\n');
  
  // Ensure proper spacing around bullet points
  formatted = formatted.replace(/\n•/g, '\n\n•');
  formatted = formatted.replace(/\n\n\n+•/g, '\n\n•');
  
  return formatted;
}

// Function to format example code
function formatExampleCode(code) {
  if (!code || typeof code !== 'string') return code;
  
  // Add proper spacing around brackets and commas in example code
  let formatted = code.replace(/,([^\s])/g, ', $1');
  formatted = formatted.replace(/\[([^\s])/g, '[ $1');
  formatted = formatted.replace(/([^\s])\]/g, '$1 ]');
  
  return formatted;
}

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

// Filter and format access-datafunctions
let accessDataFunctions = functionsData.filter(func => func.category === 'access-datafunctions');
let formattedCount = 0;

console.log(`Found ${accessDataFunctions.length} access-datafunctions to format`);

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
    // If remarks is identical to description, keep it formatted the same
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

// Update the original functions array with formatted access-datafunctions
functionsData.forEach((func, index) => {
  if (func.category === 'access-datafunctions') {
    const formattedFunc = accessDataFunctions.find(af => af.name === func.name);
    if (formattedFunc) {
      functionsData[index] = formattedFunc;
    }
  }
});

// Write the updated data back to the file
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`Completed formatting all ${accessDataFunctions.length} access-datafunctions`);
console.log(`${formattedCount} functions had their descriptions improved`);
console.log('Updated processed-functions.json with formatted data');