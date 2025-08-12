import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Twitter, Linkedin, Github, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  // Full blog posts content
  const blogPosts = [
    {
      id: 1,
      title: "Power Query Copilot, AI Instructions And Function Definitions",
      content: `Continuing my (already very long) series on what information you should be adding to the AI Instructions of your semantic model and why, in this post I'll show you the benefits of adding the function definitions of your measures.

When you're working with Power Query in Power BI or Excel, one of the most powerful features available is the integration with AI Copilot. However, to get the most out of this integration, you need to provide clear and comprehensive instructions about your data model and business logic.

The key to effective AI Instructions lies in understanding that Copilot needs context to provide meaningful suggestions. By including function definitions in your AI Instructions, you're essentially teaching Copilot about your specific business rules and calculations.

Here's what you should include in your AI Instructions:
1. Clear descriptions of what each measure calculates
2. The business context behind complex calculations
3. Any assumptions or limitations in your data
4. Relationships between different measures

For example, when defining a measure that calculates year-over-year growth, don't just include the DAX formula - explain what constitutes a "year" in your business context, whether you're using calendar years or fiscal years, and how you handle partial periods.

This approach not only helps Copilot provide better suggestions but also serves as documentation for other developers who might work with your model in the future.`,
      date: "2024-12-14",
      readTime: "5 min read",
      category: "Power Query",
      author: "Chris Webb",
      featured: true
    },
    {
      id: 2,
      title: "Understanding The 'The key didn't match any rows in the table' Error In Power Query",
      content: `One of the most common errors that Power Query users encounter is "The key didn't match any rows in the table." This error typically occurs during merge operations and can be frustrating to debug, especially for new users.

This error happens when Power Query is trying to join two tables using specified columns as keys, but the values in those key columns don't have any matches between the tables. Here are the most common causes and solutions:

**Common Causes:**
1. **Data Type Mismatches**: The most frequent cause is when the key columns have different data types. For example, one table might have the key as text while another has it as a number.

2. **Leading/Trailing Spaces**: Extra whitespace characters in text columns can prevent matches even when the values appear identical.

3. **Case Sensitivity**: Power Query merge operations are case-sensitive by default, so "Product A" won't match "product a".

4. **Date Format Differences**: When using dates as keys, different formatting can cause match failures.

**Solutions:**
- Always verify data types before merging using the data type indicators in column headers
- Use the Trim function to remove extra spaces: \`Table.TransformColumns(Source, {{"ColumnName", Text.Trim}})\`
- Apply consistent casing using Text.Upper or Text.Lower functions
- Standardize date formats before merging

**Best Practices:**
Before performing any merge operation, take time to examine your key columns in both tables. Use the Data Preview feature to spot potential issues, and consider creating a small sample to test your merge logic before applying it to the full dataset.

Remember that a successful merge operation is the foundation of many Power Query solutions, so investing time in getting this right will save you significant debugging time later.`,
      date: "2024-12-10",
      readTime: "8 min read",
      category: "Power BI",
      author: "Chris Webb"
    },
    {
      id: 3,
      title: "Storing Large Images In Power BI Datasets",
      content: `Working with images in Power BI datasets presents unique challenges, especially when dealing with large image files. While Power BI supports image visualization, there are important considerations around storage, performance, and best practices.

**Storage Limitations:**
Power BI datasets have size limitations that make storing large images directly in the model impractical. Each image stored as binary data counts against your dataset size limit, which can quickly become problematic with high-resolution images.

**Recommended Approaches:**

1. **External Image Storage**: Store images in external locations (SharePoint, Azure Blob Storage, etc.) and keep only URL references in your dataset. This approach provides several benefits:
   - Minimal impact on dataset size
   - Better performance during data refresh
   - Easier image management and updates

2. **Image Optimization**: If you must store images in the dataset:
   - Compress images before import
   - Use appropriate formats (JPEG for photos, PNG for graphics with transparency)
   - Consider thumbnail versions for list views

3. **Conditional Loading**: Implement logic to load images only when needed, perhaps based on user selection or report page context.

**Power Query Implementation:**
When working with image URLs in Power Query, you can create robust solutions that handle missing images gracefully:

\`\`\`
let
    Source = YourDataSource,
    AddImageUrls = Table.AddColumn(Source, "ImageUrl", 
        each "https://yourdomain.com/images/" & [ProductID] & ".jpg"),
    AddImageExists = Table.AddColumn(AddImageUrls, "HasImage", 
        each try Web.Contents([ImageUrl]) otherwise null)
in
    AddImageExists
\`\`\`

This approach allows you to verify image existence and provide fallback options for missing images.

**Performance Considerations:**
Remember that images can significantly impact report performance. Consider lazy loading strategies and provide users with options to disable image loading when working with large datasets over slower connections.`,
      date: "2024-12-05",
      readTime: "6 min read",
      category: "Power BI",
      author: "Chris Webb"
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
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">CW</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Chris Webb's BI Blog</h1>
                  <p className="text-gray-600 mb-4">Power BI, Analysis Services, Power Query and more</p>
                  <div className="flex justify-center space-x-4">
                    <Link href="https://twitter.com/chriswebb" className="text-gray-400 hover:text-blue-500">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://linkedin.com/in/chriswebb" className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://github.com/chriswebb" className="text-gray-400 hover:text-gray-900">
                      <Github className="h-5 w-5" />
                    </Link>
                  </div>
                </div>



                {/* Blog Posts */}
                <div className="space-y-0">
                  {filteredPosts.map((post, index) => (
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
                  ))}
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