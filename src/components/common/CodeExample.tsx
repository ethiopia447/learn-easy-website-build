
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CodeExampleProps {
  title: string;
  code: string;
  language?: string;
  explanation?: string;
}

// Simple syntax highlighting function
const applySyntaxHighlighting = (code: string, language: string): string => {
  if (!code) return "";
  
  let highlightedCode = code
    // Replace < and > with their HTML entities to prevent HTML injection
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  if (language === "javascript" || language === "typescript") {
    // Keywords
    highlightedCode = highlightedCode.replace(
      /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|new|this)\b/g, 
      '<span class="text-purple-600">$1</span>'
    );
    
    // Strings
    highlightedCode = highlightedCode.replace(
      /(["'`])(.*?)\1/g, 
      '<span class="text-green-600">$1$2$1</span>'
    );
    
    // Comments
    highlightedCode = highlightedCode.replace(
      /(\/\/.*)/g, 
      '<span class="text-gray-500">$1</span>'
    );
    
    // Numbers
    highlightedCode = highlightedCode.replace(
      /\b(\d+)\b/g, 
      '<span class="text-blue-600">$1</span>'
    );
    
    // Function calls
    highlightedCode = highlightedCode.replace(
      /(\w+)(\s*\()/g, 
      '<span class="text-yellow-600">$1</span>$2'
    );
  } else if (language === "python") {
    // Keywords
    highlightedCode = highlightedCode.replace(
      /\b(def|class|if|else|for|while|import|from|return|try|except|with|as|in|is|not|or|and|True|False|None)\b/g, 
      '<span class="text-purple-600">$1</span>'
    );
    
    // Strings
    highlightedCode = highlightedCode.replace(
      /(["'])(.*?)\1/g, 
      '<span class="text-green-600">$1$2$1</span>'
    );
    
    // Comments
    highlightedCode = highlightedCode.replace(
      /(#.*)/g, 
      '<span class="text-gray-500">$1</span>'
    );
    
    // Numbers
    highlightedCode = highlightedCode.replace(
      /\b(\d+)\b/g, 
      '<span class="text-blue-600">$1</span>'
    );
  } else if (language === "html") {
    // Tags
    highlightedCode = highlightedCode.replace(
      /(&lt;\/?)([\w-]+)(.*?)(&gt;)/g, 
      '$1<span class="text-red-600">$2</span>$3$4'
    );
    
    // Attributes
    highlightedCode = highlightedCode.replace(
      /(\s+)([\w-]+)(=)(".*?")/g, 
      '$1<span class="text-yellow-600">$2</span>$3<span class="text-green-600">$4</span>'
    );
  } else if (language === "css") {
    // Selectors
    highlightedCode = highlightedCode.replace(
      /([.#]?[\w-]+)(\s*\{)/g, 
      '<span class="text-red-600">$1</span>$2'
    );
    
    // Properties
    highlightedCode = highlightedCode.replace(
      /(\s+)([\w-]+)(\s*:)/g, 
      '$1<span class="text-blue-600">$2</span>$3'
    );
    
    // Values
    highlightedCode = highlightedCode.replace(
      /(:)(\s*)([\w#.-]+)(;)/g, 
      '$1$2<span class="text-green-600">$3</span>$4'
    );
  }
  
  return highlightedCode;
};

const CodeExample = ({ 
  title, 
  code, 
  language = "bash", 
  explanation 
}: CodeExampleProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = applySyntaxHighlighting(code, language);

  return (
    <div className="mb-8 border rounded-lg overflow-hidden bg-card">
      <div className="bg-muted flex items-center justify-between px-4 py-2">
        <h4 className="font-medium text-sm">{title}</h4>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={copyToClipboard}
          className="h-8"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="ml-2 text-xs">{copied ? "Copied!" : "Copy code"}</span>
        </Button>
      </div>
      <div className="p-4 bg-slate-950 text-slate-50 overflow-x-auto">
        <pre className="whitespace-pre">
          <code 
            className={`language-${language}`} 
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          ></code>
        </pre>
      </div>
      {explanation && (
        <Accordion type="single" collapsible className="px-4 py-2 bg-muted/50">
          <AccordionItem value="explanation" className="border-none">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              View Explanation
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-sm py-2 px-1">
                {explanation.split('\n').map((line, i) => (
                  <p key={i} className={cn("mb-2", line.startsWith('-') && "pl-4")}>{line}</p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default CodeExample;
