import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all functions
  app.get("/api/functions", async (_req, res) => {
    try {
      const functions = await storage.getAllFunctions();
      res.json(functions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch functions" });
    }
  });

  // Get function by name
  app.get("/api/functions/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const func = await storage.getFunctionByName(name);
      if (!func) {
        return res.status(404).json({ message: "Function not found" });
      }
      res.json(func);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch function" });
    }
  });

  // Get functions by category
  app.get("/api/functions/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const functions = await storage.getFunctionsByCategory(category);
      res.json(functions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch functions by category" });
    }
  });

  // Search functions
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const functions = await storage.searchFunctions(q);
      res.json(functions);
    } catch (error) {
      res.status(500).json({ message: "Failed to search functions" });
    }
  });

  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by name
  app.get("/api/categories/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const category = await storage.getCategoryByName(name);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
