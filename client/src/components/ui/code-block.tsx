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
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Enhanced syntax highlighting for Power Query to match screenshot
  const highlightSyntax = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let highlightedLine = line
        // Function names starting with # in purple
        .replace(/#([a-zA-Z_][a-zA-Z0-9_]*)/g, '<span style="color: #7c3aed; font-weight: 500;">#$1</span>')
        // Keywords in purple
        .replace(/\b(let|in|if|then|else|try|otherwise|and|or|not|meta|each|function|null|true|false)\b/g, '<span style="color: #9333ea; font-weight: 500;">$1</span>')
        // Types and keywords in blue  
        .replace(/\b(as|table|text|number|logical|date|datetime|time|duration|binary|list|record|function|any)\b/g, '<span style="color: #2563eb; font-weight: 500;">$1</span>')
        // Strings in orange/amber
        .replace(/"([^"]*)"/g, '<span style="color: #ea580c;">"$1"</span>')
        // Numbers in blue
        .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #2563eb;">$1</span>')
        // Comments in gray
        .replace(/(\/\/.*$)/gm, '<span style="color: #6b7280; font-style: italic;">$1</span>');

      return `<div class="flex"><span class="text-gray-400 text-right mr-4 select-none w-6 flex-shrink-0">${index + 1}</span><span class="flex-1">${highlightedLine}</span></div>`;
    }).join('\n');
  };

  return (
    <div className="relative">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Syntax
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={copyToClipboard}
            className="h-8 px-3 text-gray-600 hover:text-gray-900 bg-white border-gray-300 hover:bg-gray-50"
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
        <div className="p-4 bg-gray-50 overflow-x-auto">
          <pre className="text-sm leading-6 font-mono text-gray-800">
            <code 
              dangerouslySetInnerHTML={{ 
                __html: highlightSyntax(code) 
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}