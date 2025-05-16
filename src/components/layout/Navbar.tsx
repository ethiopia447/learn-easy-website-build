
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/course/python" },
    { name: "Resources", path: "/resources" },
    { name: "IDE", path: "/ide" },
    { name: "About", path: "/about" }
  ];

  return (
    <nav
      className={`w-full z-10 transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center font-bold text-xl text-gray-900 dark:text-white hover:opacity-90 transition-opacity"
            >
              <Code size={28} className="mr-2 text-primary" />
              <span>Geeze</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-primary dark:text-primary"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center space-x-4">
                <ThemeToggle />

                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => logout()}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile nav toggle */}
          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <button
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
          <div className="pt-2 pb-4 px-4 space-y-1 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 text-base font-medium ${
                  location.pathname === link.path
                    ? "text-primary dark:text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="flex flex-col space-y-2 pt-2 border-t dark:border-gray-700">
                <Link to="/admin" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t dark:border-gray-700">
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
