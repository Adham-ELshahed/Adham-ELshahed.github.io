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
  formatted = formatted.replace(/The following value operations are available:/g, 
    'The following value operations are available:\n\n');
  formatted = formatted.replace(/Value comparison can be controlled using the following options:/g, 
    'Value comparison can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Value conversion can be controlled using the following options:/g, 
    'Value conversion can be controlled using the following options:\n\n');
  formatted = formatted.replace(/The following value types are supported:/g, 
    'The following value types are supported:\n\n');
  formatted = formatted.replace(/The following options are supported:/g, 
    'The following options are supported:\n\n');
  formatted = formatted.replace(/The options record can contain the following fields:/g, 
    'The options record can contain the following fields:\n\n');
  formatted = formatted.replace(/Value properties can be controlled using the following options:/g, 
    'Value properties can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Comparison can be controlled using the following options:/g, 
    'Comparison can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Error handling can be controlled using the following options:/g, 
    'Error handling can be controlled using the following options:\n\n');
  
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
  
  // Step 4: Handle value-specific patterns
  const valuePatterns = [
    { 
      pattern: /ComparisonCriteria\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /Precision\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: 'value comparison',
      needsBullet: false
    },
    { 
      pattern: 'null value',
      needsBullet: false
    },
    { 
      pattern: 'error value',
      needsBullet: false
    }
  ];
  
  // Step 5: Handle comparison criteria enum patterns common in value functions
  const comparisonCriteriaPattern = /ComparisonCriteria\.(\w+)\s*:\s*([^.]+\.)/g;
  let comparisonMatches = [];
  let comparisonMatch;
  
  while ((comparisonMatch = comparisonCriteriaPattern.exec(formatted)) !== null) {
    comparisonMatches.push({
      fullMatch: comparisonMatch[0],
      name: `ComparisonCriteria.${comparisonMatch[1]}`,
      description: comparisonMatch[2].trim()
    });
  }
  
  if (comparisonMatches.length > 0) {
    comparisonMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    comparisonMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 6: Fix default value formatting consistently
  formatted = formatted.replace(/\(default is ([^)]+)\)/g, '(default: $1)');
  formatted = formatted.replace(/The default value is ([^.]+)\./g, '(default: $1).');
  
  // Step 7: Clean up spacing and ensure proper structure
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

// Filter value functions
let valueFunctions = functionsData.filter(func => func.category === 'value');
let fixedCount = 0;

console.log(`Found ${valueFunctions.length} value functions to properly format`);
console.log('Applying proper bullet point formatting with correct line breaks and indentation...\n');

valueFunctions.forEach((func, index) => {
  console.log(`Formatting ${index + 1}/${valueFunctions.length}: ${func.name}`);
  
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
  if (func.category === 'value') {
    const formattedFunc = valueFunctions.find(vf => vf.name === func.name);
    if (formattedFunc) {
      functionsData[index] = formattedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted proper formatting for all ${valueFunctions.length} value functions`);
console.log(`${fixedCount} functions had their formatting improved`);
console.log('Bullet points now have proper indentation and complete descriptions stay together');
console.log('Line breaks only occur between complete bullet point entries');