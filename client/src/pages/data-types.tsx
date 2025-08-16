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
      description: "A Unicode character data string. Can be strings, numbers, or dates represented in a text format. Maximum string length is 268,435,456 Unicode characters (where each Unicode character is 2 bytes) or 536,870,912 bytes."
    },
    {
      name: "True/False",
      icon: "✓",
      description: "A Boolean value of either True or False."
    },
    {
      name: "Decimal number",
      icon: "1.2",
      description: "Represents a 64-bit (eight-byte) floating-point number. It's the most common number type, and corresponds to numbers as you usually think of them. Although designed to handle numbers with fractional values, it also handles whole numbers. The Decimal Number type can handle negative values from –1.79E +308 through –2.23E –308, 0, and positive values from 2.23E –308 through 1.79E + 308. For example, numbers like 34, 34.01, and 34.000367063 are valid decimal numbers. The largest precision that can be represented in a Decimal Number type is 15 digits long. The decimal separator can occur anywhere in the number. The Decimal Number type corresponds to how Excel stores its numbers."
    },
    {
      name: "Fixed decimal number",
      icon: "$",
      description: "Also known as the Currency type, this data type has a fixed location for the decimal separator. The decimal separator always has four digits to its right and allows for 19 digits of significance. The largest value it can represent is 922,337,203,685,477.5807 (positive or negative). Unlike Decimal Number, the Fixed Decimal Number type is always precise and is thus useful in cases where the imprecision of floating-point notation might introduce errors."
    },
    {
      name: "Whole number",
      icon: "123",
      description: "Represents a 64-bit (eight-byte) integer value. Because it's an integer, it has no digits to the right of the decimal place. It allows for 19 digits; positive or negative whole numbers between –9,223,372,036,854,775,807 (–2^63+1) and 9,223,372,036,854,775,806 (2^63–2). It can represent the largest possible precision of the various numeric data types. As with the Fixed Decimal Number type, the Whole Number type can be useful in cases where you need to control rounding."
    },
    {
      name: "Percentage",
      icon: "%",
      description: "Fundamentally the same as a Decimal Number type, but it has a mask to format the values in the column as a percentage in the Power Query Editor window."
    },
    {
      name: "Date/Time",
      icon: "📅",
      description: "Represents both a date and time value. Underneath the covers, the Date/Time value is stored as a Decimal Number type, so you can actually convert between the two. The time portion of a date is stored as a fraction to whole multiples of 1/300 seconds (3.33 ms). Dates between the years 1900 and 9999 are supported."
    },
    {
      name: "Date",
      icon: "📆",
      description: "Represents just a date (no time portion). When converted into the model, a Date is the same as a Date/Time value with zero for the fractional value."
    },
    {
      name: "Time",
      icon: "🕐",
      description: "Represents just time (no date portion). When converted into the model, a Time value is the same as a Date/Time value with no digits to the left of the decimal place."
    },
    {
      name: "Date/Time/Timezone",
      icon: "🌍",
      description: "Represents a UTC Date/Time with a time-zone offset. It's converted into Date/Time when loaded into the model."
    },
    {
      name: "Duration",
      icon: "⏱️",
      description: "Represents a length of time, which is converted into a Decimal Number type when loaded into the model. As a Decimal Number type, it can be added or subtracted from a Date/Time field with correct results. Because it's a Decimal Number type, you can easily use it in visualizations that show magnitude."
    },
    {
      name: "Binary",
      icon: "💾",
      description: "The Binary data type can be used to represent any other data with a binary format."
    },
    {
      name: "Any",
      icon: "❓",
      description: "The Any data type is the status given to a column that doesn't have an explicit data type definition. Any is the data type that classifies all values. We recommend that you always explicitly define the column data types for your queries from unstructured sources. Also, avoid having any columns with the Any data type as the output of your query."
    }
  ];

  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: "Data types in Power Query are used to classify values to have a more structured data set. Data types are defined at the field level—values inside a field are set to conform to the data type of the field."
    },
    {
      id: "detection",
      title: "Data Type Detection",
      content: "Data type detection occurs automatically when connecting to structured data sources such as databases, where Power Query reads the table schema from the data source. For unstructured sources such as Excel, CSV, and text files, Power Query automatically detects data types by inspecting the values in the table."
    },
    {
      id: "definition",
      title: "How to Define a Column Data Type",
      content: "You can define or change the data type of a column in four places: On the Home tab in the Transform group, on the Transform tab in the Any column group, by selecting the icon on the left side of the column heading, or on the column shortcut menu under Change Type."
    },
    {
      id: "locale",
      title: "Document or Project Locale",
      content: "Power Query handles localization (the language it should be displayed in) and globalization (the formatting of values and interpretation of text values). Locale is used to interpret text values and convert them into other data types."
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
                Data types in Power Query are used to classify values to have a more structured data set. 
                Data types are defined at the field level—values inside a field are set to conform to the data type of the field.
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
                  Data types in Power Query are used to classify values to have a more structured data set. 
                  Data types are defined at the field level—values inside a field are set to conform to the data type of the field.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The data type of a column is displayed on the left side of the column heading with an icon that symbolizes the data type.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-blue-800">
                    <strong>Note:</strong> Power Query provides a set of contextual transformations and options based on the data type of the column. 
                    For example, when you select a column with a data type of Date, you get transformations and options that apply to that 
                    specific data type. These transformations and options occur throughout the Power Query interface, such as on the 
                    Transform and Add column tabs and the smart filter options.
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
                  Data type detection occurs automatically when connecting to:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Structured Data Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Such as databases, Power Query reads the table schema from the data source and automatically 
                        displays the data by using the correct data type for each column.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Unstructured Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Such as Excel, CSV, and text files, Power Query automatically detects data types by inspecting 
                        the values in the table. By default, automatic data type detection is enabled in Power Query for unstructured sources.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  You can also use the <strong>Detect data type</strong> command in the <strong>Any column</strong> group on the 
                  <strong>Transform</strong> tab to automatically detect the data types of the columns in your table.
                </p>
              </div>
            </section>

            {/* How to Define Column Data Type */}
            <section id="definition" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Define a Column Data Type</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  You can define or change the data type of a column in any of four places:
                </p>
                <div className="grid gap-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Home Tab</h4>
                      <p className="text-gray-700">On the Home tab, in the Transform group, on the Data type drop-down menu.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transform Tab</h4>
                      <p className="text-gray-700">On the Transform tab, in the Any column group, on the Data type drop-down menu.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Column Header Icon</h4>
                      <p className="text-gray-700">By selecting the icon on the left side of the column heading.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">Right-Click Menu</h4>
                      <p className="text-gray-700">On the column shortcut menu, under Change Type.</p>
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
                  This setting is specifically for unstructured sources. It helps you by automatically inspecting and detecting 
                  column types and headers based on the first 200 rows of your table. When this setting is enabled, Power Query 
                  automatically adds two steps to your query:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li><strong>Promote column headers:</strong> Promotes the first row of the table to be the column header.</li>
                  <li><strong>Changed type:</strong> Converts the values from the Any data type to a data type based on the inspection of the values from each column.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  By default, this setting is enabled. You can configure this setting both in Power Query Online and Power Query Desktop 
                  through the Options menu under Data load settings.
                </p>
              </div>
            </section>

            {/* Document or Project Locale */}
            <section id="locale" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Document or Project Locale</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Power Query handles two distinct components that manage the way that things look and are interpreted:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Localization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        The component that tells Power Query in what language it should be displayed.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-ms-blue">Globalization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        The component that handles the formatting of the values, in addition to the interpretation of text values.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Locale</strong> is a single value that holds both the localization and globalization components. 
                  Locale is used to interpret text values and convert them into other data types. For example, the locale 
                  <strong> English (United States)</strong> means that the localization is in United States English and the 
                  globalization, or format of the value, is based on the standards used in the United States.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  When Power Query defines a column data type or converts from one data type to another, it has to interpret 
                  the values to be converted before it can transform them to a different data type.
                </p>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices</h2>
              <div className="grid gap-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-green-700 mb-2">✓ Always Define Explicit Data Types</h4>
                    <p className="text-gray-700">
                      We recommend that you always explicitly define the column data types for your queries from unstructured sources.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-yellow-700 mb-2">⚠ Avoid Any Data Type</h4>
                    <p className="text-gray-700">
                      Avoid having any columns with the Any data type as the output of your query, as this can lead to unexpected behavior.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Use Appropriate Precision</h4>
                    <p className="text-gray-700">
                      Choose Fixed Decimal Number or Whole Number types when you need to control rounding and avoid floating-point precision issues.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-purple-700 mb-2">🔧 Configure Detection Settings</h4>
                    <p className="text-gray-700">
                      Configure automatic data type detection settings according to your workflow needs, especially for unstructured data sources.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Reference Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li>
                      <a 
                        href="https://learn.microsoft.com/en-us/powerquery-m/type-conversion" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        Power Query M Types and Type Conversion →
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Complete reference for Power Query M data types and conversion functions</p>
                    </li>
                    <li>
                      <a 
                        href="https://learn.microsoft.com/en-us/powerquery-m/m-spec-types" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        Power Query M Formula Language Types →
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Complete specification of types in the Power Query M formula language</p>
                    </li>
                    <li>
                      <a 
                        href="https://learn.microsoft.com/en-us/power-query/data-types" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        Microsoft Learn: Data Types in Power Query →
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Official Microsoft documentation for Power Query data types</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}