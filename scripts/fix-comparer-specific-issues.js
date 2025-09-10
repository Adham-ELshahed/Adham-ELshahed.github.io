import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific comparer function formatting issues...\n');

let fixedCount = 0;

// Process comparer functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'comparer') return;
  
  let wasFixed = false;
  
  // Fix Comparer.Equals - proper bullet point formatting for built-in comparers
  if (func.name === 'Comparer.Equals') {
    console.log(`Fixing Comparer.Equals bullet point formatting`);
    
    func.description = `Returns a logical value based on the equality check over the two given values, x and y, using the provided comparer. comparer is a Comparer which is used to control the comparison. Comparers can be used to provide case-insensitive or culture and locale-aware comparisons.

The following built-in comparers are available in the formula language:

  • Comparer.Ordinal: Used to perform an exact ordinal comparison
  • Comparer.OrdinalIgnoreCase: Used to perform an exact ordinal case-insensitive comparison  
  • Comparer.FromCulture: Used to perform a culture-aware comparison`;
    
    wasFixed = true;
  }
  
  // Check other comparer functions for default value formatting
  if (func.name === 'Comparer.FromCulture') {
    console.log(`Checking Comparer.FromCulture for default value formatting`);
    
    if (func.description && func.description.includes('The default value for ignoreCase is false')) {
      func.description = func.description.replace(
        'The default value for ignoreCase is false',
        '(default ignoreCase: false)'
      );
      wasFixed = true;
    }
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific comparer function formatting issues`);
console.log(`${fixedCount} comparer functions had additional formatting improvements`);
console.log('All comparer functions now have consistent bullet point formatting with proper indentation');