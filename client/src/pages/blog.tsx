import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Twitter, Linkedin, Github, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  // Blog posts - empty for now
  const blogPosts: any[] = [];

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
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[280px] pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Blog Header */}
                <div className="text-center mb-12 pb-8 border-b border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="/attached_assets/image_1755023374453.png" 
                      alt="Ahmed Askar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Ahmed Askar's PQ Blog</h1>
                  <p className="text-gray-600 mb-4">Power Query, M Language, Data Transformation and more</p>
                  <div className="flex justify-center space-x-4">
                    <Link href="https://twitter.com/ahmedaskar" className="text-gray-400 hover:text-blue-500">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://linkedin.com/in/ahmedaskar" className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://github.com/ahmedaskar" className="text-gray-400 hover:text-gray-900">
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

                  {/* Categories */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/blog/category/${category.toLowerCase()}`}
                          className="block text-gray-700 hover:text-blue-600 text-sm py-1"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}