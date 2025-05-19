
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CodeIDE from "../components/ide/CodeIDE";
import { ThemeToggle } from "../components/layout/ThemeToggle";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AIHelper from "../components/ai/AIHelper";

const IDEPage = () => {
  // Using the OpenAI API key provided
  const openaiApiKey = "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";
  
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Online Code IDE</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Write, test, and run your code right in the browser
            </p>
          </div>
          <ThemeToggle />
        </div>
        
        <Alert className="mb-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription>
            JavaScript runs directly in your browser. For Python execution, connect to Supabase to use Edge Functions for backend processing.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CodeIDE />
          </div>
          <div className="h-[600px]">
            <AIHelper apiKey={openaiApiKey} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IDEPage;
