import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "powerquery" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Copy the original clean code without any HTML markup
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Enhanced syntax highlighting to match the screenshot exactly
  const highlightSyntax = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let highlightedLine = line
        // Function names in blue (like Access.Database)
        .replace(/\b([A-Z][a-zA-Z]*\.[A-Z][a-zA-Z]*)\(/g, '<span style="color: #0066cc; font-weight: 500;">$1</span>(')
        // Keywords like 'as' in blue
        .replace(/\b(as)\b/g, '<span style="color: #0066cc; font-weight: 500;">$1</span>')
        // Types in teal/cyan (binary, nullable, record, table)
        .replace(/\b(binary|nullable|record|table|text|number|logical|date|datetime|time|duration|list|function|any)\b/g, '<span style="color: #008080; font-weight: 500;">$1</span>')
        // Parameters and identifiers in black
        .replace(/\b(database|optional|options)\b/g, '<span style="color: #000000;">$1</span>')
        // Parentheses and commas in gray
        .replace(/([(),])/g, '<span style="color: #666666;">$1</span>')
        // Strings in green (if any)
        .replace(/"([^"]*)"/g, '<span style="color: #008000;">"$1"</span>')
        // Comments in gray
        .replace(/(\/\/.*$)/gm, '<span style="color: #808080; font-style: italic;">$1</span>');

      return `<div class="flex items-start"><span class="text-gray-400 text-right mr-4 select-none w-6 flex-shrink-0 font-mono text-sm leading-6">${index + 1}</span><span class="flex-1 font-mono text-sm leading-6">${highlightedLine}</span></div>`;
    }).join('\n');
  };

  return (
    <div className="relative">
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-800">
            Syntax
          </h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="h-7 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        <div className="p-0 bg-white overflow-x-auto">
          <div className="min-w-full">
            <pre className="p-4 m-0 text-gray-900 bg-white">
              <code 
                dangerouslySetInnerHTML={{ 
                  __html: highlightSyntax(code) 
                }}
              />
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}