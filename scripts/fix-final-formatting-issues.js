import fs from 'fs';

// Load the processed functions
const functionsData = JSON.parse(fs.readFileSync('processed-functions.json', 'utf8'));

console.log('Fixing final formatting issues...\n');

// Helper function to properly format text with bullet points
function formatBulletText(text) {
  if (!text) return text;
  
  // Split into lines and process
  let lines = text.split('\n');
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip completely empty lines
    if (line.trim() === '') continue;
    
    // Skip lines that are just bullets with no content
    if (line.trim() === '•' || /^\s*•\s*$/.test(line.trim())) continue;
    
    // Add the line
    result.push(line);
  }
  
  return result.join('\n').trim();
}

let fixedCount = 0;

// Process each function
functionsData.forEach((func, index) => {
  if (func.category !== 'access-datafunctions') return;
  
  let wasFixed = false;
  
  // 1. Fix CSV.Document - clean up bullet formatting
  if (func.name === 'Csv.Document') {
    console.log(`Fixing CSV.Document bullet formatting`);
    const originalDescription = func.description;
    
    // Properly format the description with correct bullet points
    func.description = `Returns the contents of the CSV document as a table. columns can be null, the number of columns, a list of column names, a table type, or an options record. delimiter can be a single character, or a list of characters.

  • Default: ",". Refer to ExtraValues.Type for the supported values of extraValues. encoding specifies the text encoding type.

If a record is specified for columns (and delimiter, extraValues, and encoding are null), the following record fields may be provided:

  • Delimiter: The column delimiter (default: ",").
  • Columns: Can be null, the number of columns, a list of column names, or a table type. If the number of columns is lower than the number found in the input, the additional columns will be ignored. If the number of columns is higher than the number found in the input, the additional columns will be null. When not specified, the number of columns will be determined by what is found in the input.
  • Encoding: The text encoding of the file (default: 65001 UTF-8).
  • CsvStyle: Specifies how quotes are handled. CsvStyle.QuoteAfterDelimiter (default): Quotes in a field are only significant immediately following the delimiter. CsvStyle.QuoteAlways: Quotes in a field are always significant, regardless of where they appear.
  • QuoteStyle: Specifies how quoted line breaks are handled. QuoteStyle.None (default): All line breaks are treated as the end of the current row, even when they occur inside a quoted value. QuoteStyle.Csv: Quoted line breaks are treated as part of the data, not as the end of the current row.`;
    
    wasFixed = true;
  }
  
  // 2. Fix Excel.Workbook - clean up bullet formatting  
  if (func.name === 'Excel.Workbook') {
    console.log(`Fixing Excel.Workbook bullet formatting`);
    
    func.description = `Returns the contents of the Excel workbook. useHeaders can be null, a logical (true/false) value indicating whether the first row of each returned table should be treated as a header, or an options record.

  • Default: false. delayTypes can be null or a logical (true/false) value indicating whether the columns of each returned table should be left untyped (default: false).

If a record is specified for useHeaders (and delayTypes is null), the following record fields may be provided:

  • UseHeaders: Can be null or a logical (true/false) value indicating whether the first row of each returned table should be treated as a header (default: false).
  • DelayTypes: Can be null or a logical (true/false) value indicating whether the columns of each returned table should be left untyped (default: false).
  • InferSheetDimensions: Can be null or a logical (true/false) value indicating whether the area of a worksheet that contains data should be inferred by reading the worksheet itself, rather than by reading the dimensions metadata from the file. This can be useful in cases where the dimensions metadata is incorrect. Note that this option is only supported for Open XML Excel files, not for legacy Excel files (default: false).`;
    
    wasFixed = true;
  }
  
  // 3. Fix PDF.Tables - merge default values into bullet points
  if (func.name === 'Pdf.Tables') {
    console.log(`Fixing PDF.Tables default value formatting`);
    
    func.description = `Returns any tables found in pdf. An optional record parameter, options, may be provided to specify additional properties. The record can contain the following fields:

  • Implementation: The version of the algorithm to use when identifying tables. Old versions are available only for backwards compatibility, to prevent old queries from being broken by algorithm updates. The newest version should always give the best results. Valid values are "1.3", "1.2", "1.1", or null.
  • StartPage: Specifies the first page in the range of pages to examine (default: 1).
  • EndPage: Specifies the last page in the range of pages to examine (default: the last page of the document).
  • MultiPageTables: Controls whether similar tables on consecutive pages will be automatically combined into a single table (default: true).
  • EnforceBorderLines: Controls whether border lines are always enforced as cell boundaries (when true), or simply used as one hint among many for determining cell boundaries (when false) (default: false).`;
    
    wasFixed = true;
  }
  
  // 4. Fix AzureStorage.BlobContents - move description from syntax to description and clear syntax
  if (func.name === 'AzureStorage.BlobContents') {
    console.log(`Fixing AzureStorage.BlobContents - moving description from syntax field`);
    
    func.description = `Returns the content of the blob at the URL, url, from an Azure storage vault. options may be specified to control the following options:

  • BlockSize: The number of bytes to read before waiting on the data consumer (default: 4 MB).
  • RequestSize: The number of bytes to try to read in a single HTTP request to the server (default: 4 MB).
  • ConcurrentRequests: The ConcurrentRequests option supports faster download of data by specifying the number of requests to be made in parallel, at the cost of memory utilization. The memory required is (ConcurrentRequest * RequestSize) (default: 16).`;
    
    func.syntax = null; // Remove syntax since there's no actual syntax
    wasFixed = true;
  }
  
  // 5. Fix AzureStorage.Blobs
  if (func.name === 'AzureStorage.Blobs') {
    console.log(`Fixing AzureStorage.Blobs - moving description from syntax field`);
    
    func.description = `Returns a navigational table containing a row for each blob found at the container URL, url, from an Azure storage vault. options may be specified to control the following options:

  • BlockSize: The number of bytes to read before waiting on the data consumer (default: 4 MB).
  • RequestSize: The number of bytes to try to read in a single HTTP request to the server (default: 4 MB).
  • ConcurrentRequests: The ConcurrentRequests option supports faster download of data by specifying the number of requests to be made in parallel, at the cost of memory utilization. The memory required is (ConcurrentRequest * RequestSize) (default: 16).`;
    
    func.syntax = null; // Remove syntax since there's no actual syntax
    wasFixed = true;
  }
  
  if (wasFixed) {
    fixedCount++;
  }
});

// Write the updated data back
fs.writeFileSync('processed-functions.json', JSON.stringify(functionsData, null, 2));

console.log(`\nCompleted fixing final formatting issues`);
console.log(`${fixedCount} functions were properly formatted:`);
console.log('- CSV.Document: Cleaned bullet point formatting');
console.log('- Excel.Workbook: Cleaned bullet point formatting');  
console.log('- PDF.Tables: Moved default values into brackets');
console.log('- AzureStorage.BlobContents: Moved description from syntax field');
console.log('- AzureStorage.Blobs: Moved description from syntax field');