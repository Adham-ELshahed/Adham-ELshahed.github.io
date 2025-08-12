import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "wouter";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/code-block";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { type Function } from "@shared/schema";

export default function FunctionDetail() {
  const { functionName } = useParams<{ functionName: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: func, isLoading, error } = useQuery<Function>({
    queryKey: ["/api/functions", functionName],
    queryFn: async () => {
      if (!functionName) throw new Error('Function name is required');
      
      // Decode the function name from URL, then encode it properly for API call
      const decodedName = decodeURIComponent(functionName);
      const response = await fetch(`/api/functions/${encodeURIComponent(decodedName)}`);
      
      if (!response.ok) {
        throw new Error('Function not found');
      }
      return response.json();
    },
    enabled: !!functionName,
  });



  if (isLoading) {
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
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
                <div className="h-6 bg-gray-100 rounded mb-8 w-2/3"></div>
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !func) {
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
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-ms-gray mb-4">Function Not Found</h1>
                <p className="text-ms-gray-secondary mb-6">
                  The function "{functionName}" could not be found.
                </p>
                <Link href="/functions" className="text-ms-blue hover:text-ms-blue-hover">
                  ← Back to Functions
                </Link>
              </div>
            </div>
          </main>
        </div>

      </div>
    );
  }

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
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link href="/functions" className="text-ms-blue hover:text-ms-blue-hover text-sm flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Functions
              </Link>
            </div>

            {/* Function Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-ms-gray">{func.name}</h1>
                <Badge variant="outline" className="text-xs">
                  {func.category?.replace(/[-_]/g, ' ') || 'Unknown'}
                </Badge>
                {func.deprecated && (
                  <Badge variant="destructive" className="text-xs">
                    Deprecated
                  </Badge>
                )}
                {func.volatile && (
                  <Badge variant="secondary" className="text-xs">
                    Volatile
                  </Badge>
                )}
              </div>
              <p className="text-lg text-ms-gray-secondary leading-relaxed">
                {func.description}
              </p>
            </div>

            {/* Section Navigation */}
            <div className="mb-8 p-4 bg-ms-gray-light rounded-lg border border-ms-gray-border">
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="#syntax" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                  Syntax
                </a>
                {func.parameters && Array.isArray(func.parameters) && (func.parameters as any[]).length > 0 && (
                  <a href="#parameters" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                    Parameters
                  </a>
                )}
                <a href="#return-value" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                  Return Value
                </a>
                {func.examples && Array.isArray(func.examples) && (func.examples as any[]).length > 0 && (
                  <a href="#examples" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                    Examples
                  </a>
                )}
                {func.remarks && (
                  <a href="#remarks" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                    Remarks
                  </a>
                )}
              </div>
            </div>

            {/* Syntax */}
            <Card className="mb-6" id="syntax">
              <CardHeader>
                <CardTitle className="text-xl">Syntax</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={func.syntax || `${func.name}()`} />
              </CardContent>
            </Card>

            {/* Parameters */}
            {func.parameters && Array.isArray(func.parameters) && (func.parameters as any[]).length > 0 && (
              <Card className="mb-6" id="parameters">
                <CardHeader>
                  <CardTitle className="text-xl">Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(func.parameters as any[]).map((param: any, index: number) => (
                      <div key={index} className="border-l-4 border-ms-blue-light pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-semibold text-ms-blue">{param.name}</span>
                          <Badge variant="outline" className="text-xs">{param.type}</Badge>
                        </div>
                        <p className="text-sm text-ms-gray-secondary">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Return Value */}
            <Card className="mb-6" id="return-value">
              <CardHeader>
                <CardTitle className="text-xl">Return Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{func.returnType || 'any'}</Badge>
                </div>
                <p className="text-sm text-ms-gray-secondary">
                  Returns a value of type {func.returnType || 'any'}.
                </p>
              </CardContent>
            </Card>

            {/* Examples */}
            {func.examples && Array.isArray(func.examples) && func.examples.length > 0 && (
              <Card className="mb-6" id="examples">
                <CardHeader>
                  <CardTitle className="text-xl">Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {func.examples.map((example: any, index: number) => (
                      <div key={index}>
                        <h4 className="font-semibold text-ms-gray mb-3">{example.title}</h4>
                        <CodeBlock code={example.code} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Remarks */}
            {func.remarks && (
              <Card className="mb-6" id="remarks">
                <CardHeader>
                  <CardTitle className="text-xl">Remarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ms-gray-secondary leading-relaxed">{func.remarks}</p>
                </CardContent>
              </Card>
            )}


          </div>
        </main>
      </div>
    </div>
  );
}
