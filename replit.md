# Power Query Guide

## Overview

A comprehensive web application providing documentation and reference for Power Query functions, cloning the exact design and functionality of dax.guide but populated with Power Query function data. Built as a React frontend with an Express backend, this application serves as a searchable database of 651 Power Query functions organized into 24 categories. Users can browse functions alphabetically, search by keywords, filter by categories, and view detailed information including syntax, parameters, examples, and compatibility notes.

## Recent Changes (Dec 15, 2024)

- Processed and imported all 651 Power Query functions from JSON file across 24 categories
- Redesigned sidebar with three tabs: A-Z (alphabetical functions), Groups (collapsible categories), and Search
- Removed "All Products" and "Any Attribute" filters as requested
- Fixed TypeScript errors in function detail page for better type safety
- Updated category name formatting throughout the application

## User Preferences

Preferred communication style: Simple, everyday language.
Project scope: Complete clone of dax.guide design with Power Query functions instead of DAX functions.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling and development
- **Routing**: Wouter for client-side routing with pages for home, functions listing, category views, and function details
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **Design System**: Microsoft-inspired color scheme with custom CSS variables for consistent theming

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful endpoints for function CRUD operations, category management, and search functionality
- **Data Layer**: Currently using in-memory storage with plans for PostgreSQL integration via Drizzle ORM
- **Development Setup**: Vite middleware integration for hot module replacement in development

### Data Storage Solutions
- **Current**: In-memory storage using Map data structures for functions and categories
- **Planned**: PostgreSQL database with Drizzle ORM for type-safe database operations
- **Schema**: Defined database schemas for functions and categories with support for metadata, examples, and compatibility information

### Authentication and Authorization
- **Current**: No authentication system implemented
- **Architecture**: Basic session-based structure present in package dependencies (connect-pg-simple for session storage)

### Frontend-Backend Integration
- **Data Fetching**: Custom query client with automatic error handling and response validation
- **API Communication**: JSON-based REST API with TypeScript interfaces shared between frontend and backend
- **Error Handling**: Centralized error handling with user-friendly error messages and proper HTTP status codes

### Development and Build Process
- **Build System**: Vite for frontend bundling with esbuild for backend compilation
- **Development**: Concurrent development server with hot reloading for both frontend and backend
- **TypeScript**: Strict TypeScript configuration with path aliases for clean imports
- **Code Quality**: ESModule format throughout the codebase for modern JavaScript standards