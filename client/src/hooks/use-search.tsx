import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Function } from "@shared/schema";

export function useSearch(initialQuery: string = "") {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: results, isLoading, error } = useQuery<Function[]>({
    queryKey: ["/api/search", { q: debouncedQuery }],
    enabled: debouncedQuery.length > 2,
  });

  return {
    query,
    setQuery,
    results: results || [],
    isLoading,
    error,
    hasQuery: debouncedQuery.length > 2,
  };
}
