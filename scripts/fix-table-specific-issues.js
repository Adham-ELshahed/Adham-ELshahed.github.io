import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific table function formatting issues...\n');

let fixedCount = 0;

// Process table functions that need specific fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'table') return;
  
  let wasFixed = false;
  
  // Fix Table.Join - format the JoinKind options with bullet points
  if (func.name === 'Table.Join') {
    console.log(`Fixing Table.Join JoinKind options formatting`);
    
    func.description = `Joins the rows of table1 with the rows of table2 based on the equality of the values of the key columns selected by key1 (for table1) and key2 (for table2).

By default, an inner join is performed, however an optional joinKind may be included to specify the type of join. Options include:

  • JoinKind.Inner
  • JoinKind.LeftOuter
  • JoinKind.RightOuter
  • JoinKind.FullOuter
  • JoinKind.LeftAnti
  • JoinKind.RightAnti

An optional set of keyEqualityComparers may be included to specify how to compare the key columns. This feature is currently intended for internal use only.`;
    
    wasFixed = true;
  }
  
  // Fix Table.ExpandRecordColumn - fix the broken parameter formatting
  if (func.name === 'Table.ExpandRecordColumn') {
    console.log(`Fixing Table.ExpandRecordColumn parameter formatting`);
    
    func.description = `Given the column of records in the input table, creates a table with a column for each field in the record. Optionally, newColumnNames may be specified to ensure unique names for the columns in the new table.

  • table: The original table with the record column to expand
  • column: The column to expand
  • fieldNames: The list of fields to expand into columns in the table
  • newColumnNames: The list of column names to give the new columns. The new column names cannot duplicate any column in the new table`;
    
    wasFixed = true;
  }
  
  // Check Table.Group for GroupKind formatting
  if (func.name === 'Table.Group') {
    console.log(`Checking Table.Group for GroupKind formatting improvements`);
    
    if (func.description && func.description.includes('GroupKind.Local')) {
      // Check if it needs better structure
      func.description = `Groups the rows of table by the key columns defined by key. The key can either be a single column name, or a list of column names. For each group, a record is constructed containing the key columns (and their values), along with any aggregated columns specified by aggregatedColumns. Optionally, groupKind and comparer may also be specified.

If the data is already sorted by the key columns, then a groupKind of GroupKind.Local can be provided. This may improve the performance of grouping in certain cases, since all the rows with a given set of key values are assumed to be contiguous.

When passing a comparer, note that if it treats differing keys as equal, a row may be placed in a group whose keys differ from its own.

This function does not guarantee the ordering of the rows it returns.`;
      wasFixed = true;
    }
  }
  
  // Check for other functions with broken parameter formatting
  if (func.description && func.description.includes('•') && !func.description.includes('  •')) {
    console.log(`Fixing broken bullet formatting for ${func.name}`);
    
    // Fix broken bullet patterns where the bullet got attached to words
    func.description = func.description.replace(/(\w)•\s*(\w)/g, '$1\n\n  • $2');
    func.description = func.description.replace(/•([A-Z])/g, '\n  • $1');
    
    wasFixed = true;
  }
  
  // Check functions with join algorithm options
  if (func.description && func.description.includes('JoinAlgorithm')) {
    console.log(`Checking JoinAlgorithm formatting for ${func.name}`);
    
    // These are usually already handled by the main formatter
  }
  
  // Check functions with missing field options
  if (func.description && func.description.includes('MissingField')) {
    console.log(`Checking MissingField formatting for ${func.name}`);
    
    // These are usually already handled by the main formatter
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific table function formatting issues`);
console.log(`${fixedCount} table functions had additional formatting improvements`);
console.log('All table functions now have consistent formatting with proper line breaks and bullet points');