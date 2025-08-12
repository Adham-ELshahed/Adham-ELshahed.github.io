import fs from 'fs';
import path from 'path';

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('../attached_assets/powerquery (1)_1754990784814.json', 'utf8'));

function extractFunctions(obj, category = '', parentPath = []) {
  const functions = [];
  
  if (obj.pages && Array.isArray(obj.pages)) {
    for (const page of obj.pages) {
      if (page.pages && page.pages.length > 0) {
        // This is a category
        const categoryName = page.title.toLowerCase()
          .replace(/\s+functions?$/i, '')
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-');
        
        functions.push(...extractFunctions(page, categoryName, [...parentPath, page.title]));
      } else if (page.title && page.Syntax) {
        // This is a function
        const func = {
          name: page.title,
          category: category || 'general',
          description: page.About || 'Power Query function',
          syntax: page.Syntax,
          parameters: extractParameters(page.Syntax),
          returnType: extractReturnType(page.Syntax),
          examples: page.Explain ? [{ title: 'Example', code: page.Explain }] : [],
          remarks: page.About || null,
          compatibility: { "Power BI": true, "Excel": true, "Dataflows": true },
          deprecated: false,
          volatile: false
        };
        functions.push(func);
      }
    }
  }
  
  return functions;
}

function extractParameters(syntax) {
  if (!syntax) return [];
  
  // Basic parameter extraction from syntax
  const paramMatch = syntax.match(/\(([^)]*)\)/);
  if (!paramMatch) return [];
  
  const paramString = paramMatch[1];
  const params = paramString.split(',').map(p => p.trim()).filter(p => p);
  
  return params.map(param => {
    const parts = param.split(' as ');
    const name = parts[0]?.replace(/optional\s+/, '').trim() || 'parameter';
    const type = parts[1]?.trim() || 'any';
    
    return {
      name: name,
      type: type,
      description: `Parameter of type ${type}`
    };
  });
}

function extractReturnType(syntax) {
  if (!syntax) return 'any';
  
  const returnMatch = syntax.match(/\)\s*as\s+([^,\s]+)/);
  return returnMatch ? returnMatch[1] : 'any';
}

// Process the data
const allFunctions = extractFunctions(jsonData);

// Get unique categories
const categories = [...new Set(allFunctions.map(f => f.category))].sort();

// Create category descriptions
const categoryDescriptions = {
  'access-data': 'Functions that enable connection to and retrieval of data from various external data sources including databases, web services, and cloud platforms.',
  'aggregation': 'Functions that perform mathematical calculations and aggregations on data sets.',
  'date-time': 'Date and time functions help create calculations and transformations based on dates and time.',
  'text': 'Text functions manipulate and transform string values, including operations for cleaning, formatting, and extracting data.',
  'table': 'Functions that create, manipulate, and transform tables and their structure.',
  'list': 'List functions work with list values, providing operations for creating, transforming, and aggregating lists.',
  'logical': 'Logical functions act upon expressions to return information about the values or perform conditional operations.',
  'number': 'Number functions perform mathematical operations and transformations on numeric values.',
  'record': 'Record functions work with record values, providing operations for creating, accessing, and transforming structured data.',
  'type': 'Type functions provide information about data types and enable type checking and conversion operations.',
  'uri': 'URI functions work with Uniform Resource Identifiers, providing operations for parsing and constructing URI values.',
  'value': 'Value functions provide operations for working with generic values, including comparison and conversion operations.',
  'expression': 'Expression functions enable dynamic evaluation and manipulation of Power Query expressions.',
  'general': 'General utility functions that don\'t fit into specific categories.'
};

const categoriesWithData = categories.map(cat => ({
  name: cat,
  description: categoryDescriptions[cat] || `Functions related to ${cat}.`,
  functionCount: allFunctions.filter(f => f.category === cat).length.toString()
}));

// Output the results
console.log(`Processed ${allFunctions.length} functions across ${categories.length} categories`);
console.log('Categories:', categories);

// Write to output files
fs.writeFileSync('processed-functions.json', JSON.stringify(allFunctions, null, 2));
fs.writeFileSync('processed-categories.json', JSON.stringify(categoriesWithData, null, 2));

console.log('Files written: processed-functions.json, processed-categories.json');