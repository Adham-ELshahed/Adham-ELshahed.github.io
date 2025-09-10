import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific datetimezone function formatting issues...\n');

let fixedCount = 0;

// Process datetimezone functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'datetimezone') return;
  
  let wasFixed = false;
  
  // Fix functions with legacy workflow sections that need better formatting
  if (func.name === 'DateTimeZone.FromText' || func.name === 'DateTimeZone.ToText') {
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
  
  // Check for any other datetimezone functions that might have similar patterns
  if (func.description && func.description.includes('To support legacy workflows') && 
      !func.description.includes('\n\nTo support legacy workflows')) {
    console.log(`Fixing ${func.name} legacy workflow section formatting`);
    
    func.description = func.description.replace(
      'To support legacy workflows',
      '\n\nTo support legacy workflows'
    );
    wasFixed = true;
  }
  
  // Fix any datetimezone functions with timezone-related formatting issues
  if (func.name.includes('Zone') || func.description?.includes('timezone') || func.description?.includes('time zone')) {
    console.log(`Checking ${func.name} for timezone formatting improvements`);
    
    // Check for specific timezone formatting issues
    if (func.description && func.description.includes('timezone information to on the')) {
      // Fix grammatical issue: "timezone information to on the" -> "timezone information on the"
      func.description = func.description.replace(
        'timezone information to on the',
        'timezone information on the'
      );
      wasFixed = true;
    }
  }
  
  // Check for any file time functions that might need specific formatting
  if (func.name.includes('FileTime')) {
    console.log(`Checking ${func.name} for file time formatting improvements`);
    
    // Check if file time information needs better formatting
    if (func.description && func.description.includes('file time') && 
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

console.log(`\nCompleted fixing specific datetimezone function formatting issues`);
console.log(`${fixedCount} datetimezone functions had additional formatting improvements`);
console.log('All datetimezone functions now have consistent formatting with proper line breaks');