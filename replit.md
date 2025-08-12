# Power Query Guide

## Overview

A comprehensive web application providing documentation and reference for Power Query functions, cloning the exact design and functionality of dax.guide but populated with Power Query function data. Built as a React frontend with an Express backend, this application serves as a searchable database of 651 Power Query functions organized into 24 categories. Users can browse functions alphabetically, search by keywords, filter by categories, and view detailed information including syntax, parameters, examples, and compatibility notes.

## Recent Changes (Dec 15, 2024)

- Processed and imported all 651 Power Query functions from JSON file across 24 categories
- Redesigned sidebar with three tabs: A-Z (alphabetical functions), Groups (collapsible categories), and Search
- Removed "All Products" and "Any Attribute" filters as requested
- Fixed TypeScript errors in function detail page for better type safety
- Updated category name formatting throughout the application
- Enhanced search to only match function names (not descriptions)
- Added IDE-style code blocks with syntax highlighting and copy functionality
- Fixed layout positioning: header is now fixed, sidebar starts properly, main content positioned correctly
- Made category names both clickable links AND collapsible dropdowns in Groups tab
- Added section navigation links to function detail pages (Syntax, Parameters, Examples, etc.)
- Updated category pages to display functions in clean table format with Name and Description columns
- Removed compatibility section from function pages as requested
- Created blog page matching blog.crossjoin.co.uk with full posts, thin separator lines, and independent sidebar scrolling
- Removed pagination, translation options, and "Stay Updated" from blog as requested
- Fixed code block copy functionality to copy clean text without HTML styling tags
- Enhanced code blocks with proper line numbers, IDE-style syntax highlighting, and multi-line support matching user's screenshot
- Updated home page content with comprehensive Power Query information from provided Word document
- Replaced category descriptions with detailed explanations from Excel file covering all 24 function categories
- Added new sections: Expressions/let expressions, Comments, Evaluation Model, Operators, Types/conversion, Metadata, Errors, Text Formatting, Enumerations, Constants, Dynamic Values
- Restructured "About This Reference" section with attribution to BI Gorilla and Rick de Groot
- Converted functions page from cards to clean table format with Name, Description, and Category columns
- Applied dark green theme throughout application (hsl(142, 65%, 28%)) matching user's reference image
- Made header green with white text and navigation for consistent branding
- Fixed function detail page routing to use `/function/{functionName}` format for proper individual function pages
- Verified "#binary" function is correctly loaded and accessible via both table view and direct URL
- Cleaned up blog page by removing all dummy posts, now shows empty state message
- Updated blog sidebar to conditionally show "Top Posts" section only when posts exist
- Implemented Google Analytics tracking across all pages using GA4 (G-MQMH8WGLCM)
- Added analytics initialization in App.tsx with automatic page view tracking
- Created analytics utility functions for custom event tracking
- Set up proper TypeScript definitions for Google Analytics integration
- Converted functions page from card layout to clean table format with Name, Description, and Category columns
- Implemented green theme throughout the application replacing the previous blue Microsoft color scheme
- Updated all CSS variables for both light and dark modes to use green color palette
- Fixed category dropdown issue in Groups tab by updating category names to match function data
- Fixed all sidebar function links to use proper `/function/{functionName}` format instead of old routing
- Updated category links in sidebar to use `/category/{categoryName}` format
- Resolved routing issues for functions with special characters like # symbols
- Fixed route order in App.tsx to prevent conflicts between `/functions` and `/functions/:functionName`
- Resolved double URL encoding issue that was causing 404 errors for # functions
- All # functions now correctly route to individual detail pages with proper JSON content display
- Function detail pages display: syntax, description, parameters, return type, examples, and remarks from JSON data

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