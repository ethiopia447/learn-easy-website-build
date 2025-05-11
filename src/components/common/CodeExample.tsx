
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
        <pre><code className={`language-${language}`}>{code}</code></pre>
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
                  <p key={i} className={cn("mb-2", line.startsWith('-') && "pl-4"))}>{line}</p>
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
