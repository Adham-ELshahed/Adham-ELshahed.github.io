import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

// Filter access-datafunctions
let accessDataFunctions = functionsData.filter(func => func.category === 'access-datafunctions');
let fixedCount = 0;

console.log(`Found ${accessDataFunctions.length} access-datafunctions to clean up`);

accessDataFunctions.forEach((func, index) => {
  console.log(`Cleaning ${index + 1}/${accessDataFunctions.length}: ${func.name}`);
  
  if (func.description) {
    const originalDescription = func.description;
    
    // Fix double bullet points and spacing issues
    func.description = func.description
      .replace(/•\s*•/g, '•')                    // Remove double bullets
      .replace(/\.\s*•/g, '.\n\n•')             // Add proper spacing before bullets after periods
      .replace(/:\s*•/g, ':\n\n•')              // Add proper spacing after colons before bullets  
      .replace(/•\s*([A-Z])/g, '• $1')          // Ensure space after bullet
      .replace(/\n\n\n+/g, '\n\n')             // Clean up excessive line breaks
      .replace(/\s+\n/g, '\n')                 // Remove trailing spaces before newlines
      .trim();
    
    if (func.description !== originalDescription) {
      fixedCount++;
    }
  }
  
  // Apply same fixes to remarks if they exist and are different from description
  if (func.remarks && func.remarks !== func.description) {
    func.remarks = func.remarks
      .replace(/•\s*•/g, '•')
      .replace(/\.\s*•/g, '.\n\n•')
      .replace(/:\s*•/g, ':\n\n•')
      .replace(/•\s*([A-Z])/g, '• $1')
      .replace(/\n\n\n+/g, '\n\n')
      .replace(/\s+\n/g, '\n')
      .trim();
  } else if (func.remarks === func.description) {
    func.remarks = func.description;
  }
});

// Update the original functions array
functionsData.forEach((func, index) => {
  if (func.category === 'access-datafunctions') {
    const cleanedFunc = accessDataFunctions.find(af => af.name === func.name);
    if (cleanedFunc) {
      functionsData[index] = cleanedFunc;
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`Completed cleanup for all ${accessDataFunctions.length} access-datafunctions`);
console.log(`${fixedCount} functions had formatting cleaned up`);
console.log('Updated processed-functions.json with cleaned data');