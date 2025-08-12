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

  return (
    <div className="relative">
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
          <h3 className="text-sm font-medium text-gray-200">
            Syntax
          </h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="h-7 px-2 text-gray-300 hover:text-white hover:bg-gray-700 text-xs"
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
        <div className="p-4 bg-gray-900 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}