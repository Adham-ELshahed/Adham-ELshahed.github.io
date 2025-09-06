import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import aboutPageImage from "@assets/AboutPagePic_1757154397694.jpg";

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="flex">
        <Sidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="flex-1 ml-0 lg:ml-[280px] pt-16 px-4 lg:px-0">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">About Power Query Guide</h1>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Power Query Guide is a comprehensive reference platform for Power Query functions, 
                  providing detailed documentation and examples for data professionals working with Microsoft's Power Query technology.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We aim to make Power Query more accessible by providing clear, comprehensive documentation 
                for all 651 Power Query functions across 24 categories. Whether you're a beginner learning 
                data transformation or an expert looking for specific function details, this guide serves 
                as your go-to resource.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What You'll Find</h2>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Complete reference for all Power Query functions</li>
                <li>Detailed syntax and parameter information</li>
                <li>Practical examples and use cases</li>
                <li>Organized by functional categories</li>
                <li>Advanced search and filtering capabilities</li>
                <li>Mobile-friendly design for on-the-go reference</li>
              </ul>

              {/* About Page Image */}
              <div className="mb-8 flex justify-center">
                <img 
                  src={aboutPageImage} 
                  alt="Power Query and M Language Extract, Transform, Load (ETL) process diagram"
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Function Categories</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our functions are organized into 24 main categories to help you find what you need quickly:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">Text Functions</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">Number Functions</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">Date & Time</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">List Functions</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">Table Functions</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">Record Functions</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Getting Started</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Use the sidebar navigation to explore functions by category, search for specific functions, 
                or browse alphabetically. Each function page includes detailed syntax, parameters, examples, 
                and return type information to help you implement solutions effectively.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Attribution</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                This reference is based on comprehensive Power Query documentation and is maintained 
                to provide the most accurate and up-to-date information for the Power Query community.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-700">
                  If you can't find what you're looking for, try using the search function or 
                  browse by category. Each function includes detailed examples to help you understand 
                  how to use it in your data transformation workflows.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}