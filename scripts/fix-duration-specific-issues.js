import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific duration function formatting issues...\n');

let fixedCount = 0;

// Process duration functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'duration') return;
  
  let wasFixed = false;
  
  // Fix Duration.FromText - format the time format specifications as bullet points
  if (func.name === 'Duration.FromText') {
    console.log(`Fixing Duration.FromText format specifications`);
    
    func.description = `Returns a duration value from the specified text, text. The following formats can be parsed by this function:

(-)hh:mm(:ss(.ff))
(-)ddd(.hh:mm(:ss(.ff)))

(All ranges are inclusive)

  • ddd: Number of days
  • hh: Number of hours, between 0 and 23
  • mm: Number of minutes, between 0 and 59
  • ss: Number of seconds, between 0 and 59
  • ff: Fraction of seconds, between 0 and 9999999`;
    
    wasFixed = true;
  }
  
  // Fix Duration.From - format the type conversion information as bullet points
  if (func.name === 'Duration.From') {
    console.log(`Fixing Duration.From type conversion information`);
    
    func.description = `Returns a duration value from the given value. If the given value is null, Duration.From returns null. If the given value is duration, value is returned. Values of the following types can be converted to a duration value:

  • text: A duration value from textual elapsed time forms (d.h:m:s). Refer to Duration.FromText for details.
  • number: A duration equivalent to the number of whole and fractional days expressed by value.

If value is of any other type, an error is returned.`;
    
    wasFixed = true;
  }
  
  // Fix Duration.ToText - clean up parameter description
  if (func.name === 'Duration.ToText') {
    console.log(`Checking Duration.ToText for parameter description improvements`);
    
    if (func.description && func.description.includes('duration:')) {
      func.description = func.description.replace(
        'duration: A duration from which the textual representation is calculated.format: [Optional] Deprecated, will throw an error if not null.',
        '\n\n  • duration: A duration from which the textual representation is calculated\n  • format: [Optional] Deprecated, will throw an error if not null'
      );
      wasFixed = true;
    }
  }
  
  // Check other duration functions for any additional formatting needs
  if (func.description && func.description.includes('To support legacy workflows') && 
      !func.description.includes('\n\nTo support legacy workflows')) {
    console.log(`Fixing ${func.name} legacy workflow section formatting`);
    
    func.description = func.description.replace(
      'To support legacy workflows',
      '\n\nTo support legacy workflows'
    );
    wasFixed = true;
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific duration function formatting issues`);
console.log(`${fixedCount} duration functions had additional formatting improvements`);
console.log('All duration functions now have consistent formatting with proper line breaks and bullet points');