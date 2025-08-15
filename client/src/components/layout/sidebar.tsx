import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { type Function, type Category } from "@shared/schema";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"az" | "groups" | "search">("az");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const { data: functions } = useQuery<Function[]>({
    queryKey: ["/api/functions"],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Sort functions alphabetically for A-Z tab
  const sortedFunctions = functions?.slice().sort((a, b) => a.name.localeCompare(b.name)) || [];

  // Filter functions for search tab (only by function name)
  const searchResults = searchQuery.length > 0 
    ? functions?.filter((func) =>
        func.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 20) || []
    : [];

  // Group functions by category for Groups tab
  const groupedFunctions = categories?.map(category => ({
    ...category,
    functions: functions?.filter(func => func.category === category.name).sort((a, b) => a.name.localeCompare(b.name)) || []
  })) || [];

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_]/g, ' ');
  };

  // Close mobile sidebar when clicking on a link
  useEffect(() => {
    if (isOpen && onClose) {
      const links = document.querySelectorAll('aside a');
      const handleClick = () => onClose();
      links.forEach(link => link.addEventListener('click', handleClick));
      return () => links.forEach(link => link.removeEventListener('click', handleClick));
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 w-280 h-screen bg-ms-gray-light border-r border-ms-gray-border 
        overflow-y-auto sidebar-scroll z-50 pt-16 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="p-4">
        {/* Tab Navigation */}
        <div className="mb-4">
          <div className="flex border-b border-ms-gray-border">
            <Button
              variant={activeTab === "az" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("az")}
              className="flex-1 rounded-none rounded-t text-xs"
            >
              A-Z
            </Button>
            <Button
              variant={activeTab === "groups" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("groups")}
              className="flex-1 rounded-none rounded-t text-xs"
            >
              Groups
            </Button>
            <Button
              variant={activeTab === "search" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("search")}
              className="flex-1 rounded-none rounded-t text-xs"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-1">
          {/* A-Z Tab */}
          {activeTab === "az" && (
            <div>
              <div className="mb-3">
                <span className="text-xs font-semibold text-ms-gray-secondary uppercase tracking-wide">
                  All Functions ({sortedFunctions.length})
                </span>
              </div>
              <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                {sortedFunctions.map((func) => (
                  <Link
                    key={func.id}
                    href={`/function/${encodeURIComponent(func.name)}`}
                    className="block px-2 py-1 text-sm text-ms-gray hover:text-ms-blue hover:bg-white rounded transition-colors"
                  >
                    {func.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === "groups" && (
            <div>
              <div className="mb-3">
                <span className="text-xs font-semibold text-ms-gray-secondary uppercase tracking-wide">
                  Browse by Category
                </span>
              </div>
              <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                <Collapsible
                  open={expandedGroups.has("functions")}
                  onOpenChange={() => toggleGroup("functions")}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-sm text-ms-gray hover:text-ms-blue hover:bg-white rounded transition-colors">
                    <span className="flex items-center gap-2">
                      {expandedGroups.has("functions") ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                      Functions
                    </span>
                    <span className="text-xs text-ms-gray-secondary">
                      {categories?.length || 0}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-5 mt-1 space-y-1">
                    {groupedFunctions.map((group) => (
                      <Collapsible
                        key={group.id}
                        open={expandedGroups.has(group.name)}
                        onOpenChange={() => toggleGroup(group.name)}
                      >
                        <div className="flex items-center">
                          <CollapsibleTrigger className="flex items-center gap-1 px-2 py-1 text-sm text-ms-gray hover:text-ms-blue hover:bg-white rounded transition-colors">
                            {expandedGroups.has(group.name) ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </CollapsibleTrigger>
                          <Link
                            href={`/category/${group.name}`}
                            className="flex-1 flex items-center justify-between px-2 py-1 text-sm text-ms-gray hover:text-ms-blue hover:bg-white rounded transition-colors"
                          >
                            <span>{formatCategoryName(group.name)}</span>
                            <span className="text-xs text-ms-gray-secondary">
                              {group.functions.length}
                            </span>
                          </Link>
                        </div>
                        <CollapsibleContent className="ml-5 mt-1 space-y-1">
                          {group.functions.map((func) => (
                            <Link
                              key={func.id}
                              href={`/function/${encodeURIComponent(func.name)}`}
                              className="block px-2 py-1 text-xs text-ms-gray hover:text-ms-blue hover:bg-white rounded transition-colors"
                            >
                              {func.name}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          )}

          {/* Search Tab */}
          {activeTab === "search" && (
            <div>
              <div className="mb-3">
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
              <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto">
                {searchQuery.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-ms-gray-secondary text-center">
                    Start typing to search functions
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className="mb-2 px-2">
                      <span className="text-xs font-semibold text-ms-gray-secondary uppercase tracking-wide">
                        Search Results ({searchResults.length})
                      </span>
                    </div>
                    {searchResults.map((func) => (
                      <Link
                        key={func.id}
                        href={`/function/${encodeURIComponent(func.name)}`}
                        className="block px-2 py-1 text-sm text-ms-gray hover:text-ms-blue hover:bg-white rounded transition-colors"
                      >
                        <div className="font-medium">{func.name}</div>
                        <div className="text-xs text-ms-gray-secondary truncate">
                          {func.description.substring(0, 60)}...
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="px-2 py-4 text-sm text-ms-gray-secondary text-center">
                    No functions found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
