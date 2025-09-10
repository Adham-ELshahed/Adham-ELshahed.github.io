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
  formatted = formatted.replace(/The following table operations are available:/g, 
    'The following table operations are available:\n\n');
  formatted = formatted.replace(/Join behavior can be controlled with the following JoinKind options:/g, 
    'Join behavior can be controlled with the following JoinKind options:\n\n');
  formatted = formatted.replace(/The following join kinds are available:/g, 
    'The following join kinds are available:\n\n');
  formatted = formatted.replace(/Grouping can be controlled with the following GroupKind options:/g, 
    'Grouping can be controlled with the following GroupKind options:\n\n');
  formatted = formatted.replace(/The following group kinds are available:/g, 
    'The following group kinds are available:\n\n');
  formatted = formatted.replace(/Sampling can be controlled using the following options:/g, 
    'Sampling can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Expansion can be controlled using the following options:/g, 
    'Expansion can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Transformation can be controlled using the following options:/g, 
    'Transformation can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Sorting can be controlled using the following options:/g, 
    'Sorting can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Filtering can be controlled using the following options:/g, 
    'Filtering can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Column operations can be controlled using the following options:/g, 
    'Column operations can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Buffering can be controlled using the following options:/g, 
    'Buffering can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Aggregation can be controlled using the following options:/g, 
    'Aggregation can be controlled using the following options:\n\n');
  formatted = formatted.replace(/The options record can contain the following fields:/g, 
    'The options record can contain the following fields:\n\n');
  formatted = formatted.replace(/The following options are supported:/g, 
    'The following options are supported:\n\n');
  
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
  
  // Step 4: Handle table-specific patterns
  const tablePatterns = [
    { 
      pattern: /JoinKind\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /JoinAlgorithm\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /GroupKind\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /SortOrder\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /Order\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /MissingField\.(\w+)/g,
      needsBullet: true
    }
  ];
  
  // Step 5: Handle join kind enum patterns common in table functions
  const joinKindPattern = /JoinKind\.(\w+)\s*:\s*([^.]+\.)/g;
  let joinKindMatches = [];
  let joinMatch;
  
  while ((joinMatch = joinKindPattern.exec(formatted)) !== null) {
    joinKindMatches.push({
      fullMatch: joinMatch[0],
      name: `JoinKind.${joinMatch[1]}`,
      description: joinMatch[2].trim()
    });
  }
  
  if (joinKindMatches.length > 0) {
    joinKindMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    joinKindMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 6: Handle group kind enum patterns
  const groupKindPattern = /GroupKind\.(\w+)\s*:\s*([^.]+\.)/g;
  let groupKindMatches = [];
  let groupMatch;
  
  while ((groupMatch = groupKindPattern.exec(formatted)) !== null) {
    groupKindMatches.push({
      fullMatch: groupMatch[0],
      name: `GroupKind.${groupMatch[1]}`,
      description: groupMatch[2].trim()
    });
  }
  
  if (groupKindMatches.length > 0) {
    groupKindMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    groupKindMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 7: Handle missing field enum patterns
  const missingFieldPattern = /MissingField\.(\w+)\s*:\s*([^.]+\.)/g;
  let missingFieldMatches = [];
  let missingMatch;
  
  while ((missingMatch = missingFieldPattern.exec(formatted)) !== null) {
    missingFieldMatches.push({
      fullMatch: missingMatch[0],
      name: `MissingField.${missingMatch[1]}`,
      description: missingMatch[2].trim()
    });
  }
  
  if (missingFieldMatches.length > 0) {
    missingFieldMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    missingFieldMatches.forEach(option => {
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

// Filter table functions
let tableFunctions = functionsData.filter(func => func.category === 'table');
let fixedCount = 0;

console.log(`Found ${tableFunctions.length} table functions to properly format`);
console.log('Applying proper bullet point formatting with correct line breaks and indentation...\n');

tableFunctions.forEach((func, index) => {
  console.log(`Formatting ${index + 1}/${tableFunctions.length}: ${func.name}`);
  
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
  if (func.category === 'table') {
    const formattedFunc = tableFunctions.find(tf => tf.name === func.name);
    if (formattedFunc) {
      functionsData[index] = formattedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted proper formatting for all ${tableFunctions.length} table functions`);
console.log(`${fixedCount} functions had their formatting improved`);
console.log('Bullet points now have proper indentation and complete descriptions stay together');
console.log('Line breaks only occur between complete bullet point entries');