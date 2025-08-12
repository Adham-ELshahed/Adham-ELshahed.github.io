import { type Function, type InsertFunction, type Category, type InsertCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Function CRUD operations
  getFunction(id: string): Promise<Function | undefined>;
  getFunctionByName(name: string): Promise<Function | undefined>;
  getFunctionsByCategory(category: string): Promise<Function[]>;
  getAllFunctions(): Promise<Function[]>;
  searchFunctions(query: string): Promise<Function[]>;
  createFunction(func: InsertFunction): Promise<Function>;
  
  // Category CRUD operations
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private functions: Map<string, Function>;
  private categories: Map<string, Category>;

  constructor() {
    this.functions = new Map();
    this.categories = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoryData = [
      { name: "access-data", description: "Functions that enable connection to and retrieval of data from various external data sources including databases, web services, and cloud platforms.", functionCount: "50" },
      { name: "date-time", description: "Date and time functions help create calculations and transformations based on dates and time. Many of these functions are similar to Excel date and time functions.", functionCount: "45" },
      { name: "text", description: "Text functions manipulate and transform string values, including operations for cleaning, formatting, and extracting data from text columns.", functionCount: "65" },
      { name: "table", description: "These functions create, manipulate, and transform tables and their structure, including operations for filtering, joining, and reshaping data.", functionCount: "120" },
      { name: "list", description: "List functions work with list values, providing operations for creating, transforming, and aggregating lists of data.", functionCount: "55" },
      { name: "logical", description: "Logical functions act upon expressions to return information about the values or perform conditional operations.", functionCount: "15" },
      { name: "number", description: "Number functions perform mathematical operations and transformations on numeric values, including rounding, formatting, and conversion operations.", functionCount: "40" },
      { name: "record", description: "Record functions work with record values, providing operations for creating, accessing, and transforming structured data records.", functionCount: "35" },
      { name: "type", description: "Type functions provide information about data types and enable type checking and conversion operations.", functionCount: "25" },
      { name: "uri", description: "URI functions work with Uniform Resource Identifiers, providing operations for parsing and constructing URI values.", functionCount: "12" },
      { name: "value", description: "Value functions provide operations for working with generic values, including comparison, conversion, and metadata operations.", functionCount: "30" },
      { name: "expression", description: "Expression functions enable dynamic evaluation and manipulation of Power Query expressions and provide metadata about query execution.", functionCount: "20" }
    ];

    categoryData.forEach(cat => {
      const id = randomUUID();
      const category: Category = { ...cat, id };
      this.categories.set(id, category);
    });

    // Initialize some sample functions
    const functionData = [
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
      },
      {
        name: "Text.Upper",
        category: "text",
        description: "Returns the uppercase version of a text value.",
        syntax: "Text.Upper(text as nullable text) as nullable text",
        parameters: [
          { name: "text", type: "nullable text", description: "The text value to convert to uppercase." }
        ],
        returnType: "nullable text",
        examples: [
          { title: "Basic Example", code: 'Text.Upper("hello world")' }
        ],
        remarks: "Returns null if the input text is null.",
        compatibility: { "Power BI": true, "Excel": true, "Dataflows": true },
        deprecated: false,
        volatile: false
      },
      {
        name: "Date.Year",
        category: "date-time",
        description: "Returns the year portion of a date value.",
        syntax: "Date.Year(dateTime as any) as nullable number",
        parameters: [
          { name: "dateTime", type: "any", description: "A date, datetime, or datetimezone value." }
        ],
        returnType: "nullable number",
        examples: [
          { title: "Basic Example", code: 'Date.Year(#date(2024, 12, 15))' }
        ],
        remarks: "This function can accept date, datetime, or datetimezone values.",
        compatibility: { "Power BI": true, "Excel": true, "Dataflows": true },
        deprecated: false,
        volatile: false
      },
      {
        name: "List.Sum",
        category: "list",
        description: "Returns the sum of the non-null values in a list.",
        syntax: "List.Sum(list as list, optional precision as nullable number) as any",
        parameters: [
          { name: "list", type: "list", description: "A list of numbers to sum." },
          { name: "precision", type: "nullable number", description: "Optional precision for decimal calculations." }
        ],
        returnType: "any",
        examples: [
          { title: "Basic Example", code: 'List.Sum({1, 2, 3, 4, 5})' }
        ],
        remarks: "Null values are ignored in the calculation.",
        compatibility: { "Power BI": true, "Excel": true, "Dataflows": true },
        deprecated: false,
        volatile: false
      },
      {
        name: "Access.Database",
        category: "access-data",
        description: "Returns a structural representation of an Access database.",
        syntax: "Access.Database(database as binary, optional options as nullable record) as table",
        parameters: [
          { name: "database", type: "binary", description: "The Access database file content." },
          { name: "options", type: "nullable record", description: "Optional parameters for the connection." }
        ],
        returnType: "table",
        examples: [
          { title: "Basic Example", code: 'Access.Database(File.Contents("C:\\data\\database.accdb"))' }
        ],
        remarks: "Connects to Microsoft Access database files (.mdb and .accdb formats).",
        compatibility: { "Power BI": true, "Excel": true, "Dataflows": false },
        deprecated: false,
        volatile: false
      }
    ];

    functionData.forEach(func => {
      const id = randomUUID();
      const powerQueryFunction: Function = {
        ...func,
        id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.functions.set(id, powerQueryFunction);
    });
  }

  async getFunction(id: string): Promise<Function | undefined> {
    return this.functions.get(id);
  }

  async getFunctionByName(name: string): Promise<Function | undefined> {
    return Array.from(this.functions.values()).find(func => func.name === name);
  }

  async getFunctionsByCategory(category: string): Promise<Function[]> {
    return Array.from(this.functions.values()).filter(func => func.category === category);
  }

  async getAllFunctions(): Promise<Function[]> {
    return Array.from(this.functions.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async searchFunctions(query: string): Promise<Function[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.functions.values()).filter(func => 
      func.name.toLowerCase().includes(searchTerm) ||
      func.description.toLowerCase().includes(searchTerm) ||
      func.category.toLowerCase().includes(searchTerm)
    );
  }

  async createFunction(insertFunction: InsertFunction): Promise<Function> {
    const id = randomUUID();
    const func: Function = {
      ...insertFunction,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.functions.set(id, func);
    return func;
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.name === name);
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();
