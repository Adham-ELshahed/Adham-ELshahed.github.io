import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing Record.TransformFields formatting with proper bullet points and examples...\n');

let fixedCount = 0;

// Find and format Record.TransformFields specifically
functionsData.forEach((func, index) => {
  if (func.name !== 'Record.TransformFields') return;
  
  console.log(`Formatting Record.TransformFields with improved structure and examples`);
  
  // Apply the same formatting standards as all other functions
  func.description = `Returns a record after applying transformations specified in list transformOperations to record. One or more fields may be transformed at a given time.

In the case of transformation operations:

  • Single field transformation: transformOperations is expected to be a list with two items. The first item specifies a field name, and the second item specifies the function to be used for transformation. For example: {"Quantity", Number.FromText}
  
  • Multiple fields transformation: transformOperations is expected to be a list of lists, where each inner list is a pair of field name and transformation operation. For example: {{"Quantity", Number.FromText}, {"UnitPrice", Number.FromText}}`;
  
  console.log(`✓ Improved Record.TransformFields description with proper bullet points and clear examples`);
  
  fixedCount++;
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted formatting Record.TransformFields`);
console.log(`${fixedCount} function updated with proper bullet point formatting`);
console.log('Function now has clear structure with 2-space indented bullet points and well-formatted examples');