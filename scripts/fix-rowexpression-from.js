import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing RowExpression.From formatting...\n');

// Find the RowExpression.From function
const rowExpressionFrom = functionsData.find(func => func.name === 'RowExpression.From');

if (!rowExpressionFrom) {
  console.log('RowExpression.From function not found!');
  process.exit(1);
}

console.log('Original description:');
console.log(rowExpressionFrom.description);
console.log('\n---\n');

// Format the description properly with bullet points and line breaks
const formattedDescription = `Returns the abstract syntax tree (AST) for the body of function, normalized into a row expression.

The function must be a 1-argument lambda.

All references to the function parameter are replaced with RowExpression.Row.

All references to columns are replaced with RowExpression.Column(columnName).

The AST will be simplified to contain only nodes of the kinds:

  • Constant
  • Invocation
  • Unary
  • Binary
  • If
  • FieldAccess

An error is raised if a row expression AST cannot be returned for the body of function.

This function is identical to ItemExpression.From.`;

// Update the function description
rowExpressionFrom.description = formattedDescription;

// Make sure remarks matches exactly
rowExpressionFrom.remarks = formattedDescription;

console.log('New formatted description:');
console.log(rowExpressionFrom.description);
console.log('\n---\n');

// Update the functions array
const functionIndex = functionsData.findIndex(func => func.name === 'RowExpression.From');
if (functionIndex !== -1) {
  functionsData[functionIndex] = rowExpressionFrom;
}

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log('✅ RowExpression.From formatting fixed!');
console.log('✅ Remarks section synchronized with description');
console.log('✅ Applied same formatting standards as all other functions');