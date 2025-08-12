import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  // Sample blog posts data (in a real app, this would come from an API)
  const blogPosts = [
    {
      id: 1,
      title: "Power Query Copilot, AI Instructions And Function Definitions",
      excerpt: "Continuing my (already very long) series on what information you should be adding to the AI Instructions of your semantic model and why, in this I'll show you the benefits of adding the function definitions of your measures.",
      date: "2024-12-14",
      readTime: "5 min read",
      category: "Power Query",
      featured: true
    },
    {
      id: 2,
      title: "Understanding The 'The key didn't match any rows in the table' Error In Power Query In Power BI or Excel",
      excerpt: "A really common question from end users viewing a Power BI report is 'how is this measure calculated?'. As a result I have seen model developers use techniques like this to display either a text description of how the measure works in a report or the actual function definition.",
      date: "2024-12-10",
      readTime: "8 min read",
      category: "Power BI"
    },
    {
      id: 3,
      title: "Storing Large Images In Power BI Datasets",
      excerpt: "How to the Tax Paid measure calculated? The Tax Paid measure is a calculated column within your semantic model. To understand exactly how it is calculated you would need to review the calculation definition, which is not directly visible from Tabular calculation.",
      date: "2024-12-05",
      readTime: "6 min read",
      category: "Power BI"
    },
    {
      id: 4,
      title: "Power BI Semantic Model Memory Errors, Part 4: The Query Memory Limit",
      excerpt: "In this series of blog posts I'm looking at the different types of memory-related errors that you can encounter when working with Power BI semantic models and what you can do about them.",
      date: "2024-11-28",
      readTime: "10 min read",
      category: "Power BI"
    },
    {
      id: 5,
      title: "The 'Visual Has Exceeded The Available Resources' Error In Power BI Desktop",
      excerpt: "Another common memory-related error that you might encounter when working with Power BI is the 'Visual has exceeded the available resources' error that appears in visuals.",
      date: "2024-11-22",
      readTime: "7 min read",
      category: "Power BI"
    }
  ];

  const categories = ["All", "Power Query", "Power BI", "DAX", "M Language", "Analysis Services"];
  const topPosts = blogPosts.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[280px] pt-16">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Blog Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2MzY2ZjEiLz4KPHR1dCB4PSIyOCIgeT0iMzAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiIHJ4PSIyIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UFF1ZXJ5PC90ZXh0Pgo8L3N2Zz4K"
                  alt="Power Query Guide Author"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Power Query Guide Blog</h1>
              <p className="text-gray-600 text-lg mb-6">
                Microsoft Fabric, Power BI, Analysis Services, DAX, M, MDX, Power Query, Power Pivot and Excel
              </p>
              <nav className="flex justify-center gap-8 text-sm">
                <Link href="/blog" className="text-blue-600 hover:text-blue-800">Home</Link>
                <Link href="/blog/about" className="text-blue-600 hover:text-blue-800">About</Link>
                <Link href="/blog/contact" className="text-blue-600 hover:text-blue-800">Contact</Link>
                <Link href="/blog/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {blogPosts.map((post, index) => (
                  <Card key={post.id} className={`${post.featured && index === 0 ? 'border-blue-200 bg-blue-50' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{post.date}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl hover:text-blue-600 cursor-pointer">
                        <Link href={`/blog/post/${post.id}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <Link href={`/blog/post/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Social</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Twitter className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Github className="h-4 w-4 text-gray-700" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Search */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Search</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input placeholder="Search posts..." className="flex-1" />
                      <Button size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Language Selector */}
                <Card>
                  <CardContent className="pt-6">
                    <Select defaultValue="english">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">Select Language</SelectItem>
                        <SelectItem value="spanish">Español</SelectItem>
                        <SelectItem value="french">Français</SelectItem>
                        <SelectItem value="german">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-2">
                      Powered by <span className="text-blue-600">Google</span> Translate
                    </p>
                  </CardContent>
                </Card>

                {/* Top Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPosts.map((post) => (
                        <div key={post.id}>
                          <Link href={`/blog/post/${post.id}`}>
                            <h4 className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer line-clamp-2">
                              {post.title}
                            </h4>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}