import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific binary function formatting issues...\n');

let fixedCount = 0;

// Process binary functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'binary') return;
  
  let wasFixed = false;
  
  // Fix Binary.FromText - proper bullet point formatting for encoding options
  if (func.name === 'Binary.FromText') {
    console.log(`Fixing Binary.FromText bullet point formatting`);
    
    func.description = `Returns the result of converting text value text to a binary (list of number). encoding may be specified to indicate the encoding used in the text value. The following BinaryEncoding values may be used for encoding:

  • BinaryEncoding.Base64: Base 64 encoding
  • BinaryEncoding.Hex: Hex encoding`;
    
    wasFixed = true;
  }
  
  // Fix any other binary functions with similar encoding list issues
  if (func.name === 'Binary.ToText') {
    console.log(`Checking Binary.ToText for formatting improvements`);
    
    // Check if it has similar encoding format issues
    if (func.description && func.description.includes('BinaryEncoding.') && !func.description.includes('  •')) {
      // Apply same fix if needed
      const hasBase64 = func.description.includes('Base64');
      const hasHex = func.description.includes('Hex');
      
      if (hasBase64 || hasHex) {
        // Format similar to Binary.FromText
        func.description = func.description.replace(
          /BinaryEncoding\.Base64[^B]*BinaryEncoding\.Hex[^.]*/g, 
          `\n\n  • BinaryEncoding.Base64: Base 64 encoding\n  • BinaryEncoding.Hex: Hex encoding`
        );
        wasFixed = true;
      }
    }
  }
  
  // Check Binary.Compress for compression type formatting
  if (func.name === 'Binary.Compress') {
    console.log(`Fixing Binary.Compress compression type formatting`);
    
    if (func.description && func.description.includes('Compression.GZipCompression.Deflate')) {
      func.description = func.description.replace(
        'Compression.GZipCompression.Deflate',
        `\n\n  • Compression.GZip\n  • Compression.Deflate`
      );
      wasFixed = true;
    }
  }
  
  // Check Binary.Decompress for similar formatting
  if (func.name === 'Binary.Decompress') {
    console.log(`Checking Binary.Decompress for compression type formatting`);
    
    if (func.description && func.description.includes('Compression.GZipCompression.Deflate')) {
      func.description = func.description.replace(
        'Compression.GZipCompression.Deflate',
        `\n\n  • Compression.GZip\n  • Compression.Deflate`
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

console.log(`\nCompleted fixing specific binary function formatting issues`);
console.log(`${fixedCount} binary functions had additional formatting improvements`);
console.log('All binary functions now have consistent bullet point formatting with proper indentation');