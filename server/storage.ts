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
    this.initializeData().catch(console.error);
  }

  private async initializeData() {
    try {
      // Load processed data
      const fs = await import('fs');
      const categoriesData = JSON.parse(fs.readFileSync('scripts/processed-categories.json', 'utf8'));
      const functionsData = JSON.parse(fs.readFileSync('scripts/processed-functions.json', 'utf8'));

      // Initialize categories
      categoriesData.forEach((cat: any) => {
        const id = randomUUID();
        const category: Category = { 
          id,
          name: cat.name,
          description: cat.description,
          functionCount: cat.functionCount || "0"
        };
        this.categories.set(id, category);
      });

      // Initialize functions
      functionsData.forEach((func: any) => {
        const id = randomUUID();
        const powerQueryFunction: Function = {
          id,
          name: func.name,
          category: func.category,
          description: func.description,
          syntax: func.syntax,
          parameters: func.parameters || [],
          returnType: func.returnType,
          examples: func.examples || [],
          remarks: func.remarks,
          compatibility: func.compatibility || {},
          deprecated: func.deprecated || false,
          volatile: func.volatile || false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.functions.set(id, powerQueryFunction);
      });

      console.log(`Loaded ${functionsData.length} functions and ${categoriesData.length} categories`);
    } catch (error) {
      console.error('Error loading processed data, falling back to sample data:', error);
      this.initializeSampleData();
    }
  }

  private initializeSampleData() {
    // Fallback sample data
    const categoryData = [
      { name: "access-datafunctions", description: "Functions that enable connection to and retrieval of data from various external data sources.", functionCount: "50" },
      { name: "table", description: "Functions that create, manipulate, and transform tables and their structure.", functionCount: "120" },
      { name: "text", description: "Text functions manipulate and transform string values.", functionCount: "65" },
      { name: "list", description: "List functions work with list values.", functionCount: "55" },
      { name: "number", description: "Number functions perform mathematical operations on numeric values.", functionCount: "40" },
    ];

    categoryData.forEach(cat => {
      const id = randomUUID();
      const category: Category = { 
        id,
        name: cat.name,
        description: cat.description,
        functionCount: cat.functionCount
      };
      this.categories.set(id, category);
    });

    // Sample functions
    const sampleFunctions = [
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
        remarks: "This function is useful for creating tables from static data.",
        compatibility: { "Power BI": true, "Excel": true, "Dataflows": true },
        deprecated: false,
        volatile: false
      }
    ];

    sampleFunctions.forEach(func => {
      const id = randomUUID();
      const powerQueryFunction: Function = {
        id,
        name: func.name,
        category: func.category,
        description: func.description,
        syntax: func.syntax,
        parameters: func.parameters,
        returnType: func.returnType,
        examples: func.examples,
        remarks: func.remarks,
        compatibility: func.compatibility,
        deprecated: func.deprecated,
        volatile: func.volatile,
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
