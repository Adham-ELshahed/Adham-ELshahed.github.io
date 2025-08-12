import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
import FunctionCard from "@/components/function-card";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { type Function, type Category } from "@shared/schema";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

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
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-280 flex-1 min-h-screen">
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

            {/* Functions Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border border-ms-gray-border rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-16 bg-gray-100 rounded mb-3"></div>
                    <div className="h-4 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            ) : functions && functions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {functions.map((func) => (
                  <FunctionCard key={func.id} function={func} />
                ))}
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
      <Footer />
    </div>
  );
}
