import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific formatting issues...\n');

// Helper function to remove empty bullet lines
function removeEmptyBullets(text) {
  if (!text) return text;
  
  // Remove lines that are just empty bullet points or whitespace with bullets
  return text
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return !(trimmed === '•' || trimmed === '' || /^\s*•\s*$/.test(trimmed));
    })
    .join('\n')
    .trim();
}

// Helper function to fix default values in bullet points
function fixDefaultValues(text) {
  if (!text) return text;
  
  // Find cases where "default:" appears as a separate bullet point and merge it with the previous one
  let lines = text.split('\n');
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].trim();
    const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
    
    // If current line is a bullet point and next line starts with "default:" or "Default:"
    if (currentLine.startsWith('•') && nextLine.match(/^(?:default|Default):\s*/)) {
      // Merge them - add the default info in parentheses at the end of current line
      const defaultText = nextLine.replace(/^(?:default|Default):\s*/, '');
      result.push(`${currentLine} (default: ${defaultText})`);
      i++; // Skip the next line since we merged it
    } else if (!currentLine.match(/^(?:default|Default):\s*/)) {
      // Only add the line if it's not a standalone default line
      result.push(lines[i]);
    }
  }
  
  return result.join('\n').trim();
}

let fixedCount = 0;

// Fix each function
functionsData.forEach((func, index) => {
  if (func.category !== 'access-datafunctions') return;
  
  let wasFixed = false;
  
  // 1. Fix CSV.Document and Excel.Workbook empty bullet points
  if (func.name === 'Csv.Document' || func.name === 'Excel.Workbook') {
    console.log(`Fixing empty bullet points in ${func.name}`);
    const originalDescription = func.description;
    func.description = removeEmptyBullets(func.description);
    if (func.remarks) {
      func.remarks = removeEmptyBullets(func.remarks);
    }
    if (func.description !== originalDescription) {
      wasFixed = true;
    }
  }
  
  // 2. Fix PDF.Tables default value formatting
  if (func.name === 'Pdf.Tables') {
    console.log(`Fixing default value formatting in ${func.name}`);
    const originalDescription = func.description;
    func.description = fixDefaultValues(func.description);
    if (func.remarks) {
      func.remarks = fixDefaultValues(func.remarks);
    }
    if (func.description !== originalDescription) {
      wasFixed = true;
    }
  }
  
  // 3. Fix AzureStorage functions - move description from syntax to description field
  if (func.name === 'AzureStorage.BlobContents' || func.name === 'AzureStorage.Blobs') {
    console.log(`Moving description from syntax to description field for ${func.name}`);
    
    // Check if syntax contains descriptive text instead of actual syntax
    if (func.syntax && func.syntax.includes('Returns') && !func.syntax.includes('(') && !func.syntax.includes(')')) {
      // Move syntax content to description and clear syntax
      func.description = func.syntax;
      func.syntax = null; // Remove syntax since it's not actually syntax
      wasFixed = true;
    }
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific formatting issues`);
console.log(`${fixedCount} functions were updated:`);
console.log('- Removed empty bullet points from CSV.Document and Excel.Workbook');
console.log('- Fixed default value formatting in PDF.Tables');
console.log('- Moved descriptions from syntax field to description field for AzureStorage functions');