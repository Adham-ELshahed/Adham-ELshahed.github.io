import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

// Filter functions with examples
const functionsWithExamples = functionsData.filter(func => 
  func.examples && func.examples.length > 0
);

console.log('=== FUNCTIONS WITH EXAMPLES ===\n');
console.log(`Total: ${functionsWithExamples.length} functions\n`);

// Group by category
const byCategory = {};
functionsWithExamples.forEach(func => {
  const category = func.category || 'Unknown';
  if (!byCategory[category]) {
    byCategory[category] = [];
  }
  byCategory[category].push(func.name);
});

// Sort categories alphabetically
const sortedCategories = Object.keys(byCategory).sort();

// Display by category
sortedCategories.forEach(category => {
  console.log(`\n${category.toUpperCase().replace(/-/g, ' ')} (${byCategory[category].length} functions):`);
  byCategory[category].sort().forEach(name => {
    console.log(`  - ${name}`);
  });
});

// Also create a simple text file with just the names
const allNames = functionsWithExamples.map(f => f.name).sort();
fs.writeFileSync('functions-with-examples-list.txt', allNames.join('\n'));

console.log(`\n\n=== SUMMARY ===`);
console.log(`Total functions with examples: ${functionsWithExamples.length}`);
console.log(`List saved to: functions-with-examples-list.txt`);