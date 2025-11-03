import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Functions from "@/pages/functions";
import FunctionDetail from "@/pages/function-detail";
import Category from "@/pages/category";
import Blog from "@/pages/blog";
import About from "@/pages/about";
import DataTypes from "@/pages/data-types";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { useLocation } from "wouter";

// Get base path from environment or use root for development  
const basePath = import.meta.env.BASE_URL || "/";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  const [location] = useLocation();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/function/:functionName" component={FunctionDetail} />
      <Route path="/functions" component={Functions} />
      <Route path="/category/:category" component={Category} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/datatypes" component={DataTypes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={basePath}>
          <Toaster />
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
