
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { useDarkMode } from "./hooks/useDarkMode.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";

// Apply dark mode before rendering
const DarkModeWrapper = () => {
  useDarkMode();
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeWrapper />
  </React.StrictMode>
);
