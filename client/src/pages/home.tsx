import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { type Category } from "@shared/schema";

export default function Home() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-280 flex-1 min-h-screen">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-ms-gray mb-4">The Power Query language</h1>
              <p className="text-lg text-ms-gray-secondary leading-relaxed max-w-4xl">
                The Power Query language (also known as M) was created specifically for data transformation and preparation tasks, through the use of formulas and expressions. Power Query is used in several Microsoft Products such as Microsoft Power BI, Microsoft Excel, and Microsoft Dataflows. These products all share the same underlying data transformation engine.
              </p>
            </div>

            {/* Functions Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-ms-gray">Functions</h2>
                <Link href="/functions" className="text-ms-blue hover:text-ms-blue-hover font-medium">
                  View all functions →
                </Link>
              </div>
              
              <p className="text-ms-gray-secondary mb-8">
                Browse Power Query functions alphabetically from the sidebar or choose a category below:
              </p>

              {/* Function Categories Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="p-6 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-16 bg-gray-100 rounded"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {categories?.map((category) => (
                    <div
                      key={category.id}
                      className="function-category border border-ms-gray-border rounded-lg p-6 transition-all duration-200 hover:shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-ms-blue mb-3">
                        <Link 
                          href={`/functions/${category.name}`} 
                          className="hover:text-ms-blue-hover"
                        >
                          {category.name.charAt(0).toUpperCase() + category.name.slice(1).replace('-', ' and ')} functions
                        </Link>
                      </h3>
                      <p className="text-sm text-ms-gray-secondary leading-relaxed">
                        {category.description}
                      </p>
                      <div className="mt-3 text-xs text-ms-gray-secondary">
                        {category.functionCount} functions
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Statements, Operators and Data Types */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Statements, Operators and Data types</h2>
              <p className="text-ms-gray-secondary mb-6">
                As well as for functions, Power Query Guide provides a reference for other entities such as:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-ms-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-ms-blue mb-2">
                    <Link href="/operators" className="hover:text-ms-blue-hover">Operators</Link>
                  </h3>
                  <p className="text-sm text-ms-gray-secondary">Mathematical, comparison, and logical operators used in Power Query expressions.</p>
                </div>
                
                <div className="border border-ms-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-ms-blue mb-2">
                    <Link href="/statements" className="hover:text-ms-blue-hover">Statements</Link>
                  </h3>
                  <p className="text-sm text-ms-gray-secondary">Control flow statements and declarations used in Power Query M language.</p>
                </div>
                
                <div className="border border-ms-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-ms-blue mb-2">
                    <Link href="/datatypes" className="hover:text-ms-blue-hover">Data Types</Link>
                  </h3>
                  <p className="text-sm text-ms-gray-secondary">Built-in data types available in Power Query M language.</p>
                </div>
              </div>
            </section>

            {/* Updates Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Updates</h2>
              <p className="text-ms-gray-secondary mb-6">Latest Power Query functions released:</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-4 p-4 bg-ms-gray-light rounded-lg">
                  <span className="text-sm text-ms-gray-secondary font-mono">2024-11-15:</span>
                  <Link href="/functions/access-data/web-browserbytag" className="text-ms-blue hover:text-ms-blue-hover font-medium">
                    Web.BrowserByTag
                  </Link>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-ms-gray-light rounded-lg">
                  <span className="text-sm text-ms-gray-secondary font-mono">2024-09-10:</span>
                  <Link href="/functions/access-data/azurestorage-datalakecontents" className="text-ms-blue hover:text-ms-blue-hover font-medium">
                    AzureStorage.DataLakeContents
                  </Link>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-ms-gray-light rounded-lg">
                  <span className="text-sm text-ms-gray-secondary font-mono">2024-08-23:</span>
                  <Link href="/functions/table/table-combinecolumns" className="text-ms-blue hover:text-ms-blue-hover font-medium">
                    Table.CombineColumns
                  </Link>
                </div>
              </div>
              
              <Link href="/changelog" className="text-ms-blue hover:text-ms-blue-hover font-medium">
                » See all the latest updates
              </Link>
            </section>

            {/* About Section */}
            <section className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-ms-gray mb-6">About this Reference</h2>
                  <p className="text-ms-gray-secondary leading-relaxed mb-4">
                    The curated content of Power Query Guide makes it a go-to reference on the Power Query M language.
                  </p>
                  <p className="text-ms-gray-secondary leading-relaxed mb-4">
                    Power Query Guide is updated automatically, through the monitoring of new versions of Microsoft products. For every Power Query function, Power Query Guide offers a compatibility matrix for versions/products supported. Every function/argument is marked with attributes highlighting its behavior and usage patterns.
                  </p>
                  <p className="text-ms-gray-secondary leading-relaxed">
                    Power Query Guide integrates and expands on the Microsoft documentation.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-ms-gray mb-6">About the Authors</h2>
                  <p className="text-ms-gray-secondary leading-relaxed mb-4">
                    The content of Power Query Guide is curated by a small number of authors referenced on each page.
                  </p>
                  <p className="text-ms-gray-secondary leading-relaxed mb-4">
                    Contributions and suggestions are welcome.
                  </p>
                  <p className="text-ms-gray-secondary leading-relaxed">
                    Power Query Guide is inspired by the excellent work done by{" "}
                    <a href="https://www.sqlbi.com" className="text-ms-blue hover:text-ms-blue-hover">
                      SQLBI
                    </a>{" "}
                    on DAX Guide.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
