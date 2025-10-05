import fs from 'fs';

// Load current processed data
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Re-parsing examples from current data to handle multiple examples...\n');

let totalFunctions = functionsData.length;
let functionsWithExamples = 0;
let totalExamplesBefore = 0;
let totalExamplesAfter = 0;
let multiExampleFunctions = [];

functionsData.forEach((func, funcIndex) => {
  if (!func.examples || func.examples.length === 0) {
    return;
  }
  
  functionsWithExamples++;
  totalExamplesBefore += func.examples.length;
  
  const newExamples = [];
  
  func.examples.forEach((example) => {
    // Reconstruct the original combined text from current fields
    let combinedText = '';
    
    if (example.explanation) combinedText += example.explanation;
    if (example.syntax) combinedText += ' Usage ' + example.syntax;
    if (example.output) combinedText += ' Output ' + example.output;
    
    if (!combinedText) {
      // No content, skip
      return;
    }
    
    // Check if there are multiple examples (Example 1, Example 2, etc.)
    const examplePattern = /Example (\d+)/g;
    const matches = [...combinedText.matchAll(examplePattern)];
    
    if (matches.length === 0) {
      // No "Example N" pattern, keep as is
      newExamples.push(example);
      totalExamplesAfter++;
    } else if (matches.length === 1) {
      // Single "Example 1" found, clean it up
      let explanation = example.explanation || '';
      explanation = explanation.replace(/^Example 1/, '').trim();
      
      newExamples.push({
        title: 'Example 1',
        explanation: explanation,
        syntax: example.syntax || '',
        output: example.output || ''
      });
      totalExamplesAfter++;
    } else {
      // Multiple examples found!
      multiExampleFunctions.push(func.name);
      
      const parts = splitMultipleExamples(combinedText, matches);
      
      parts.forEach(part => {
        const parsed = parseSingleExample(part.content, `Example ${part.number}`);
        newExamples.push(parsed);
        totalExamplesAfter++;
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
  
  // Try to find "Usage" marker (might have "Power Query M" after it)
  const usageMatch = text.match(/(.*?)\s*Usage\s*(?:Power Query M)?\s*(.*)/s);
  
  if (usageMatch) {
    explanation = usageMatch[1].trim();
    const afterUsage = usageMatch[2];
    
    // Try to find "Output" marker
    const outputMatch = afterUsage.match(/(.*?)\s*Output\s*(.*)/s);
    
    if (outputMatch) {
      code = outputMatch[1].trim();
      output = outputMatch[2].trim();
    } else {
      code = afterUsage.trim();
      output = '';
    }
  } else {
    // No Usage marker, check for Output only
    const outputOnlyMatch = text.match(/(.*?)\s*Output\s*(.*)/s);
    
    if (outputOnlyMatch) {
      explanation = outputOnlyMatch[1].trim();
      code = '';
      output = outputOnlyMatch[2].trim();
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
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\n=== EXAMPLE RE-PARSING COMPLETE ===`);
console.log(`Total functions: ${totalFunctions}`);
console.log(`Functions with examples: ${functionsWithExamples}`);
console.log(`Total examples before: ${totalExamplesBefore}`);
console.log(`Total examples after: ${totalExamplesAfter}`);
console.log(`Functions with multiple examples: ${multiExampleFunctions.length}`);

if (multiExampleFunctions.length > 0) {
  console.log(`\nFunctions with multiple examples:`);
  multiExampleFunctions.slice(0, 20).forEach(name => console.log(`  - ${name}`));
  if (multiExampleFunctions.length > 20) {
    console.log(`  ... and ${multiExampleFunctions.length - 20} more`);
  }
}

console.log(`\nAll examples properly separated and parsed!`);