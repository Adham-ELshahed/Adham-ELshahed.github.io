import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { type Category } from "@shared/schema";
import homePageImage from "@assets/HomePagePic_1757154303902.jpg";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/categories.json"],
  });

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
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-ms-gray mb-4">What Is Power Query</h1>
              <p className="text-lg text-ms-gray-secondary leading-relaxed max-w-4xl mb-6">
                Power Query is a data transformation and connectivity tool developed by Microsoft. It is designed to help connect to, combine, and transform data from various sources, making it easier to analyze and visualize data in applications such as Microsoft Excel and Power BI.
              </p>
              <p className="text-lg text-ms-gray-secondary leading-relaxed max-w-4xl">
                With Power Query, you can:
              </p>
              <ul className="list-disc ml-6 mt-4 text-ms-gray-secondary space-y-2">
                <li>Connect to a wide range of data sources, including databases, cloud services, files, and web pages.</li>
                <li>Transform data by cleaning, reshaping, and enhancing it through a user-friendly interface without the need for complex programming.</li>
                <li>Automate data preparation tasks by saving queries, enabling consistent and repeatable workflows.</li>
              </ul>
              <p className="text-lg text-ms-gray-secondary leading-relaxed max-w-4xl mt-6">
                Power Query is especially valuable for business analysts, data professionals, and anyone who needs to handle large amounts of data efficiently. Its intuitive interface, combined with powerful capabilities, simplifies the process of preparing data for meaningful analysis.
              </p>
            </div>

            {/* Home Page Image */}
            <div className="mb-12 flex justify-center">
              <img 
                src={homePageImage} 
                alt="Power Query M Language workflow diagram showing data transformation process"
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
            </div>

            {/* Expressions, values, and let expression */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Expressions, values, and let expression</h2>
              <p className="text-ms-gray-secondary leading-relaxed mb-6">
                A Power Query M formula language query is composed of formula expression steps that create a mashup query. A formula expression can be evaluated (computed), yielding a value. The let expression encapsulates a set of values to be computed, assigned names, and then used in a subsequent expression that follows the in statement. For example, a let expression could contain a Source variable that equals the value of Text.Proper and yields a text value in proper case.
              </p>
            </section>

            {/* Comments */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Comments</h2>
              <p className="text-ms-gray-secondary leading-relaxed mb-6">
                You can add comments to your code with single-line comments // or multi-line comments that begin with /* and end with */.
              </p>
            </section>

            {/* Evaluation Model */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Evaluation Model</h2>
              <p className="text-ms-gray-secondary leading-relaxed mb-6">
                The evaluation model of the Power Query M formula language is modeled after the evaluation model commonly found in spreadsheets, where the order of calculations can be determined based on dependencies between the formulas in the cells.
              </p>
            </section>

            {/* Operators */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Operators</h2>
              <p className="text-ms-gray-secondary leading-relaxed mb-6">
                The Power Query M formula language includes a set of operators that can be used in an expression. Operators are applied to operands to form symbolic expressions. For example, in the expression 1 + 2 the numbers 1 and 2 are operands and the operator is the addition operator (+).
              </p>
            </section>

            {/* Types and type conversion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Types and type conversion</h2>
              <p className="text-ms-gray-secondary leading-relaxed mb-6">
                Power Query M uses types to classify values to have a more structured data set. This article describes the most commonly-used M types and how to convert one type to another type.
              </p>
            </section>

            {/* Groups Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-ms-gray">Groups</h2>
                <Link href="/functions" className="text-ms-blue hover:text-ms-blue-hover font-medium">
                  View all groups →
                </Link>
              </div>
              
              <p className="text-ms-gray-secondary mb-8">
                The Power Query M function reference includes articles for each of the over 700 functions. Browse Power Query functions alphabetically from the sidebar or choose a category below:
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
                          href={`/category/${category.name}`} 
                          className="hover:text-ms-blue-hover"
                        >
                          {category.name.charAt(0).toUpperCase() + category.name.slice(1).replace(/[-_]/g, ' ')} groups
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

            {/* Additional M Language Features */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">Additional M Language Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-ms-blue mb-3">Metadata</h3>
                  <p className="text-sm text-ms-gray-secondary leading-relaxed mb-6">
                    Metadata is information about a value that is associated with a value. Metadata is represented as a record value, called a metadata record. The fields of a metadata record can be used to store the metadata for a value.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-ms-blue mb-3">Errors</h3>
                  <p className="text-sm text-ms-gray-secondary leading-relaxed mb-6">
                    An error in Power Query M formula language is an indication that the process of evaluating an expression could not produce a value. Errors are raised by operators and functions encountering error conditions or by using the error expression.
                  </p>

                  <h3 className="text-lg font-semibold text-ms-blue mb-3">Text Formatting</h3>
                  <p className="text-sm text-ms-gray-secondary leading-relaxed">
                    In Power Query, text formatting refers to various transformations and operations that can be applied to text data to modify its appearance or structure.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-ms-blue mb-3">Enumerations</h3>
                  <p className="text-sm text-ms-gray-secondary leading-relaxed mb-6">
                    The M language provides a range of enumerations. These simplify the process of selecting options within a function. For example, you have the option to provide the Date.StartOfWeek function with the first day of the week by writing Day.Monday.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-ms-blue mb-3">Constants</h3>
                  <p className="text-sm text-ms-gray-secondary leading-relaxed mb-6">
                    Constant values are values that do not change. The M language supports several and they provide an easy way to input values that are immutable.
                  </p>

                  <h3 className="text-lg font-semibold text-ms-blue mb-3">Dynamic Values</h3>
                  <p className="text-sm text-ms-gray-secondary leading-relaxed">
                    A dynamic value is a value that takes into account your personal settings, resulting in potentially different values for each user. The M Language offers a limited selection of dynamic values to cater to varying user environments.
                  </p>
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

            {/* About This Reference */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ms-gray mb-6">About This Reference</h2>
              <p className="text-ms-gray-secondary leading-relaxed mb-4">
                This Power Query reference contains information on the M language. The Guide is updated regularly to reflect the latest changes in Microsoft products. Each M function is presented with a syntax, supporting articles and often with examples.
              </p>
              <p className="text-ms-gray-secondary leading-relaxed mb-4">
                While this Power Query Guide is a BI Gorilla project created and maintained by Rick de Groot, it also incorporates official Microsoft documentation to provide you with the most accurate and up-to-date information. It also took inspiration from the dax.guide website that does something similar for the DAX language.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
