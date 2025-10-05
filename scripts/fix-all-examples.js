import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing example formatting for all functions...\n');

let totalFunctions = functionsData.length;
let functionsWithExamples = 0;
let examplesFixed = 0;
let examplesAlreadyCorrect = 0;

functionsData.forEach((func, funcIndex) => {
  if (!func.examples || func.examples.length === 0) {
    return;
  }
  
  functionsWithExamples++;
  
  func.examples.forEach((example, exampleIndex) => {
    if (!example.code || typeof example.code !== 'string') {
      return;
    }
    
    const originalCode = example.code;
    
    // Check if already properly formatted (has separate explanation/code/output)
    // If it already has these fields, skip it
    if (example.explanation !== undefined && example.syntax !== undefined && example.output !== undefined) {
      examplesAlreadyCorrect++;
      return;
    }
    
    // Parse the combined string
    let explanation = '';
    let code = '';
    let output = '';
    
    // Try to find "Usage" marker (could be "UsagePower Query M" or just "Usage")
    const usageMatch = originalCode.match(/(.*?)(Usage(?:Power Query M)?)(.*)/s);
    
    if (usageMatch) {
      // Extract explanation (everything before "Usage")
      explanation = usageMatch[1].trim();
      
      // Everything after "Usage"
      const afterUsage = usageMatch[3];
      
      // Try to find "Output" marker
      const outputMatch = afterUsage.match(/(.*?)(Output)(.*)/s);
      
      if (outputMatch) {
        // Code is between Usage and Output
        code = outputMatch[1].trim();
        // Output is after Output marker
        output = outputMatch[3].trim();
      } else {
        // No output marker, everything after Usage is code
        code = afterUsage.trim();
        output = '';
      }
    } else {
      // No Usage marker found, check if there's just an Output marker
      const outputOnlyMatch = originalCode.match(/(.*?)(Output)(.*)/s);
      
      if (outputOnlyMatch) {
        explanation = outputOnlyMatch[1].trim();
        code = '';
        output = outputOnlyMatch[3].trim();
      } else {
        // No markers at all, treat entire thing as explanation
        explanation = originalCode.trim();
        code = '';
        output = '';
      }
    }
    
    // Update the example object with separated fields
    example.explanation = explanation;
    example.syntax = code;
    example.output = output;
    
    // Remove the old combined 'code' field
    delete example.code;
    
    examplesFixed++;
    
    // Log progress every 50 examples
    if (examplesFixed % 50 === 0) {
      console.log(`Fixed ${examplesFixed} examples so far...`);
    }
  });
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\n=== EXAMPLE FORMATTING COMPLETE ===`);
console.log(`Total functions: ${totalFunctions}`);
console.log(`Functions with examples: ${functionsWithExamples}`);
console.log(`Examples fixed: ${examplesFixed}`);
console.log(`Examples already correct: ${examplesAlreadyCorrect}`);
console.log(`\nAll examples now have separate explanation, syntax (code), and output sections!`);