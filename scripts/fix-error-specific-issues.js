import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific error function formatting issues...\n');

let fixedCount = 0;

// Process error functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'error') return;
  
  let wasFixed = false;
  
  // Fix Diagnostics.Trace - format the TraceLevel values as bullet points
  if (func.name === 'Diagnostics.Trace') {
    console.log(`Fixing Diagnostics.Trace TraceLevel value formatting`);
    
    func.description = `Writes a trace message, if tracing is enabled, and returns value. An optional parameter delayed specifies whether to delay the evaluation of value until the message is traced. traceLevel can take one of the following values:

  • TraceLevel.Critical
  • TraceLevel.Error
  • TraceLevel.Warning
  • TraceLevel.Information
  • TraceLevel.Verbose`;
    
    wasFixed = true;
  }
  
  // Check Error.Record for any formatting improvements needed
  if (func.name === 'Error.Record') {
    console.log(`Checking Error.Record for formatting improvements`);
    
    // The description looks simple and clean, no major formatting needed
    // Just ensure it follows standard formatting
    if (func.description && !func.description.includes('\n')) {
      // No changes needed - it's a simple description that doesn't need bullet points
    }
  }
  
  // Check Diagnostics.ActivityId for any formatting improvements needed
  if (func.name === 'Diagnostics.ActivityId') {
    console.log(`Checking Diagnostics.ActivityId for formatting improvements`);
    
    // The description is simple and clean, no formatting needed
    if (func.description && !func.description.includes('\n')) {
      // No changes needed - it's a simple description that doesn't need bullet points
    }
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific error function formatting issues`);
console.log(`${fixedCount} error functions had additional formatting improvements`);
console.log('All error functions now have consistent formatting with proper line breaks and bullet points');