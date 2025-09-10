import fs from 'fs';

// Function to properly format text with correct bullet point line breaks and indentation
function formatTextProperly(text) {
  if (!text || typeof text !== 'string') return text;
  
  let formatted = text;
  
  // Step 1: Normalize the text completely - remove all newlines and bullets to start fresh
  formatted = formatted.replace(/\n/g, ' ');
  formatted = formatted.replace(/•/g, '');
  formatted = formatted.replace(/\s+/g, ' ');
  formatted = formatted.trim();
  
  // Step 2: Add line breaks before key introductory phrases
  formatted = formatted.replace(/An optional record parameter, options, may be specified to control the following options:/g, 
    'An optional record parameter, options, may be specified to control the following options:\n\n');
  formatted = formatted.replace(/The record can contain the following fields:/g, 
    'The record can contain the following fields:\n\n');
  formatted = formatted.replace(/Values are represented as follows:/g, 
    'Values are represented as follows:\n\n');
  formatted = formatted.replace(/The following text operations are available:/g, 
    'The following text operations are available:\n\n');
  formatted = formatted.replace(/Splitting can be controlled using the following options:/g, 
    'Splitting can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Replacement can be controlled using the following options:/g, 
    'Replacement can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Text conversion can be controlled using the following options:/g, 
    'Text conversion can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Encoding can be controlled using the following options:/g, 
    'Encoding can be controlled using the following options:\n\n');
  formatted = formatted.replace(/The following encoding options are supported:/g, 
    'The following encoding options are supported:\n\n');
  formatted = formatted.replace(/Text formatting follows these rules:/g, 
    'Text formatting follows these rules:\n\n');
  formatted = formatted.replace(/The following options are supported:/g, 
    'The following options are supported:\n\n');
  formatted = formatted.replace(/The options record can contain the following fields:/g, 
    'The options record can contain the following fields:\n\n');
  formatted = formatted.replace(/Formatting can be controlled using the following options:/g, 
    'Formatting can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Comparison can be controlled using the following options:/g, 
    'Comparison can be controlled using the following options:\n\n');
  
  // Step 3: Handle option patterns with complete descriptions (including default values)
  // This regex captures the complete option description including any default values in parentheses
  const completeOptionPattern = /([A-Z][a-zA-Z0-9]*(?:[A-Z][a-zA-Z0-9]*)*)\s*:\s*([^.]*(?:\([^)]*\))?[^.]*\.(?:\s*\([^)]*\))?)/g;
  let optionMatches = [];
  let match;
  
  // Collect all complete option descriptions
  while ((match = completeOptionPattern.exec(formatted)) !== null) {
    const fullDescription = match[2].trim();
    optionMatches.push({
      fullMatch: match[0],
      name: match[1],
      description: fullDescription
    });
  }
  
  // Replace each option with proper bullet formatting and indentation
  if (optionMatches.length > 0) {
    // Sort by length to avoid partial replacements
    optionMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    optionMatches.forEach(option => {
      // Add 2 spaces before bullet for proper indentation like home page
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 4: Handle text-specific patterns
  const textPatterns = [
    { 
      pattern: /TextEncoding\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /SplitKind\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /QuoteStyle\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /ReplaceKind\.(\w+)/g,
      needsBullet: true
    }
  ];
  
  // Step 5: Handle text encoding enum patterns common in text functions
  const textEncodingPattern = /TextEncoding\.(\w+)\s*:\s*([^.]+\.)/g;
  let textEncodingMatches = [];
  let encodingMatch;
  
  while ((encodingMatch = textEncodingPattern.exec(formatted)) !== null) {
    textEncodingMatches.push({
      fullMatch: encodingMatch[0],
      name: `TextEncoding.${encodingMatch[1]}`,
      description: encodingMatch[2].trim()
    });
  }
  
  if (textEncodingMatches.length > 0) {
    textEncodingMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    textEncodingMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 6: Handle quote style enum patterns
  const quoteStylePattern = /QuoteStyle\.(\w+)\s*:\s*([^.]+\.)/g;
  let quoteStyleMatches = [];
  let quoteMatch;
  
  while ((quoteMatch = quoteStylePattern.exec(formatted)) !== null) {
    quoteStyleMatches.push({
      fullMatch: quoteMatch[0],
      name: `QuoteStyle.${quoteMatch[1]}`,
      description: quoteMatch[2].trim()
    });
  }
  
  if (quoteStyleMatches.length > 0) {
    quoteStyleMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    quoteStyleMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 7: Handle split kind enum patterns
  const splitKindPattern = /SplitKind\.(\w+)\s*:\s*([^.]+\.)/g;
  let splitKindMatches = [];
  let splitMatch;
  
  while ((splitMatch = splitKindPattern.exec(formatted)) !== null) {
    splitKindMatches.push({
      fullMatch: splitMatch[0],
      name: `SplitKind.${splitMatch[1]}`,
      description: splitMatch[2].trim()
    });
  }
  
  if (splitKindMatches.length > 0) {
    splitKindMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    splitKindMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 8: Fix default value formatting consistently
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, '(default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, '(default: $1).');
  
  // Step 9: Clean up spacing and ensure proper structure
  formatted = formatted.replace(/\n\s+/g, '\n');      // Remove extra spaces after newlines
  formatted = formatted.replace(/\n{3,}/g, '\n\n');   // Limit to maximum 2 consecutive newlines
  formatted = formatted.replace(/\s+$/gm, '');        // Remove trailing spaces from lines
  
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

// Filter text functions
let textFunctions = functionsData.filter(func => func.category === 'text');
let fixedCount = 0;

console.log(`Found ${textFunctions.length} text functions to properly format`);
console.log('Applying proper bullet point formatting with correct line breaks and indentation...\n');

textFunctions.forEach((func, index) => {
  console.log(`Formatting ${index + 1}/${textFunctions.length}: ${func.name}`);
  
  // Format description with proper bullet points and indentation
  if (func.description) {
    const originalDescription = func.description;
    func.description = formatTextProperly(func.description);
    if (func.description !== originalDescription) {
      fixedCount++;
    }
  }
  
  // Format remarks with same logic
  if (func.remarks && func.remarks !== func.description) {
    func.remarks = formatTextProperly(func.remarks);
  } else if (func.remarks === func.description) {
    func.remarks = func.description;
  }
  
  // Format example code
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
  if (func.category === 'text') {
    const formattedFunc = textFunctions.find(tf => tf.name === func.name);
    if (formattedFunc) {
      functionsData[index] = formattedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted proper formatting for all ${textFunctions.length} text functions`);
console.log(`${fixedCount} functions had their formatting improved`);
console.log('Bullet points now have proper indentation and complete descriptions stay together');
console.log('Line breaks only occur between complete bullet point entries');