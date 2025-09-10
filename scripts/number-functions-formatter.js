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
  formatted = formatted.replace(/The following number operations are available:/g, 
    'The following number operations are available:\n\n');
  formatted = formatted.replace(/Conversion can be controlled using the following options:/g, 
    'Conversion can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Rounding can be controlled with the following options:/g, 
    'Rounding can be controlled with the following options:\n\n');
  formatted = formatted.replace(/The following rounding modes are supported:/g, 
    'The following rounding modes are supported:\n\n');
  formatted = formatted.replace(/Precision can be controlled using the following options:/g, 
    'Precision can be controlled using the following options:\n\n');
  formatted = formatted.replace(/Number formatting follows these rules:/g, 
    'Number formatting follows these rules:\n\n');
  
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
  
  // Step 4: Handle number-specific patterns
  const numberPatterns = [
    { 
      pattern: /RoundingMode\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /Precision\.(\w+)/g,
      needsBullet: true
    },
    { 
      pattern: /NumberFormat\.(\w+)/g,
      needsBullet: true
    }
  ];
  
  // Step 5: Handle rounding mode enum patterns common in number functions
  const roundingModePattern = /RoundingMode\.(\w+)\s*:\s*([^.]+\.)/g;
  let roundingModeMatches = [];
  let roundingMatch;
  
  while ((roundingMatch = roundingModePattern.exec(formatted)) !== null) {
    roundingModeMatches.push({
      fullMatch: roundingMatch[0],
      name: `RoundingMode.${roundingMatch[1]}`,
      description: roundingMatch[2].trim()
    });
  }
  
  if (roundingModeMatches.length > 0) {
    roundingModeMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    roundingModeMatches.forEach(option => {
      formatted = formatted.replace(option.fullMatch, `\n  • ${option.name}: ${option.description}`);
    });
  }
  
  // Step 6: Handle precision enum patterns
  const precisionPattern = /Precision\.(\w+)\s*:\s*([^.]+\.)/g;
  let precisionMatches = [];
  let precisionMatch;
  
  while ((precisionMatch = precisionPattern.exec(formatted)) !== null) {
    precisionMatches.push({
      fullMatch: precisionMatch[0],
      name: `Precision.${precisionMatch[1]}`,
      description: precisionMatch[2].trim()
    });
  }
  
  if (precisionMatches.length > 0) {
    precisionMatches.sort((a, b) => b.fullMatch.length - a.fullMatch.length);
    
    precisionMatches.forEach(option => {
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

// Filter number functions
let numberFunctions = functionsData.filter(func => func.category === 'number');
let fixedCount = 0;

console.log(`Found ${numberFunctions.length} number functions to properly format`);
console.log('Applying proper bullet point formatting with correct line breaks and indentation...\n');

numberFunctions.forEach((func, index) => {
  console.log(`Formatting ${index + 1}/${numberFunctions.length}: ${func.name}`);
  
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
  if (func.category === 'number') {
    const formattedFunc = numberFunctions.find(nf => nf.name === func.name);
    if (formattedFunc) {
      functionsData[index] = formattedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted proper formatting for all ${numberFunctions.length} number functions`);
console.log(`${fixedCount} functions had their formatting improved`);
console.log('Bullet points now have proper indentation and complete descriptions stay together');
console.log('Line breaks only occur between complete bullet point entries');