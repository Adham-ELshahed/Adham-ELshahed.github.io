import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
import FunctionCard from "@/components/function-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { type Function } from "@shared/schema";
import { Search } from "lucide-react";

export default function Functions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: functions, isLoading } = useQuery<Function[]>({
    queryKey: ["/api/functions"],
  });

  const filteredFunctions = functions?.filter((func) => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || func.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(functions?.map(f => f.category) || []));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-280 flex-1 min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-ms-gray mb-4">Power Query Functions</h1>
              <p className="text-lg text-ms-gray-secondary leading-relaxed">
                Browse all Power Query functions alphabetically or filter by category.
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ms-gray-secondary" />
                <Input
                  placeholder="Search functions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' and ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-ms-gray-secondary">
                {isLoading ? "Loading..." : `${filteredFunctions?.length || 0} functions found`}
              </p>
            </div>

            {/* Functions Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-ms-gray-border rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-16 bg-gray-100 rounded mb-3"></div>
                    <div className="h-4 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredFunctions && filteredFunctions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFunctions.map((func) => (
                  <FunctionCard key={func.id} function={func} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-ms-gray-secondary mb-4">No functions found</p>
                <p className="text-sm text-ms-gray-secondary">
                  Try adjusting your search query or category filter.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
