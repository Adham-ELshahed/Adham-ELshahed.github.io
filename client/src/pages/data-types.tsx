import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DataTypes() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dataTypes = [
    {
      name: "Text",
      icon: "📝",
      description: "Stores character sequences using Unicode encoding. This includes alphanumeric characters, symbols, and dates formatted as text. Can hold up to 268,435,456 Unicode characters, with each character occupying 2 bytes, totaling 536,870,912 bytes maximum capacity."
    },
    {
      name: "True/False",
      icon: "✓",
      description: "Binary logical data type that stores boolean values - either True or False."
    },
    {
      name: "Decimal number",
      icon: "1.2",
      description: "An 8-byte floating-point numeric format that serves as the primary number type for most calculations. Handles both fractional and whole numbers effectively. Value range spans from –1.79E +308 to –2.23E –308 for negatives, includes zero, and 2.23E –308 to 1.79E + 308 for positives. Examples include 34, 34.01, and 34.000367063. Maximum precision extends to 15 digits, with flexible decimal point placement. Functions similarly to Excel's numeric storage system."
    },
    {
      name: "Fixed decimal number",
      icon: "$",
      description: "Currency-oriented data type with a predetermined decimal point position. Maintains exactly four decimal places and supports up to 19 significant digits. Maximum representable value reaches 922,337,203,685,477.5807 in either direction. Provides exact precision unlike floating-point numbers, making it ideal for financial calculations where accuracy is critical."
    },
    {
      name: "Whole number",
      icon: "123",
      description: "An 8-byte integer format that exclusively stores whole numbers without decimal components. Accommodates up to 19 digits within the range of –9,223,372,036,854,775,807 (–2^63+1) to 9,223,372,036,854,775,806 (2^63–2). Offers maximum precision among numeric types and provides exact control over rounding behavior."
    },
    {
      name: "Percentage",
      icon: "%",
      description: "Essentially identical to Decimal Number in storage but applies percentage formatting for display purposes within the Power Query Editor interface."
    },
    {
      name: "Date/Time",
      icon: "📅",
      description: "Combined date and time storage using decimal number foundation for internal representation. Time components use fractional values based on 1/300 second intervals (3.33 millisecond precision). Supports dates within the 1900-9999 year range and allows conversion to decimal format."
    },
    {
      name: "Date",
      icon: "📆",
      description: "Date-only storage without time information. Internally equivalent to Date/Time format with zero fractional component when processed by the data model."
    },
    {
      name: "Time",
      icon: "🕐",
      description: "Time-only storage without date information. Internally matches Date/Time format with zero integer component when processed by the data model."
    },
    {
      name: "Date/Time/Timezone",
      icon: "🌍",
      description: "UTC-based date and time storage that includes timezone offset information. Automatically converts to standard Date/Time format during model loading."
    },
    {
      name: "Duration",
      icon: "⏱️",
      description: "Time span representation that converts to decimal format in the data model. Supports arithmetic operations with Date/Time fields for accurate calculations. Works effectively in visualizations due to its decimal number foundation."
    },
    {
      name: "Binary",
      icon: "💾",
      description: "Universal data type for storing information in binary format, accommodating various file types and encoded data structures."
    },
    {
      name: "Any",
      icon: "❓",
      description: "Default classification for columns lacking specific data type assignments. Serves as a universal container for all value types. Best practice recommends explicit type definition for unstructured data sources and avoiding Any type in final query outputs."
    }
  ];

  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: "Power Query employs data types to organize and structure information within datasets. These classifications are applied at the column level, ensuring all values within a field adhere to the specified type requirements."
    },
    {
      id: "detection",
      title: "Data Type Detection",
      content: "Automatic type identification happens when connecting to structured databases through schema reading, while unstructured sources like Excel files, CSV documents, and text files undergo value inspection for type determination."
    },
    {
      id: "definition",
      title: "How to Define a Column Data Type",
      content: "Column data types can be modified through multiple interface locations: Home tab's Transform section, Transform tab's Any column area, column header icon selection, or right-click context menu's Change Type option."
    },
    {
      id: "locale",
      title: "Document or Project Locale",
      content: "Power Query manages both display language (localization) and value formatting standards (globalization). Locale settings determine how text values are interpreted and converted between different data types."
    }
  ];

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
        <main className="ml-0 lg:ml-280 flex-1 min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Types in Power Query</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Power Query employs data types to organize and structure information within datasets. 
                These classifications are applied at the column level, ensuring all values within a field adhere to the specified type requirements.
              </p>
            </div>

            {/* Table of Contents */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-ms-blue mb-2">Sections</h3>
                    <ul className="space-y-2">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a 
                            href={`#${section.id}`} 
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ms-blue mb-2">Quick Access</h3>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="#data-types-table" 
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Complete Data Types Reference
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#best-practices" 
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Best Practices
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overview Section */}
            <section id="overview" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Power Query employs data types to organize and structure information within datasets. 
                  These classifications are applied at the column level, ensuring all values within a field adhere to the specified type requirements.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Column data types are visually indicated through icons positioned at the left side of each column header, providing immediate type identification.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-blue-800">
                    <strong>Important:</strong> Power Query delivers type-specific transformation tools and options that adapt to each column's data type. 
                    When working with Date columns, for instance, you'll access date-specific operations and filters. 
                    These contextual features appear across the interface, including Transform tabs, Add column sections, and filtering mechanisms.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Types Reference Table */}
            <section id="data-types-table" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Data Types Reference</h2>
              <div className="grid gap-6">
                {dataTypes.map((dataType, index) => (
                  <Card key={index} className="border-l-4 border-l-ms-blue">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{dataType.icon}</span>
                        <CardTitle className="text-xl text-ms-blue">{dataType.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{dataType.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="my-12" />

            {/* Data Type Detection */}
            <section id="detection" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Type Detection</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Automatic type identification operates differently based on your data source:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Structured Data Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Including databases and similar sources where Power Query extracts schema information directly, 
                        automatically applying appropriate types to each column based on the source definition.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Unstructured Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Including Excel workbooks, CSV files, and text documents where Power Query analyzes 
                        content patterns to determine appropriate types. This automatic detection is enabled by default for such sources.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Manual type detection is available through the <strong>Detect data type</strong> feature located in the 
                  <strong>Any column</strong> section of the <strong>Transform</strong> ribbon for on-demand type assignment.
                </p>
              </div>
            </section>

            {/* How to Define Column Data Type */}
            <section id="definition" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Define a Column Data Type</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Column data types can be modified through multiple interface locations:
                </p>
                <div className="grid gap-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Home Tab</h4>
                      <p className="text-gray-700">Access the Data type dropdown within the Transform section of the Home ribbon.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transform Tab</h4>
                      <p className="text-gray-700">Use the Data type dropdown located in the Any column section of the Transform ribbon.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Column Header Icon</h4>
                      <p className="text-gray-700">Click directly on the type icon positioned at the left side of any column header.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Context Menu</h4>
                      <p className="text-gray-700">Right-click on any column and select Change Type from the context menu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Automatic Detection Settings */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automatic Detection of Column Data Type and Headers</h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  This feature targets unstructured data sources by analyzing the initial 200 rows to identify 
                  appropriate column types and header structures. When activated, Power Query automatically implements 
                  two transformation steps in your query:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li><strong>Header promotion:</strong> Elevates the first data row to serve as column headers.</li>
                  <li><strong>Type conversion:</strong> Transforms values from generic Any type to specific types based on content analysis.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This functionality is active by default and can be customized in both Power Query Online and Desktop versions 
                  through the Options interface within Data load configuration.
                </p>
              </div>
            </section>

            {/* Document or Project Locale */}
            <section id="locale" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Document or Project Locale</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Power Query manages two essential aspects that control presentation and data interpretation:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Localization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Determines the display language and interface elements used throughout Power Query.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Globalization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Controls value formatting standards and governs how textual information is interpreted and processed.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Locale</strong> combines both elements into a unified setting that guides text interpretation and type conversion. 
                  For instance, <strong>English (United States)</strong> locale establishes US English for interface display and applies 
                  American formatting conventions for value processing.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  During type definition or conversion operations, Power Query relies on locale settings to properly 
                  interpret source values before applying transformations to target data types.
                </p>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices</h2>
              <div className="grid gap-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-green-700 mb-2">✓ Establish Clear Type Definitions</h4>
                    <p className="text-gray-700">
                      Always specify explicit data types for columns when working with unstructured data sources to ensure consistent data processing.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-yellow-700 mb-2">⚠ Eliminate Generic Types</h4>
                    <p className="text-gray-700">
                      Prevent using Any data type in final query outputs, as undefined types can cause unpredictable results and processing errors.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Select Precision-Appropriate Types</h4>
                    <p className="text-gray-700">
                      Utilize Fixed Decimal Number or Whole Number formats when exact calculations are required and floating-point approximations must be avoided.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-purple-700 mb-2">🔧 Optimize Detection Configuration</h4>
                    <p className="text-gray-700">
                      Adjust automatic type detection settings to match your specific workflow requirements, particularly when processing diverse unstructured data.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>


          </div>
        </main>
      </div>
    </div>
  );
}