import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the processed functions
const functionsFile = path.join(__dirname, 'processed-functions.json');
const functions = JSON.parse(fs.readFileSync(functionsFile, 'utf8'));

console.log(`Processing ${functions.length} functions for formatting improvements...`);

// Comprehensive formatting function
function formatText(text) {
  if (!text) return text;
  
  let formatted = text.trim();
  
  // Pattern 1: "The record can contain the following fields:"
  if (formatted.includes('The record can contain the following fields:')) {
    return formatFieldsList(formatted, 'The record can contain the following fields:');
  }
  
  // Pattern 2: "may be specified to control the following options:"
  if (formatted.includes('may be specified to control the following options:')) {
    return formatFieldsList(formatted, 'may be specified to control the following options:');
  }
  
  // Pattern 3: "The following options are supported:"
  if (formatted.includes('The following options are supported:')) {
    return formatFieldsList(formatted, 'The following options are supported:');
  }
  
  return formatted;
}

function formatFieldsList(text, separator) {
  const parts = text.split(new RegExp(separator, 'i'));
  if (parts.length !== 2) return text;
  
  const intro = parts[0].trim();
  const fieldsText = parts[1].trim();
  
  // Extract individual fields from the concatenated text
  const fields = extractFields(fieldsText);
  
  if (fields.length > 0) {
    return intro + (intro.endsWith('.') ? '' : '.') + '\n\n' + separator + '\n\n' + fields.join('\n');
  }
  
  return text;
}

function extractFields(text) {
  const fields = [];
  
  // Common patterns for Power Query function documentation
  const fieldPatterns = [
    // Pattern: FieldName : Description
    /([A-Z][a-zA-Z]*)\s*:\s*([^:]*?)(?=\s*[A-Z][a-zA-Z]*\s*:|$)/g,
    // Pattern with "A logical" or "A duration" etc.
    /([A-Z][a-zA-Z]*)\s*:\s*A\s+(logical|duration|text|number|function)\s+([^:]*?)(?=\s*[A-Z][a-zA-Z]*\s*:|$)/g
  ];
  
  let processedText = text;
  let foundFields = new Set();
  
  // Try the first pattern
  let matches = [...text.matchAll(/([A-Z][a-zA-Z]+)\s*:\s*([^.]*?)(?=\s*[A-Z][a-zA-Z]+\s*:|\.?\s*$)/g)];
  
  matches.forEach(match => {
    const fieldName = match[1].trim();
    const description = match[2].trim();
    
    if (fieldName && description && !foundFields.has(fieldName)) {
      // Clean up the description
      let cleanDescription = description
        .replace(/\s+/g, ' ')
        .replace(/\.$/, '')
        .trim();
      
      // Handle default values
      cleanDescription = cleanDescription.replace(/(default\s+(?:is|value)\s+[^.]*)/gi, '*(default: $1)*');
      
      fields.push(`• **${fieldName}**: ${cleanDescription}.`);
      foundFields.add(fieldName);
    }
  });
  
  return fields;
}

// Format example code
function formatExampleCode(code) {
  if (!code) return code;
  
  let formatted = code;
  
  // Add proper line breaks for Usage/Output sections
  formatted = formatted.replace(/(Usage|Output)(\s*Power Query M)/gi, '\n\n$1:\n$2\n');
  
  return formatted.trim();
}

// Process all functions
let changedCount = 0;

functions.forEach((func, index) => {
  let changed = false;
  
  // Format description
  const newDescription = formatText(func.description);
  if (newDescription !== func.description) {
    func.description = newDescription;
    changed = true;
  }
  
  // Format remarks
  if (func.remarks) {
    const newRemarks = formatText(func.remarks);
    if (newRemarks !== func.remarks) {
      func.remarks = newRemarks;
      changed = true;
    }
  }
  
  // Format examples
  if (func.examples && Array.isArray(func.examples)) {
    func.examples.forEach(example => {
      if (example.code) {
        const newCode = formatExampleCode(example.code);
        if (newCode !== example.code) {
          example.code = newCode;
          changed = true;
        }
      }
    });
  }
  
  if (changed) {
    changedCount++;
    console.log(`✓ Formatted ${func.name} (${func.category})`);
  }
});

// Save the updated functions
fs.writeFileSync(functionsFile, JSON.stringify(functions, null, 2));

console.log(`\n🎉 Formatting complete!`);
console.log(`📊 Processed ${functions.length} functions`);
console.log(`✨ Improved formatting for ${changedCount} functions`);
console.log(`💾 Updated ${functionsFile}`);