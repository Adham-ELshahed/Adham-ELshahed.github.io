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
  formatted = formatted.replace(/The following list operations are available:/g, 
    'The following list operations are available:\n\n');
  formatted = formatted.replace(/Sort may be controlled using the following options:/g, 
    'Sort may be controlled using the following options:\n\n');
  formatted = formatted.replace(/Matching can be controlled by the following ComparisonCriteria option record:/g,
    'Matching can be controlled by the following ComparisonCriteria option record:\n\n');
  formatted = formatted.replace(/The optional parameter equationCriteria may be specified to control the comparison:/g,
    'The optional parameter equationCriteria may be specified to control the comparison:\n\n');
  formatted = formatted.replace(/Generation can be controlled with the following options:/g, 
    'Generation can be controlled with the following options:\n\n');
  formatted = formatted.replace(/Accumulation can be controlled using the following optional parameters:/g, 
    'Accumulation can be controlled using the following optional parameters:\n\n');
  formatted = formatted.replace(/Buffer options can be controlled with the following parameters:/g, 
    'Buffer options can be controlled with the following parameters:\n\n');
  formatted = formatted.replace(/Join behavior can be controlled with the following JoinKind options:/g, 
    'Join behavior can be controlled with the following JoinKind options:\n\n');
  formatted = formatted.replace(/The following join kinds are available:/g, 
    'The following join kinds are available:\n\n');
  
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
  
  // Step 4: Handle list-specific patterns
  const listPatterns = [
    { 
      pattern: /JoinKind\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /JoinAlgorithm\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /SortOrder\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /Order\.(\w+)/g,
      needsBullet: true
    }
  ];
  
  // Step 5: Handle join kind enum patterns common in list functions
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
  
  // Step 6: Handle sort order enum patterns
  const sortOrderPattern = /Order\.(\w+)\s*:\s*([^.]+\.)/g;
  let sortOrderMatches = [];
  let sortMatch;
  
  while ((sortMatch = sortOrderPattern.exec(formatted)) !== null) {
    sortOrderMatches.push({
      fullMatch: sortMatch[0],
      name: `Order.${sortMatch[1]}`,
      description: sortMatch[2].trim()
    });
  }
  
  if (sortOrderMatches.length > 0) {
    sortOrderMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    sortOrderMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 7: Fix default value formatting consistently
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, '(default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, '(default: $1).');
  
  // Step 8: Clean up spacing and ensure proper structure
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

// Filter list functions
let listFunctions = functionsData.filter(func => func.category === 'list');
let fixedCount = 0;

console.log(`Found ${listFunctions.length} list functions to properly format`);
console.log('Applying proper bullet point formatting with correct line breaks and indentation...\n');

listFunctions.forEach((func, index) => {
  console.log(`Formatting ${index + 1}/${listFunctions.length}: ${func.name}`);
  
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
  if (func.category === 'list') {
    const formattedFunc = listFunctions.find(lf => lf.name === func.name);
    if (formattedFunc) {
      functionsData[index] = formattedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted proper formatting for all ${listFunctions.length} list functions`);
console.log(`${fixedCount} functions had their formatting improved`);
console.log('Bullet points now have proper indentation and complete descriptions stay together');
console.log('Line breaks only occur between complete bullet point entries');