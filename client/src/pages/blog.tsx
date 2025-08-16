import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Twitter, Linkedin, Github, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Blog posts - example with real content
  const blogPosts = [
    {
      id: "power-bi-copilot-ai-instructions-and-dax-measure-definitions",
      title: "Power BI Copilot, AI Instructions And DAX Measure Definitions",
      content: `Continuing my (already very long) series on what information you should be adding to the AI Instructions of your semantic model and why, in this post I'll show you the benefits of adding the DAX definitions of your measures.

A really common question from end users viewing a Power BI report is "how is this measure calculated?". As a result I have seen model developers use techniques like this to display either a text description of how the measure works in a report or the actual DAX definition. It is therefore not a surprise that if end users are using Copilot they will ask the same question. Unfortunately Copilot cannot – or rather should not, at the time of writing – be able to to see the definitions of the measures in your model.

**Adding Measure Definitions to AI Instructions**

Adding all the measure definitions to the model's AI Instructions mostly solves this problem. TMDL View makes it easy to get all the measure definitions in a semantic model in Power BI Desktop and you can copy/paste them from there into the AI Instructions.

Here are some example AI Instructions:

\`\`\`
##Definitions and descriptions of the measures in this model
If a user asks how a measure is defined, asks how a measure works or asks how a measure is calculated, ignore any previous instructions about displaying measure definitions from the model and show the definition given here.

All measures that return currency values do so in Pounds Sterling and should be formatted with a £ sign.

##Average Price Paid
AVERAGE('Transactions'[Price])

##Count Of Transactions
COUNTROWS('Transactions')

##Tax Paid
Different tax rates are levied on new build and non-new build properties
A 10% tax is levied on the sale of new build properties
A 5% tax is levied on the sale of properties that are not new builds
(CALCULATE(SUM('Transactions'[Price]), KEEPFILTERS('Transactions'[New]="Y")) * 0.1)
+
(CALCULATE(SUM('Transactions'[Price]), KEEPFILTERS('Transactions'[New]="N")) * 0.05)
\`\`\`

**Benefits of This Approach**

With these AI Instructions in place, Copilot can now provide helpful summaries of how measures work and even answer complex questions about modifying tax rates or other parameters.

Even more impressively, since Copilot knows the definition of the measure, it is able to answer more complex questions and generate modified DAX queries based on hypothetical scenarios.`,
      date: "2025-01-15",
      readTime: "5 min read",
      category: "Power BI",
      author: "Ahmad Askar",
      featured: true
    }
  ];

  const categories = ["All", "Power Query", "Power BI", "DAX", "M Language", "Analysis Services"];
  const topPosts = blogPosts.slice(0, 3);

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );



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
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Blog Header */}
                <div className="text-center mb-12 pb-8 border-b border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AA</span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-1">Power Query Blog</h1>
                  <p className="text-lg text-gray-600 mb-4">by Ahmad Askar</p>
                  <p className="text-gray-600 mb-4">Power Query, M Language, Data Transformation and more</p>
                  <div className="flex justify-center space-x-4">
                    <Link href="https://twitter.com/ahmadaskar" className="text-gray-400 hover:text-blue-500">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://linkedin.com/in/ahmadaskar" className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://github.com/ahmadaskar" className="text-gray-400 hover:text-gray-900">
                      <Github className="h-5 w-5" />
                    </Link>
                  </div>
                </div>



                {/* Blog Posts */}
                <div className="space-y-0">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <div key={post.id}>
                        <article className="py-8">
                          {post.featured && (
                            <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">
                              Featured
                            </Badge>
                          )}
                          
                          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                            <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                              {post.title}
                            </Link>
                          </h2>
                          
                          <div className="prose prose-gray max-w-none">
                            {post.content.split('\n\n').map((paragraph, pIndex) => {
                              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return (
                                  <h3 key={pIndex} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                                    {paragraph.slice(2, -2)}
                                  </h3>
                                );
                              }
                              if (paragraph.startsWith('```')) {
                                return (
                                  <pre key={pIndex} className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto mt-4 mb-4">
                                    <code>{paragraph.slice(3, -3)}</code>
                                  </pre>
                                );
                              }
                              if (paragraph.includes('1.') || paragraph.includes('2.') || paragraph.includes('3.')) {
                                return (
                                  <div key={pIndex} className="my-4">
                                    {paragraph.split('\n').map((line, lIndex) => (
                                      <p key={lIndex} className="mb-2 text-gray-700 leading-relaxed">
                                        {line}
                                      </p>
                                    ))}
                                  </div>
                                );
                              }
                              return (
                                <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed">
                                  {paragraph}
                                </p>
                              );
                            })}
                          </div>
                          
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-6 pt-4 border-t border-gray-100">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readTime}
                            </div>
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-1" />
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            </div>
                            <span>by {post.author}</span>
                          </div>
                        </article>
                        
                        {/* Thin line separator between posts */}
                        {index < filteredPosts.length - 1 && (
                          <div className="border-t border-gray-200"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">No Blog Posts Yet</h2>
                      <p className="text-gray-600">
                        Blog posts will appear here when they are added to the site.
                      </p>
                    </div>
                  )}
                </div>


              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  {/* Search and Language Controls */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search posts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Top Posts */}
                  {topPosts.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Posts</h3>
                      <div className="space-y-4">
                        {topPosts.map((post) => (
                          <div key={post.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                            <h4 className="font-medium text-gray-900 text-sm leading-tight mb-2">
                              <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                                {post.title}
                              </Link>
                            </h4>
                            <div className="text-xs text-gray-600">
                              {new Date(post.date).toLocaleDateString()} • {post.readTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}




                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}