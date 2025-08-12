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
      console.error('Failed to copy text: ', err);
    }
  };

  // Simple syntax highlighting for Power Query
  const highlightCode = (code: string) => {
    return code
      .replace(/(\b(?:let|in|if|then|else|try|otherwise|error|true|false|null)\b)/g, '<span class="text-purple-600 font-semibold">$1</span>')
      .replace(/(\b(?:Table|List|Date|Text|Number|Record|Value|Type|Duration|Binary|Function)\.[A-Za-z]+)/g, '<span class="text-blue-600 font-medium">$1</span>')
      .replace(/(#\w+)/g, '<span class="text-green-600">$1</span>')
      .replace(/(".*?")/g, '<span class="text-red-600">$1</span>')
      .replace(/(\d+\.?\d*)/g, '<span class="text-orange-600">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>');
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs text-gray-300 font-medium uppercase tracking-wide">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 w-6 p-0 text-gray-300 hover:text-white hover:bg-gray-700"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      
      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: highlightCode(code) 
            }}
          />
        </pre>
      </div>
    </div>
  );
}