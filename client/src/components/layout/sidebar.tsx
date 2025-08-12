import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { type Function } from "@shared/schema";

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [attributeFilter, setAttributeFilter] = useState("any");

  const { data: functions } = useQuery<Function[]>({
    queryKey: ["/api/functions"],
  });

  const filteredFunctions = functions?.filter((func) => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase());
    // Add more filtering logic based on product and attribute filters if needed
    return matchesSearch;
  }).slice(0, 50); // Limit to first 50 for performance

  return (
    <aside className="fixed left-0 top-16 w-280 h-screen bg-ms-gray-light border-r border-ms-gray-border overflow-y-auto sidebar-scroll z-30">
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-ms-gray mb-2 uppercase tracking-wide">Functions</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ms-gray-secondary" />
            <Input
              type="text"
              placeholder="Search functions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 text-sm border border-ms-gray-border rounded-md search-input"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div class="space-y-3 mb-4">
          <div>
            <h4 className="text-xs font-semibold text-ms-gray-secondary mb-2 uppercase tracking-wide">All Products</h4>
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All products</SelectItem>
                <SelectItem value="powerbi">Power BI</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="dataflows">Dataflows</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-ms-gray-secondary mb-2 uppercase tracking-wide">Any Attribute</h4>
            <Select value={attributeFilter} onValueChange={setAttributeFilter}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any attribute</SelectItem>
                <SelectItem value="deprecated">Deprecated</SelectItem>
                <SelectItem value="volatile">Volatile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alphabetical Function List */}
        <div className="space-y-1">
          <div className="mb-2">
            <span className="text-xs font-semibold text-ms-gray-secondary uppercase tracking-wide">A-Z</span>
          </div>
          
          <div className="space-y-1">
            {filteredFunctions?.map((func) => (
              <Link
                key={func.id}
                href={`/functions/${func.category}/${func.name}`}
                className="block px-2 py-1 text-sm text-ms-gray hover:text-ms-blue hover:bg-white rounded transition-colors"
              >
                {func.name}
              </Link>
            ))}
            
            {functions && functions.length > 50 && (
              <div className="pt-2 text-xs text-ms-gray-secondary px-2">
                <span>... and {functions.length - 50}+ more functions</span>
                <div className="mt-1">
                  <Link href="/functions" className="text-ms-blue hover:text-ms-blue-hover">
                    View all functions
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
