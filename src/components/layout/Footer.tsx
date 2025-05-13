
import { Link } from "react-router-dom";
import { Code, Github, Linkedin, Twitter } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code size={24} className="text-primary" />
              <span className="text-xl font-bold">Geeze</span>
            </div>
            <p className="text-gray-600 max-w-md">
              A free learning platform focused on making programming accessible to everyone.
              Curated resources, tutorials and exercises to help you grow your skills.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Courses
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/course/python" className="text-base text-gray-600 hover:text-primary">
                  Python
                </Link>
              </li>
              <li>
                <Link to="/course/javascript" className="text-base text-gray-600 hover:text-primary">
                  JavaScript
                </Link>
              </li>
              <li>
                <Link to="/course/html-css" className="text-base text-gray-600 hover:text-primary">
                  HTML/CSS
                </Link>
              </li>
              <li>
                <Link to="/course/git" className="text-base text-gray-600 hover:text-primary">
                  Git
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-base text-gray-600 hover:text-primary">
                  Resources
                </Link>
              </li>
              <li className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <Linkedin size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Geeze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
