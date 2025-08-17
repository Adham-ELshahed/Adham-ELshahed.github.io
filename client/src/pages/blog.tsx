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

  // Blog posts - with comprehensive dummy post
  const blogPosts = [
    {
      id: "comprehensive-power-query-guide",
      title: "The Complete Power Query Guide: Advanced Techniques and Best Practices",
      content: `Power Query is Microsoft's powerful data transformation tool that revolutionizes how we work with data. In this comprehensive guide, we'll explore advanced techniques that will take your data transformation skills to the next level.

**Getting Started with Power Query**

Before diving into advanced techniques, let's establish the fundamentals. Power Query uses the M language for data transformation, which provides incredible flexibility for data manipulation.

Here's a basic example of connecting to a data source:

\`\`\`m
let
    Source = Excel.Workbook(File.Contents("C:\\Data\\SalesData.xlsx"), null, true),
    Sheet1_Sheet = Source{[Item="Sheet1",Kind="Sheet"]}[Data],
    #"Promoted Headers" = Table.PromoteHeaders(Sheet1_Sheet, [PromoteAllScalars=true])
in
    #"Promoted Headers"
\`\`\`

**Advanced Data Transformation Techniques**

1. **Dynamic Column Selection**: Use dynamic approaches to select columns based on patterns or conditions.

2. **Custom Functions**: Create reusable functions for complex transformations.

3. **Error Handling**: Implement robust error handling in your queries.

Let's look at a more complex example that demonstrates custom functions:

\`\`\`m
// Custom function to clean phone numbers
(phoneNumber as text) as text =>
let
    RemoveSpaces = Text.Replace(phoneNumber, " ", ""),
    RemoveDashes = Text.Replace(RemoveSpaces, "-", ""),
    RemoveParentheses = Text.Replace(Text.Replace(RemoveDashes, "(", ""), ")", ""),
    CleanedNumber = if Text.Length(RemoveParentheses) = 10 
                    then "(" & Text.Start(RemoveParentheses, 3) & ") " & 
                         Text.Middle(RemoveParentheses, 3, 3) & "-" & 
                         Text.End(RemoveParentheses, 4)
                    else RemoveParentheses
in
    CleanedNumber
\`\`\`

**Working with JSON Data**

JSON has become increasingly important in data integration. Here's how to parse complex JSON structures:

\`\`\`json
{
  "customers": [
    {
      "id": 1,
      "name": "John Doe",
      "orders": [
        {"product": "Widget A", "quantity": 5, "price": 19.99},
        {"product": "Widget B", "quantity": 2, "price": 29.99}
      ]
    }
  ]
}
\`\`\`

To flatten this JSON in Power Query:

\`\`\`m
let
    Source = Json.Document(File.Contents("C:\\Data\\customers.json")),
    customers = Source[customers],
    #"Converted to Table" = Table.FromList(customers, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", {"id", "name", "orders"}, {"id", "name", "orders"}),
    #"Expanded orders" = Table.ExpandListColumn(#"Expanded Column1", "orders"),
    #"Expanded orders1" = Table.ExpandRecordColumn(#"Expanded orders", "orders", {"product", "quantity", "price"}, {"product", "quantity", "price"})
in
    #"Expanded orders1"
\`\`\`

**Performance Optimization Tips**

🚀 **Key Performance Strategies:**

- Use **Query Folding** whenever possible to push operations to the data source
- Avoid unnecessary transformations in the early steps
- Use Table.Buffer() strategically for expensive operations
- Consider data types and their impact on performance

**Common Pitfalls and Solutions**

⚠️ **Warning**: These are the most common mistakes I see in Power Query implementations:

1. **Over-transformation**: Don't transform data that doesn't need transformation
2. **Ignoring data types**: Always set appropriate data types
3. **Complex nested operations**: Break complex operations into simpler steps

**Advanced Pattern Matching**

Sometimes you need to extract specific patterns from text. Here's a regular expression example:

\`\`\`m
let
    Source = Table.FromRows({
        {"Order-2023-001-ABC"},
        {"Order-2023-002-DEF"},
        {"Order-2024-001-GHI"}
    }, {"OrderCode"}),
    ExtractYear = Table.AddColumn(Source, "Year", each 
        Text.BetweenDelimiters([OrderCode], "Order-", "-", 1, 0)
    ),
    ExtractNumber = Table.AddColumn(ExtractYear, "OrderNumber", each
        Text.BetweenDelimiters([OrderCode], Text.Combine({[Year], "-"}), "-")
    )
in
    ExtractNumber
\`\`\`

**Integration with External APIs**

Power Query excels at consuming REST APIs. Here's how to authenticate and consume data:

\`\`\`m
let
    BaseUrl = "https://api.example.com/v1/",
    ApiKey = "your-api-key-here",
    Headers = [#"Authorization" = "Bearer " & ApiKey, #"Content-Type" = "application/json"],
    
    GetData = (endpoint as text) =>
        let
            Url = BaseUrl & endpoint,
            Response = Web.Contents(Url, [Headers = Headers]),
            JsonResponse = Json.Document(Response)
        in
            JsonResponse,
    
    CustomersData = GetData("customers"),
    OrdersData = GetData("orders")
in
    CustomersData
\`\`\`

**Data Quality and Validation**

Ensuring data quality is crucial. Here are some validation techniques:

\`\`\`sql
-- SQL equivalent for comparison
SELECT 
    CustomerID,
    CustomerName,
    CASE 
        WHEN Email LIKE '%@%.%' THEN 'Valid'
        ELSE 'Invalid'
    END AS EmailStatus
FROM Customers
WHERE CustomerName IS NOT NULL
\`\`\`

**Conclusion**

Power Query continues to evolve with new features and capabilities. Stay updated with the latest developments and always test your queries with representative data samples.

For more advanced techniques, check out the official [Microsoft Power Query documentation](https://docs.microsoft.com/en-us/power-query/) and explore the [Power Query community forums](https://community.powerbi.com/t5/Power-Query/bd-p/power-bi-services).

**Visual Learning Resources**

Here's a helpful demonstration of Power Query in action:

![Power Query Interface](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format)
*The Power Query Editor interface showing data transformation steps*

**Video Tutorial: Advanced Power Query Techniques**

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Power Query Advanced Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Step-by-Step Visual Guide**

![Data Transformation Process](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&auto=format)
*Visual representation of the data transformation workflow*

**Screenshot Gallery**

Here are some key screenshots from real Power Query implementations:

![Query Editor Screenshot](https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&h=400&fit=crop&auto=format)
*Applied Steps panel showing transformation history*

![Data Preview](https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=400&fit=crop&auto=format)
*Data preview showing before and after transformation*

**Interactive Demo Video**

<video width="600" height="400" controls poster="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop&auto=format">
  <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
*Live demonstration of Power Query data transformation techniques*

**Infographic: Power Query Best Practices**

![Power Query Best Practices Infographic](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format)
*Quick reference guide for Power Query optimization*

**Resources and Further Reading:**

- 📚 [Power Query M Formula Language Reference](https://docs.microsoft.com/en-us/powerquery-m/)
- 🎥 [Video Tutorial Series on Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/data-analytics-microsoft/)
- 💡 Join the Power BI Community for discussions and tips
- 🔧 Download sample files and templates
- 📊 [Interactive Power Query Playground](https://powerquery.microsoft.com/playground/)

**Additional Visual Resources:**

![Advanced Transformations](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=250&fit=crop&auto=format) ![M Language Syntax](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=250&fit=crop&auto=format)

*Remember: The key to mastering Power Query is practice. Start with simple transformations and gradually work your way up to more complex scenarios.*`,
      author: "Ahmad Askar",
      date: "2024-12-15T10:00:00Z",
      readTime: "12 min read",
      category: "Power Query",
      featured: true,
      tags: ["Power Query", "M Language", "Data Transformation", "Advanced Techniques"]
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
                              // Handle code blocks
                              if (paragraph.startsWith('```')) {
                                const lines = paragraph.split('\n');
                                const language = lines[0].slice(3);
                                const code = lines.slice(1, -1).join('\n');
                                
                                return (
                                  <div key={pIndex} className="my-6">
                                    <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
                                      <span className="text-gray-400 text-xs font-mono uppercase">{language || 'code'}</span>
                                      <button 
                                        onClick={() => navigator.clipboard.writeText(code)}
                                        className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-b-lg text-sm overflow-x-auto font-mono leading-relaxed">
                                      <code>{code}</code>
                                    </pre>
                                  </div>
                                );
                              }
                              
                              // Handle headings
                              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return (
                                  <h3 key={pIndex} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                                    {paragraph.slice(2, -2)}
                                  </h3>
                                );
                              }
                              
                              // Handle regular content with rich formatting
                              const renderRichText = (text: string) => {
                                // Handle images ![alt](url)
                                text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg shadow-md my-4 max-w-full h-auto" />');
                                
                                // Handle videos <video>
                                text = text.replace(/<video([^>]*)>/g, '<video$1 class="rounded-lg shadow-md my-4 max-w-full">');
                                
                                // Handle iframes (YouTube embeds)
                                text = text.replace(/<iframe([^>]*)>/g, '<div class="relative my-6 aspect-video"><iframe$1 class="absolute inset-0 w-full h-full rounded-lg"></div>');
                                
                                // Handle links [text](url)
                                text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 hover:text-green-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
                                
                                // Handle bold **text**
                                text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
                                
                                // Handle italic *text*
                                text = text.replace(/\*([^*]+)\*/g, '<em class="italic text-gray-700">$1</em>');
                                
                                // Handle inline code `code`
                                text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>');
                                
                                // Handle emojis and special characters
                                text = text.replace(/🚀/g, '<span class="text-blue-500">🚀</span>');
                                text = text.replace(/⚠️/g, '<span class="text-yellow-500">⚠️</span>');
                                text = text.replace(/📚/g, '<span class="text-green-500">📚</span>');
                                text = text.replace(/🎥/g, '<span class="text-red-500">🎥</span>');
                                text = text.replace(/💡/g, '<span class="text-yellow-400">💡</span>');
                                text = text.replace(/🔧/g, '<span class="text-blue-400">🔧</span>');
                                text = text.replace(/📊/g, '<span class="text-purple-500">📊</span>');
                                
                                return text;
                              };
                              
                              // Handle list items
                              if (paragraph.includes('- ') || paragraph.includes('1. ') || paragraph.includes('2. ') || paragraph.includes('3. ')) {
                                const lines = paragraph.split('\n');
                                return (
                                  <div key={pIndex} className="my-4">
                                    {lines.map((line, lIndex) => {
                                      if (line.startsWith('- ')) {
                                        return (
                                          <div key={lIndex} className="flex items-start mb-2">
                                            <span className="text-green-600 mr-3 mt-1 text-sm">•</span>
                                            <span 
                                              className="text-gray-700 leading-relaxed flex-1"
                                              dangerouslySetInnerHTML={{ __html: renderRichText(line.slice(2)) }}
                                            />
                                          </div>
                                        );
                                      } else if (/^\d+\.\s/.test(line)) {
                                        const match = line.match(/^(\d+)\.\s/);
                                        const number = match ? match[1] : '1';
                                        const content = line.replace(/^\d+\.\s/, '');
                                        return (
                                          <div key={lIndex} className="flex items-start mb-2">
                                            <span className="text-green-600 mr-3 font-semibold text-sm">{number}.</span>
                                            <span 
                                              className="text-gray-700 leading-relaxed flex-1"
                                              dangerouslySetInnerHTML={{ __html: renderRichText(content) }}
                                            />
                                          </div>
                                        );
                                      } else if (line.trim()) {
                                        return (
                                          <p key={lIndex} className="mb-2 text-gray-700 leading-relaxed" 
                                             dangerouslySetInnerHTML={{ __html: renderRichText(line) }} />
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                );
                              }
                              
                              // Handle regular paragraphs
                              if (paragraph.trim()) {
                                return (
                                  <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed" 
                                     dangerouslySetInnerHTML={{ __html: renderRichText(paragraph) }} />
                                );
                              }
                              
                              return null;
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