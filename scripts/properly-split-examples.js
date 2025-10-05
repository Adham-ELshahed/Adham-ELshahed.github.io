import fs from 'fs';

// Load the original JSON before any parsing
const originalData = JSON.parse(fs.readFileSync('original-functions.json', 'utf8'));

console.log('Re-parsing all examples from original source...\n');

let totalFunctions = originalData.length;
let functionsWithExamples = 0;
let totalExamplesParsed = 0;

originalData.forEach((func, funcIndex) => {
  if (!func.examples || func.examples.length === 0) {
    return;
  }
  
  functionsWithExamples++;
  const newExamples = [];
  
  func.examples.forEach((example) => {
    const originalCode = example.code || '';
    
    if (!originalCode) {
      return;
    }
    
    // First, check if there are multiple examples (Example 1, Example 2, etc.)
    const examplePattern = /Example (\d+)/g;
    const matches = [...originalCode.matchAll(examplePattern)];
    
    if (matches.length === 0) {
      // No "Example N" pattern, parse as single example
      const parsed = parseSingleExample(originalCode, example.title || 'Example');
      newExamples.push(parsed);
      totalExamplesParsed++;
    } else if (matches.length === 1) {
      // Single "Example 1" found
      const parsed = parseSingleExample(originalCode, example.title || 'Example');
      newExamples.push(parsed);
      totalExamplesParsed++;
    } else {
      // Multiple examples - split them first
      const parts = splitMultipleExamples(originalCode, matches);
      
      parts.forEach(part => {
        const parsed = parseSingleExample(part.content, `Example ${part.number}`);
        newExamples.push(parsed);
        totalExamplesParsed++;
      });
    }
  });
  
  func.examples = newExamples;
  
  if (funcIndex % 50 === 0) {
    console.log(`Processed ${funcIndex} functions...`);
  }
});

// Helper function to split multiple examples
function splitMultipleExamples(text, matches) {
  const parts = [];
  
  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const startIndex = currentMatch.index;
    const nextIndex = i < matches.length - 1 ? matches[i + 1].index : text.length;
    
    const content = text.substring(startIndex, nextIndex).trim();
    // Remove "Example N" from the beginning
    const cleanContent = content.replace(/^Example \d+/, '').trim();
    
    parts.push({
      number: currentMatch[1],
      content: cleanContent
    });
  }
  
  return parts;
}

// Helper function to parse a single example
function parseSingleExample(text, title) {
  let explanation = '';
  let code = '';
  let output = '';
  
  // Try to find "Usage" marker
  const usageMatch = text.match(/(.*?)(Usage(?:Power Query M)?)(.*)/s);
  
  if (usageMatch) {
    explanation = usageMatch[1].trim();
    const afterUsage = usageMatch[3];
    
    // Try to find "Output" marker
    const outputMatch = afterUsage.match(/(.*?)(Output)(.*)/s);
    
    if (outputMatch) {
      code = outputMatch[1].trim();
      output = outputMatch[3].trim();
    } else {
      code = afterUsage.trim();
      output = '';
    }
  } else {
    // No Usage marker, check for Output only
    const outputOnlyMatch = text.match(/(.*?)(Output)(.*)/s);
    
    if (outputOnlyMatch) {
      explanation = outputOnlyMatch[1].trim();
      code = '';
      output = outputOnlyMatch[3].trim();
    } else {
      // No markers at all
      explanation = text.trim();
      code = '';
      output = '';
    }
  }
  
  return {
    title: title,
    explanation: explanation,
    syntax: code,
    output: output
  };
}

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(originalData, null, 2));

console.log(`\n=== EXAMPLE RE-PARSING COMPLETE ===`);
console.log(`Total functions: ${totalFunctions}`);
console.log(`Functions with examples: ${functionsWithExamples}`);
console.log(`Total examples parsed: ${totalExamplesParsed}`);
console.log(`\nAll examples properly separated and parsed!`);