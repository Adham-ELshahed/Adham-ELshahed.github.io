import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing specific table functions that need better formatting...\n');

let fixedCount = 0;

// Process the specific table functions that need fixes
functionsData.forEach((func, index) => {
  if (func.category !== 'table') return;
  
  let wasFixed = false;
  
  // Fix Table.Partition - format parameters with bullet points
  if (func.name === 'Table.Partition') {
    console.log(`Fixing Table.Partition parameter formatting`);
    
    func.description = `Partitions the table into a list of groups number of tables, based on the value of the column and a hash function. The hash function is applied to the value of the column row to obtain a hash value for the row. The hash value modulo groups determines in which of the returned tables the row will be placed.

Parameters:

  • table: The table to partition
  • column: The column to hash to determine which returned table the row is in
  • groups: The number of tables the input table will be partitioned into
  • hash: The function applied to obtain a hash value`;
    
    wasFixed = true;
  }
  
  // Fix Table.PositionOf - fix broken bullet formatting and improve structure
  if (func.name === 'Table.PositionOf') {
    console.log(`Fixing Table.PositionOf broken bullet formatting`);
    
    func.description = `Returns the row position of the first occurrence of the row in the table specified. Returns -1 if no occurrence is found.

Parameters:

  • table: The input table
  • row: The row in the table to find the position of
  • occurrence: [Optional] Specifies which occurrences of the row to return
  • equationCriteria: [Optional] Controls the comparison between the table rows`;
    
    wasFixed = true;
  }
  
  // Fix Table.PositionOfAny - fix broken bullet formatting and remove stray backtick
  if (func.name === 'Table.PositionOfAny') {
    console.log(`Fixing Table.PositionOfAny broken bullet formatting and stray backtick`);
    
    func.description = `Returns the row(s) position(s) from the table of the first occurrence of the list of rows. Returns -1 if no occurrence is found.

Parameters:

  • table: The input table
  • rows: The list of rows in the table to find the positions of
  • occurrence: [Optional] Specifies which occurrences of the row to return
  • equationCriteria: [Optional] Controls the comparison between the table rows`;
    
    wasFixed = true;
  }
  
  // Fix Table.Profile - format the returned information with bullet points
  if (func.name === 'Table.Profile') {
    console.log(`Fixing Table.Profile returned information formatting`);
    
    func.description = `Returns a profile for the columns in table.

The following information is returned for each column (when applicable):

  • minimum
  • maximum
  • average
  • standard deviation
  • count
  • null count
  • distinct count`;
    
    wasFixed = true;
  }
  
  // Fix Table.ReplaceRows - format parameters with bullet points
  if (func.name === 'Table.ReplaceRows') {
    console.log(`Fixing Table.ReplaceRows parameter formatting`);
    
    func.description = `Replaces a specified number of rows, count, in the input table with the specified rows, beginning after the offset. The rows parameter is a list of records.

Parameters:

  • table: The table where the replacement is performed
  • offset: The number of rows to skip before making the replacement
  • count: The number of rows to replace
  • rows: The list of row records to insert into the table at the location specified by the offset`;
    
    wasFixed = true;
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing specific table function formatting issues`);
console.log(`${fixedCount} table functions were improved with proper bullet point formatting`);
console.log('All specified functions now have consistent formatting with 2-space indented bullet points');