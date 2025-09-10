import fs from 'fs';

// Function to format text with proper newlines and spacing like the "What is Power Query" section
function formatText(text) {
  if (!text || typeof text !== 'string') return text;
  
  let formatted = text;
  
  // Step 1: Add proper line breaks before introductory text patterns
  formatted = formatted.replace(/An optional record parameter, options, may be specified to control the following options:/g, 
    'An optional record parameter, options, may be specified to control the following options:\n\n');
  formatted = formatted.replace(/The record can contain the following fields:/g, 
    'The record can contain the following fields:\n\n');
  formatted = formatted.replace(/Values are represented as follows:/g, 
    'Values are represented as follows:\n\n');
  
  // Step 2: Format option lists with proper bullet points and spacing
  // Handle patterns like "OptionName: description" or "OptionName : description"
  formatted = formatted.replace(/([A-Z][a-zA-Z]+)\s*:\s*([^.]*(?:\([^)]*\))?[^.]*\.)/g, 
    (match, optionName, description) => {
      // Clean up the description and add proper formatting
      const cleanDesc = description.trim();
      return `• ${optionName}: ${cleanDesc}`;
    });
  
  // Step 3: Handle specific patterns for values representation (like in Json.FromValue)
  // Format the JSON value type descriptions
  formatted = formatted.replace(/(Null, text and logical values[^.]*\.)(Numbers[^.]*\.)(Lists[^.]*\.)(Records[^.]*\.)(Tables[^.]*\.)(Dates[^.]*\.)(Binary[^.]*\.)(Types[^.]*\.)/g, 
    '• $1\n• $2\n• $3\n• $4\n• $5\n• $6\n• $7\n• $8');
  
  // Step 4: Ensure bullet points are properly spaced
  formatted = formatted.replace(/([^•\n])•/g, '$1\n• '); // Add newline before bullet if missing
  formatted = formatted.replace(/•([A-Z])/g, '• $1'); // Add space after bullet if missing
  
  // Step 5: Fix default value formatting
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, '(default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, '(default: $1).');
  
  // Step 6: Clean up spacing and line breaks
  formatted = formatted.replace(/\n\s+/g, '\n'); // Remove extra spaces after newlines
  formatted = formatted.replace(/\n{3,}/g, '\n\n'); // Limit to maximum 2 consecutive newlines
  formatted = formatted.replace(/\s+$/gm, ''); // Remove trailing spaces
  
  // Step 7: Ensure proper spacing around bullet sections
  // Add spacing before first bullet if it follows text
  formatted = formatted.replace(/([.:])\n•/g, '$1\n\n•');
  
  return formatted.trim();
}

// Function to format example code with proper spacing
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

// Filter and format access-datafunctions
let accessDataFunctions = functionsData.filter(func => func.category === 'access-datafunctions');
let formattedCount = 0;

console.log(`Found ${accessDataFunctions.length} access-datafunctions to format`);
console.log('Using "What is Power Query" section formatting as reference...\n');

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

console.log(`\nCompleted formatting all ${accessDataFunctions.length} access-datafunctions`);
console.log(`${formattedCount} functions had their descriptions improved`);
console.log('Updated processed-functions.json with properly formatted data');
console.log('Formatting now matches the "What is Power Query" section style with proper \\n and spacing');