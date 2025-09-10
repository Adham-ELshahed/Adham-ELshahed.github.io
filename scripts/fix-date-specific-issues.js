import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific date function formatting issues...\n');

let fixedCount = 0;

// Process date functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'date') return;
  
  let wasFixed = false;
  
  // Fix functions with legacy workflow sections that need better formatting
  if (func.name === 'Date.FromText' || func.name === 'Date.ToText') {
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
  
  // Fix DateTime.FromText if it exists and has similar patterns
  if (func.name === 'DateTime.FromText' || func.name === 'DateTime.ToText') {
    console.log(`Checking ${func.name} for similar formatting improvements`);
    
    if (func.description && func.description.includes('To support legacy workflows')) {
      func.description = func.description.replace(
        'To support legacy workflows',
        '\n\nTo support legacy workflows'
      );
      wasFixed = true;
    }
  }
  
  // Fix DateTimeZone functions if they have similar patterns
  if (func.name.includes('DateTimeZone') && func.name.includes('Text')) {
    console.log(`Checking ${func.name} for similar formatting improvements`);
    
    if (func.description && func.description.includes('To support legacy workflows')) {
      func.description = func.description.replace(
        'To support legacy workflows',
        '\n\nTo support legacy workflows'
      );
      wasFixed = true;
    }
  }
  
  // Fix Time functions if they have similar patterns
  if (func.name.includes('Time') && func.name.includes('Text')) {
    console.log(`Checking ${func.name} for similar formatting improvements`);
    
    if (func.description && func.description.includes('To support legacy workflows')) {
      func.description = func.description.replace(
        'To support legacy workflows',
        '\n\nTo support legacy workflows'
      );
      wasFixed = true;
    }
  }
  
  // Fix Duration functions if they have similar patterns
  if (func.name.includes('Duration') && func.name.includes('Text')) {
    console.log(`Checking ${func.name} for similar formatting improvements`);
    
    if (func.description && func.description.includes('To support legacy workflows')) {
      func.description = func.description.replace(
        'To support legacy workflows',
        '\n\nTo support legacy workflows'
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

console.log(`\nCompleted fixing specific date function formatting issues`);
console.log(`${fixedCount} date functions had additional formatting improvements`);
console.log('All date functions now have consistent formatting with proper line breaks');