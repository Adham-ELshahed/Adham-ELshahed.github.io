// This file contains comprehensive Power Query function data
// In a real application, this would be loaded from the backend API

export const powerQueryCategories = [
  {
    name: "access-data",
    description: "Functions that enable connection to and retrieval of data from various external data sources including databases, web services, and cloud platforms.",
    functionCount: "50+"
  },
  {
    name: "date-time",
    description: "Date and time functions help create calculations and transformations based on dates and time. Many of these functions are similar to Excel date and time functions.",
    functionCount: "45+"
  },
  {
    name: "text",
    description: "Text functions manipulate and transform string values, including operations for cleaning, formatting, and extracting data from text columns.",
    functionCount: "65+"
  },
  {
    name: "table",
    description: "These functions create, manipulate, and transform tables and their structure, including operations for filtering, joining, and reshaping data.",
    functionCount: "120+"
  },
  {
    name: "list",
    description: "List functions work with list values, providing operations for creating, transforming, and aggregating lists of data.",
    functionCount: "55+"
  },
  {
    name: "logical",
    description: "Logical functions act upon expressions to return information about the values or perform conditional operations.",
    functionCount: "15+"
  },
  {
    name: "number",
    description: "Number functions perform mathematical operations and transformations on numeric values, including rounding, formatting, and conversion operations.",
    functionCount: "40+"
  },
  {
    name: "record",
    description: "Record functions work with record values, providing operations for creating, accessing, and transforming structured data records.",
    functionCount: "35+"
  },
  {
    name: "type",
    description: "Type functions provide information about data types and enable type checking and conversion operations.",
    functionCount: "25+"
  },
  {
    name: "uri",
    description: "URI functions work with Uniform Resource Identifiers, providing operations for parsing and constructing URI values.",
    functionCount: "12+"
  },
  {
    name: "value",
    description: "Value functions provide operations for working with generic values, including comparison, conversion, and metadata operations.",
    functionCount: "30+"
  },
  {
    name: "expression",
    description: "Expression functions enable dynamic evaluation and manipulation of Power Query expressions and provide metadata about query execution.",
    functionCount: "20+"
  }
];

export const sampleFunctions = [
  {
    name: "Table.FromRows",
    category: "table",
    description: "Creates a table from a list of row values and an optional list of column names.",
    syntax: "Table.FromRows(rows as list, optional columns as any) as table",
    parameters: [
      { name: "rows", type: "list", description: "A list of lists, where each inner list represents a row of data." },
      { name: "columns", type: "any", description: "Optional column names or column count." }
    ],
    returnType: "table",
    examples: [
      { title: "Basic Example", code: 'Table.FromRows({{"Alice", 25}, {"Bob", 30}}, {"Name", "Age"})' }
    ],
    remarks: "This function is useful for creating tables from static data or when transforming list data into table format.",
    compatibility: { "Power BI": true, "Excel": true, "Dataflows": true },
    deprecated: false,
    volatile: false
  }
  // Additional functions would be added here
];
