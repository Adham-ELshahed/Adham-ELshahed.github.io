import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Function } from "@shared/schema";

interface SearchProps {
  placeholder?: string;
  className?: string;
}

export default function SearchComponent({ placeholder = "Search functions...", className = "" }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: searchResults } = useQuery<Function[]>({
    queryKey: ["/api/search", { q: query }],
    enabled: query.length > 2,
  });

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ms-gray-secondary" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 2);
          }}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          className="pl-10"
        />
      </div>

      {isOpen && searchResults && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {searchResults.slice(0, 10).map((func) => (
              <Link
                key={func.id}
                href={`/functions/${func.category}/${func.name}`}
                className="block p-3 hover:bg-ms-gray-light rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium text-ms-blue">{func.name}</div>
                <div className="text-sm text-ms-gray-secondary truncate">{func.description}</div>
              </Link>
            ))}
            {searchResults.length > 10 && (
              <div className="p-3 text-sm text-ms-gray-secondary border-t">
                {searchResults.length - 10} more results...
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
