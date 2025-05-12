
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
}

// Simple syntax highlighting function
const applySyntaxHighlighting = (code: string, language: string): string => {
  if (!code) return "";
  
  let highlightedCode = code;
  
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
      /\/\/(.*)/g, 
      '<span class="text-gray-500">\/\/$1</span>'
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
    
    // Function calls
    highlightedCode = highlightedCode.replace(
      /(\w+)(\s*\()/g, 
      '<span class="text-yellow-600">$1</span>$2'
    );
  } else if (language === "html") {
    // Tags
    highlightedCode = highlightedCode.replace(
      /(&lt;\/?)(\w+)([^&]*?)(\/?&gt;)/g, 
      '$1<span class="text-red-600">$2</span>$3$4'
    );
    
    // Attributes
    highlightedCode = highlightedCode.replace(
      /(\s+)(\w+)(=)(".*?")/g, 
      '$1<span class="text-yellow-600">$2</span>$3<span class="text-green-600">$4</span>'
    );
  } else if (language === "css") {
    // Selectors
    highlightedCode = highlightedCode.replace(
      /([.#]?\w+)(\s*\{)/g, 
      '<span class="text-red-600">$1</span>$2'
    );
    
    // Properties
    highlightedCode = highlightedCode.replace(
      /(\s+)(\w+-?\w+)(\s*:)/g, 
      '$1<span class="text-blue-600">$2</span>$3'
    );
    
    // Values
    highlightedCode = highlightedCode.replace(
      /(:)(\s*)([\w#.-]+)(;)/g, 
      '$1$2<span class="text-green-600">$3</span>$4'
    );
  }
  
  // Replace < and > with their HTML entities to prevent HTML injection
  highlightedCode = highlightedCode
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  return highlightedCode;
};

const CodeEditor = ({ value, language, onChange }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  
  useEffect(() => {
    setHighlightedCode(applySyntaxHighlighting(value, language));
  }, [value, language]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleTextareaScroll = () => {
    if (previewRef.current && textareaRef.current) {
      previewRef.current.scrollTop = textareaRef.current.scrollTop;
      previewRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-800 text-slate-200 flex items-center justify-between p-2">
        <div>
          <span className="text-xs font-medium">{language.toUpperCase()}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={copyToClipboard}
          className="h-7 text-slate-200 hover:text-white hover:bg-slate-700"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="ml-2 text-xs">{copied ? "Copied!" : "Copy code"}</span>
        </Button>
      </div>
      
      <div className="relative" style={{ height: '200px' }}>
        <div 
          ref={previewRef}
          className="absolute inset-0 overflow-auto bg-slate-900 text-slate-200 px-4 py-2"
        >
          <pre className="whitespace-pre font-mono text-sm">
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }}></div>
          </pre>
        </div>
        
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaChange}
          onScroll={handleTextareaScroll}
          className="absolute inset-0 w-full h-full font-mono text-sm bg-transparent text-transparent caret-white resize-none p-4 overflow-auto"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
