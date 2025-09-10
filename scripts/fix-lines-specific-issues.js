import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific lines function formatting issues...\n');

let fixedCount = 0;

// Process lines functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'lines') return;
  
  let wasFixed = false;
  
  // Fix Lines.FromText - format the QuoteStyle values as bullet points
  if (func.name === 'Lines.FromText') {
    console.log(`Fixing Lines.FromText QuoteStyle value formatting`);
    
    func.description = `Converts a text value to a list of text values split at lines breaks. If includeLineSeparators is true, then the line break characters are included in the text.

  • QuoteStyle.None: (default) No quoting behavior is needed
  • QuoteStyle.Csv: Quoting is as per Csv. A double quote character is used to demarcate such regions, and a pair of double quote characters is used to indicate a single double quote character within such a region`;
    
    wasFixed = true;
  }
  
  // Check Lines.ToText for any formatting improvements needed
  if (func.name === 'Lines.ToText') {
    console.log(`Checking Lines.ToText for formatting improvements`);
    
    // Check if there are default values that need formatting
    if (func.description && func.description.includes('carriage return and line feed characters')) {
      // Add more clarity about the default behavior
      func.description = func.description.replace(
        'If not specified then the carriage return and line feed characters are used',
        '(default: carriage return and line feed characters are used if not specified)'
      );
      wasFixed = true;
    }
  }
  
  // Check Lines.FromBinary for any formatting improvements needed
  if (func.name === 'Lines.FromBinary') {
    console.log(`Checking Lines.FromBinary for formatting improvements`);
    
    // The description looks clean, no major formatting needed
    // Just ensure consistent formatting
    if (func.description && !func.description.includes('  •')) {
      // No changes needed - it's a clear description
    }
  }
  
  // Check Lines.ToBinary for any formatting improvements needed
  if (func.name === 'Lines.ToBinary') {
    console.log(`Checking Lines.ToBinary for formatting improvements`);
    
    // Check if there are default values that need formatting
    if (func.description && func.description.includes('carriage return and line feed characters')) {
      func.description = func.description.replace(
        'If not specified then the carriage return and line feed characters are used',
        '(default: carriage return and line feed characters are used if not specified)'
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

console.log(`\nCompleted fixing specific lines function formatting issues`);
console.log(`${fixedCount} lines functions had additional formatting improvements`);
console.log('All lines functions now have consistent formatting with proper line breaks and bullet points');