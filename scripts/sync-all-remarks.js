import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Synchronizing remarks with descriptions for all functions...\n');

let totalFunctions = functionsData.length;
let syncedCount = 0;
let alreadyMatchedCount = 0;

// Group functions by category for reporting
const categoryStats = {};

functionsData.forEach((func, index) => {
  // Initialize category stats
  if (!categoryStats[func.category]) {
    categoryStats[func.category] = {
      total: 0,
      synced: 0,
      alreadyMatched: 0
    };
  }
  categoryStats[func.category].total++;
  
  // Check if remarks already matches description exactly
  if (func.remarks === func.description) {
    alreadyMatchedCount++;
    categoryStats[func.category].alreadyMatched++;
    return; // Skip if already matching
  }
  
  // Copy description to remarks with exact same formatting
  if (func.description) {
    func.remarks = func.description;
    syncedCount++;
    categoryStats[func.category].synced++;
    
    // Log progress every 50 functions
    if ((syncedCount) % 50 === 0) {
      console.log(`Synced ${syncedCount} functions so far...`);
    }
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\n=== SYNCHRONIZATION COMPLETE ===`);
console.log(`Total functions processed: ${totalFunctions}`);
console.log(`Functions with remarks synced: ${syncedCount}`);
console.log(`Functions already matching: ${alreadyMatchedCount}`);
console.log(`\n=== CATEGORY BREAKDOWN ===`);

// Sort categories alphabetically for consistent reporting
const sortedCategories = Object.keys(categoryStats).sort();

sortedCategories.forEach(category => {
  const stats = categoryStats[category];
  console.log(`${category}: ${stats.total} total, ${stats.synced} synced, ${stats.alreadyMatched} already matching`);
});

console.log(`\nAll ${totalFunctions} functions now have remarks that exactly match their descriptions with identical formatting.`);