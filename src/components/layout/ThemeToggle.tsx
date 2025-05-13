
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className={`${className} bg-white/20 dark:bg-slate-800 hover:bg-white/30 dark:hover:bg-slate-700`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? 
        <Moon size={20} className="text-primary" /> : 
        <Sun size={20} className="text-yellow-400" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
