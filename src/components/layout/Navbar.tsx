
import { Link } from "react-router-dom";
import { Code, BookOpen, FileText, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Code size={24} className="text-primary" />
                <span className="text-xl font-bold">LearnEasy</span>
              </Link>
            </div>
            <nav className="ml-6 flex items-center space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/course/python"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Python
              </Link>
              <Link
                to="/course/javascript"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium"
              >
                JavaScript
              </Link>
              <Link
                to="/course/html-css"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium"
              >
                HTML/CSS
              </Link>
              <Link
                to="/course/git"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Git
              </Link>
              <Link
                to="/resources"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium flex items-center"
              >
                <FileText size={16} className="mr-1" /> Resources
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium flex items-center"
              >
                <User size={16} className="mr-1" /> About
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
