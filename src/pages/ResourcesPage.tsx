
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DownloadButton from "../components/common/DownloadButton";
import { FileText, BookOpen, Filter, Search } from "lucide-react";

const ResourcesPage = () => {
  const resources = [
    {
      title: "Python Complete Reference",
      description: "A comprehensive reference guide for Python language and standard library.",
      category: "Python",
      type: "cheatsheet",
      fileUrl: "#"
    },
    {
      title: "JavaScript ES6 Features",
      description: "Overview of all ES6+ features with examples and use cases.",
      category: "JavaScript",
      type: "pdf",
      fileUrl: "#"
    },
    {
      title: "CSS Flexbox Layout Guide",
      description: "Master CSS flexbox with this visual guide and examples.",
      category: "HTML/CSS",
      type: "pdf",
      fileUrl: "#"
    },
    {
      title: "Git Commands Cheatsheet",
      description: "Quick reference for common Git commands and workflows.",
      category: "Git",
      type: "cheatsheet",
      fileUrl: "#"
    },
    {
      title: "Python for Data Science",
      description: "Introduction to using Python for data analysis and visualization.",
      category: "Python",
      type: "notes",
      fileUrl: "#"
    },
    {
      title: "HTML5 Elements Reference",
      description: "Complete reference of HTML5 elements with examples.",
      category: "HTML/CSS",
      type: "pdf",
      fileUrl: "#"
    },
    {
      title: "JavaScript Array Methods",
      description: "Comprehensive guide to JavaScript array methods with examples.",
      category: "JavaScript",
      type: "notes",
      fileUrl: "#"
    },
    {
      title: "CSS Grid Layout Examples",
      description: "Practical examples of CSS Grid layouts for modern websites.",
      category: "HTML/CSS",
      type: "code",
      fileUrl: "#"
    }
  ];

  return (
    <>
      <Navbar />
      
      <div className="bg-primary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Learning Resources</h1>
              <p className="text-lg text-gray-700">
                Download cheat sheets, notes, and references for all our courses
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container">
        <div className="mb-8">
          <div className="bg-white shadow-sm border rounded-lg p-4 md:p-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="relative flex-1 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search resources..."
                />
              </div>

              <div className="mt-4 md:mt-0 flex items-center">
                <span className="text-sm text-gray-700 mr-2">Filter by:</span>
                <div className="relative">
                  <select
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-white pr-8 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">All Categories</option>
                    <option>Python</option>
                    <option>JavaScript</option>
                    <option>HTML/CSS</option>
                    <option>Git</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Filter size={16} className="text-gray-400" />
                  </div>
                </div>

                <div className="relative ml-4">
                  <select
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-white pr-8 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">All Types</option>
                    <option>PDF</option>
                    <option>Cheatsheet</option>
                    <option>Code</option>
                    <option>Notes</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Filter size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-md bg-primary/10 text-primary mr-4">
                  {resource.type === "pdf" || resource.type === "notes" ? (
                    <FileText size={24} />
                  ) : (
                    <BookOpen size={24} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <span className="inline-block px-2 py-1 text-xs text-primary-800 bg-primary-100 rounded-full mt-1">
                    {resource.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <DownloadButton
                label={`Download ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}`}
                fileUrl={resource.fileUrl}
                fileType={resource.type as any}
              />
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ResourcesPage;
