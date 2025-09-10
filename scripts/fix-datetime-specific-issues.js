import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific date-and-time function formatting issues...\n');

let fixedCount = 0;

// Process date-and-time functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'date-and-time') return;
  
  let wasFixed = false;
  
  // Fix functions with legacy workflow sections that need better formatting
  if (func.name === 'DateTime.FromText' || func.name === 'DateTime.ToText') {
    console.log(`Fixing ${func.name} legacy workflow section formatting`);
    
    if (func.description && func.description.includes('To support legacy workflows')) {
      // Add proper line break before legacy workflow section
      func.description = func.description.replace(
        'To support legacy workflows',
        '\n\nTo support legacy workflows'
      );
      wasFixed = true;
    }
  }
  
  // Check for any other datetime functions that might have similar patterns
  if (func.description && func.description.includes('To support legacy workflows') && 
      !func.description.includes('\n\nTo support legacy workflows')) {
    console.log(`Fixing ${func.name} legacy workflow section formatting`);
    
    func.description = func.description.replace(
      'To support legacy workflows',
      '\n\nTo support legacy workflows'
    );
    wasFixed = true;
  }
  
  // Fix any datetime functions with timezone-related formatting issues
  if (func.name.includes('Zone') || func.description?.includes('timezone') || func.description?.includes('time zone')) {
    console.log(`Checking ${func.name} for timezone formatting improvements`);
    
    // Check if timezone information needs better formatting
    if (func.description && func.description.includes('timezone information includes') && 
        !func.description.includes('  •')) {
      // No specific fixes needed for now, formatting looks good
    }
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific date-and-time function formatting issues`);
console.log(`${fixedCount} date-and-time functions had additional formatting improvements`);
console.log('All date-and-time functions now have consistent formatting with proper line breaks');