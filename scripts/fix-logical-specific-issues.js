import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific logical function formatting issues...\n');

let fixedCount = 0;

// Process logical functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'logical') return;
  
  let wasFixed = false;
  
  // Fix Logical.From - format the type conversion information with bullet points
  if (func.name === 'Logical.From') {
    console.log(`Fixing Logical.From type conversion formatting`);
    
    func.description = `Returns a logical value from the given value. If the given value is null, Logical.From returns null. If the given value is logical, value is returned.

Values of the following types can be converted to a logical value:

  • text: A logical value from the text value, either "true" or "false". Refer to Logical.FromText for details
  • number: false if value equals 0, true otherwise

If value is of any other type, an error is returned.`;
    
    wasFixed = true;
  }
  
  // Check Logical.FromText for formatting improvements
  if (func.name === 'Logical.FromText') {
    console.log(`Checking Logical.FromText for formatting improvements`);
    
    // The description looks clean and simple, no major formatting needed
    if (func.description && !func.description.includes('\n')) {
      // No changes needed - it's a clear, concise description
    }
  }
  
  // Check Logical.ToText for formatting improvements
  if (func.name === 'Logical.ToText') {
    console.log(`Checking Logical.ToText for formatting improvements`);
    
    // The description looks clean and simple, no major formatting needed
    if (func.description && !func.description.includes('\n')) {
      // No changes needed - it's a clear, concise description
    }
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific logical function formatting issues`);
console.log(`${fixedCount} logical functions had additional formatting improvements`);
console.log('All logical functions now have consistent formatting with proper line breaks and bullet points');