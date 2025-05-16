
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Play, Save, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import CodeEditor from "../admin/CodeEditor";

interface CodeIDEProps {
  initialCode?: string;
  initialLanguage?: string;
}

const DEFAULT_JS_CODE = `// Write your JavaScript code here
function greet(name) {
  return "Hello, " + name + "!";
}

// Test your function
console.log(greet("Coder"));`;

const DEFAULT_HTML_CODE = `<!DOCTYPE html>
<html>
<head>
  <title>My Web Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Welcome to my web page.</p>
</body>
</html>`;

const DEFAULT_PYTHON_CODE = `# Write your Python code here
def greet(name):
    return f"Hello, {name}!"

# Test your function
print(greet("Coder"))`;

const CodeIDE = ({ initialCode, initialLanguage = "javascript" }: CodeIDEProps) => {
  const [code, setCode] = useState<string>(initialCode || DEFAULT_JS_CODE);
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Update code when language changes
  useEffect(() => {
    if (!initialCode) {
      switch (language) {
        case "javascript":
          setCode(DEFAULT_JS_CODE);
          break;
        case "html":
          setCode(DEFAULT_HTML_CODE);
          break;
        case "python":
          setCode(DEFAULT_PYTHON_CODE);
          break;
        default:
          setCode(DEFAULT_JS_CODE);
      }
    }
  }, [language, initialCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("");
    
    try {
      if (language === "javascript") {
        // Capture console.log output
        const originalConsoleLog = console.log;
        const logs: string[] = [];
        
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
          originalConsoleLog(...args);
        };
        
        try {
          // Execute the code
          // eslint-disable-next-line no-new-func
          const result = new Function(code)();
          
          if (result !== undefined) {
            logs.push(`Return value: ${result}`);
          }
          
          setOutput(logs.join('\n'));
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          // Restore console.log
          console.log = originalConsoleLog;
        }
      } else if (language === "html") {
        // For HTML, we'll show a preview in an iframe
        setOutput("HTML preview is displayed below.");
      } else if (language === "python") {
        // For a complete solution, you would need a backend service to execute Python code
        // For now, we'll show a message suggesting that a Supabase Edge Function could be used
        toast.info("To execute Python code, please connect to Supabase and create an Edge Function");
        setOutput("To execute actual Python code, you need to connect this project to Supabase.\n\nWith Supabase Edge Functions, you could run Python code on the backend and return the results.");
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      toast.error("Error executing code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveCode = () => {
    // In a real app, you might save this to the user's account
    localStorage.setItem(`saved-code-${language}`, code);
    toast.success("Code saved to browser storage");
  };

  const handleDownloadCode = () => {
    const fileExtension = language === 'javascript' ? 'js' : language === 'html' ? 'html' : 'py';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded as code.${fileExtension}`);
  };

  return (
    <Card className="w-full dark:bg-slate-900 border dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-primary" />
            <span>Online Code Editor</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveCode}>
              <Save size={16} className="mr-1" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadCode}>
              <Download size={16} className="mr-1" /> Download
            </Button>
          </div>
        </CardTitle>
        <div>
          <select 
            className="w-full md:w-auto px-3 py-1.5 text-sm rounded-md border bg-background dark:bg-slate-800 dark:border-slate-700"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="python">Python</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <CodeEditor 
            value={code} 
            language={language} 
            onChange={setCode} 
          />
        </div>
        
        <div className="mt-4">
          <Button 
            onClick={handleRunCode} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play size={16} /> Run Code
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-stretch">
        <Tabs defaultValue="output" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="output">Output</TabsTrigger>
            {language === "html" && <TabsTrigger value="preview">Preview</TabsTrigger>}
          </TabsList>
          <TabsContent value="output" className="mt-2">
            <div className="bg-slate-950 text-green-400 font-mono p-4 rounded min-h-[100px] max-h-[200px] overflow-auto">
              {output || "Run your code to see the output here"}
            </div>
          </TabsContent>
          {language === "html" && (
            <TabsContent value="preview" className="mt-2">
              <div className="border rounded p-1 min-h-[200px] bg-white">
                <iframe
                  title="HTML Preview"
                  srcDoc={code}
                  sandbox="allow-scripts"
                  className="w-full h-[200px] border-0"
                />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardFooter>
    </Card>
  );
};

export default CodeIDE;
