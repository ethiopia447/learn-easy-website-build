
import { Download } from "lucide-react";

interface DownloadButtonProps {
  label: string;
  fileUrl: string;
  fileType: "pdf" | "code" | "notes" | "cheatsheet";
}

const DownloadButton = ({ label, fileUrl, fileType }: DownloadButtonProps) => {
  const getIcon = () => {
    switch (fileType) {
      case "pdf":
        return "📄";
      case "code":
        return "💻";
      case "notes":
        return "📝";
      case "cheatsheet":
        return "📋";
      default:
        return "📄";
    }
  };

  return (
    <a 
      href={fileUrl} 
      download
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <span className="mr-2">{getIcon()}</span>
      <span>{label}</span>
      <Download size={16} className="ml-2" />
    </a>
  );
};

export default DownloadButton;
