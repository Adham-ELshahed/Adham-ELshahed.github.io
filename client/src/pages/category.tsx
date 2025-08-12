import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "wouter";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { type Function, type Category } from "@shared/schema";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: categoryData } = useQuery<Category>({
    queryKey: ["/api/categories", category],
  });

  const { data: functions, isLoading } = useQuery<Function[]>({
    queryKey: ["/api/functions/category", category],
  });

  const categoryDisplayName = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' and ') + ' functions'
    : 'Category';

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
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link href="/" className="text-ms-blue hover:text-ms-blue-hover text-sm flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-ms-gray mb-4">{categoryDisplayName}</h1>
              {categoryData && (
                <p className="text-lg text-ms-gray-secondary leading-relaxed">
                  {categoryData.description}
                </p>
              )}
            </div>

            {/* Functions Count */}
            <div className="mb-6">
              <p className="text-sm text-ms-gray-secondary">
                {isLoading ? "Loading..." : `${functions?.length || 0} functions in this category`}
              </p>
            </div>

            {/* Functions Table */}
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
                ))}
              </div>
            ) : functions && functions.length > 0 ? (
              <div className="border border-ms-gray-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-ms-gray">Function Name</TableHead>
                      <TableHead className="font-semibold text-ms-gray">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {functions.map((func) => (
                      <TableRow key={func.id} className="hover:bg-ms-gray-light">
                        <TableCell className="font-mono font-medium">
                          <Link
                            href={`/functions/${func.name}`}
                            className="text-ms-blue hover:text-ms-blue-hover hover:underline"
                          >
                            {func.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-ms-gray-secondary">
                          {func.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-ms-gray-secondary mb-4">No functions found in this category</p>
                <p className="text-sm text-ms-gray-secondary">
                  This category may not exist or may not contain any functions yet.
                </p>
                <Link href="/" className="text-ms-blue hover:text-ms-blue-hover mt-4 inline-block">
                  Browse all categories
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
