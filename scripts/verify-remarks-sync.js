import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Verifying that all remarks match descriptions exactly...\n');

let totalFunctions = functionsData.length;
let perfectMatches = 0;
let mismatches = 0;
let missingRemarks = 0;
let missingDescriptions = 0;

const mismatchedFunctions = [];

functionsData.forEach((func, index) => {
  // Check if description exists
  if (!func.description) {
    missingDescriptions++;
    mismatchedFunctions.push({
      name: func.name,
      category: func.category,
      issue: 'Missing description'
    });
    return;
  }
  
  // Check if remarks exists
  if (!func.remarks) {
    missingRemarks++;
    mismatchedFunctions.push({
      name: func.name,
      category: func.category,
      issue: 'Missing remarks'
    });
    return;
  }
  
  // Check if they match exactly
  if (func.description === func.remarks) {
    perfectMatches++;
  } else {
    mismatches++;
    mismatchedFunctions.push({
      name: func.name,
      category: func.category,
      issue: 'Description and remarks do not match',
      descriptionLength: func.description.length,
      remarksLength: func.remarks.length
    });
  }
});

console.log(`=== VERIFICATION RESULTS ===`);
console.log(`Total functions checked: ${totalFunctions}`);
console.log(`Perfect matches (description === remarks): ${perfectMatches}`);
console.log(`Mismatches: ${mismatches}`);
console.log(`Missing descriptions: ${missingDescriptions}`);
console.log(`Missing remarks: ${missingRemarks}`);

if (mismatchedFunctions.length > 0) {
  console.log(`\n=== ISSUES FOUND ===`);
  mismatchedFunctions.forEach(func => {
    console.log(`${func.name} (${func.category}): ${func.issue}`);
    if (func.descriptionLength !== undefined) {
      console.log(`  Description length: ${func.descriptionLength}, Remarks length: ${func.remarksLength}`);
    }
  });
} else {
  console.log(`\n✅ SUCCESS: All ${totalFunctions} functions have remarks that perfectly match their descriptions!`);
}

// Quick sample check - show a few examples
console.log(`\n=== SAMPLE VERIFICATION ===`);
const sampleFunctions = ['Value.NativeQuery', 'Table.Join', 'List.Sort', 'Text.Format'];

sampleFunctions.forEach(funcName => {
  const func = functionsData.find(f => f.name === funcName);
  if (func) {
    const match = func.description === func.remarks;
    console.log(`${funcName}: ${match ? '✅ MATCH' : '❌ MISMATCH'}`);
    if (!match) {
      console.log(`  Description: "${func.description.substring(0, 100)}..."`);
      console.log(`  Remarks: "${func.remarks.substring(0, 100)}..."`);
    }
  }
});