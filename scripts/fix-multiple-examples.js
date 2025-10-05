import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing multiple examples within single entries...\n');

let totalFunctions = functionsData.length;
let functionsProcessed = 0;
let examplesExpanded = 0;

functionsData.forEach((func, funcIndex) => {
  if (!func.examples || func.examples.length === 0) {
    return;
  }
  
  const newExamples = [];
  
  func.examples.forEach((example) => {
    // Check if we have the combined fields from previous parsing
    const combinedText = example.explanation || example.code || '';
    
    if (!combinedText) {
      // No content to parse, keep as is
      newExamples.push(example);
      return;
    }
    
    // Check if there are multiple examples (Example 1, Example 2, etc.)
    const examplePattern = /Example (\d+)/g;
    const matches = [...combinedText.matchAll(examplePattern)];
    
    if (matches.length <= 1) {
      // Only one example or no "Example N" pattern, keep current structure
      newExamples.push(example);
      return;
    }
    
    // Multiple examples found - split them
    console.log(`Found ${matches.length} examples in ${func.name}`);
    
    // Split the text by Example N markers
    const parts = [];
    let lastIndex = 0;
    
    matches.forEach((match, i) => {
      const startIndex = match.index;
      
      if (i > 0) {
        // Add the previous example's content
        parts.push({
          number: matches[i - 1][1],
          content: combinedText.substring(lastIndex, startIndex).trim()
        });
      }
      
      lastIndex = startIndex;
    });
    
    // Add the last example
    parts.push({
      number: matches[matches.length - 1][1],
      content: combinedText.substring(lastIndex).trim()
    });
    
    // Parse each part
    parts.forEach(part => {
      // Remove "Example N" from the beginning
      let content = part.content.replace(/^Example \d+/, '').trim();
      
      let explanation = '';
      let code = '';
      let output = '';
      
      // Parse this individual example
      const usageMatch = content.match(/(.*?)(Usage(?:Power Query M)?)(.*)/s);
      
      if (usageMatch) {
        explanation = usageMatch[1].trim();
        const afterUsage = usageMatch[3];
        
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
        const outputOnlyMatch = content.match(/(.*?)(Output)(.*)/s);
        
        if (outputOnlyMatch) {
          explanation = outputOnlyMatch[1].trim();
          code = '';
          output = outputOnlyMatch[3].trim();
        } else {
          explanation = content.trim();
          code = '';
          output = '';
        }
      }
      
      newExamples.push({
        title: `Example ${part.number}`,
        explanation: explanation,
        syntax: code,
        output: output
      });
      
      examplesExpanded++;
    });
  });
  
  // Replace the examples array with the new expanded one
  func.examples = newExamples;
  functionsProcessed++;
  
  if (functionsProcessed % 50 === 0) {
    console.log(`Processed ${functionsProcessed} functions...`);
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\n=== MULTIPLE EXAMPLES PARSING COMPLETE ===`);
console.log(`Total functions processed: ${functionsProcessed}`);
console.log(`Total example entries expanded: ${examplesExpanded}`);
console.log(`\nAll functions now have properly separated multiple examples!`);