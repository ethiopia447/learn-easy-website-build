
import { Link } from "react-router-dom";
import { Code, Github, Mail } from "lucide-react";

const Footer = () => {
  return <footer className="bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code size={24} className="text-primary" />
              <span className="text-xl font-bold">Geeze</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              A free learning platform focused on making programming accessible to everyone.
              Curated resources, tutorials and exercises to help you grow your skills.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-4">
              Courses
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/course/python" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Python
                </Link>
              </li>
              <li>
                <Link to="/course/javascript" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  JavaScript
                </Link>
              </li>
              <li>
                <Link to="/course/html-css" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  HTML/CSS
                </Link>
              </li>
              <li>
                <Link to="/course/git" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Git
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Resources
                </Link>
              </li>
              <li className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://t.me/example" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 4.5L2.5 9.5 9.5 13.5 16.5 8.5 11.5 15.5 17.5 19.5 21.5 4.5" />
                  </svg>
                  <span className="sr-only">Telegram</span>
                </a>
                <a href="mailto:info@example.com" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Geeze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};

export default Footer;
