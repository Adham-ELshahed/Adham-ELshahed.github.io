import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { type Function } from "@shared/schema";
import { Search } from "lucide-react";
import { Link } from "wouter";

export default function Functions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: functions, isLoading } = useQuery<Function[]>({
    queryKey: ["/functions.json"],
  });

  const filteredFunctions = functions?.filter((func) => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || func.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(functions?.map(f => f.category) || []));

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="flex">
        <Sidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="ml-0 lg:ml-280 flex-1 min-h-screen px-4 lg:px-0">
          <div className="max-w-6xl mx-auto px-6 py-8">


            {/* Search and Filter Controls */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ms-gray-secondary" />
                <Input
                  placeholder="Search groups..."
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

            {/* Functions Table */}
            {isLoading ? (
              <div className="border border-ms-gray-border rounded-lg overflow-hidden">
                <div className="bg-ms-gray-light px-6 py-4">
                  <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
                <div className="divide-y divide-ms-gray-border">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="px-6 py-4 animate-pulse">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                        </div>
                        <div className="h-4 bg-gray-100 rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredFunctions && filteredFunctions.length > 0 ? (
              <div className="border border-ms-gray-border rounded-lg overflow-hidden bg-white">
                <div className="bg-ms-gray-light px-6 py-4 border-b border-ms-gray-border">
                  <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-ms-gray">
                    <div className="col-span-4">Function Name</div>
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2">Category</div>
                  </div>
                </div>
                <div className="divide-y divide-ms-gray-border">
                  {filteredFunctions.map((func) => (
                    <div key={func.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-12 gap-4 items-start">
                        <div className="col-span-4">
                          <Link href={`/function/${encodeURIComponent(func.name)}`} className="text-ms-blue hover:text-ms-blue-hover font-medium">
                            {func.name}
                          </Link>
                        </div>
                        <div className="col-span-6">
                          <p className="text-sm text-ms-gray-secondary leading-relaxed">
                            {func.description}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <Link 
                            href={`/category/${func.category}`}
                            className="text-xs text-ms-blue hover:text-ms-blue-hover bg-ms-blue-light px-2 py-1 rounded capitalize"
                          >
                            {func.category.replace('-', ' ')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
    </div>
  );
}
