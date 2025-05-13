import { Link } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl">Geeze</Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8 items-center">
              <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-purple-200">Home</Link>
              <Link to="/resources" className="px-3 py-2 text-sm font-medium hover:text-purple-200">Resources</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-purple-200">About</Link>
              <Link to="/admin" className="px-3 py-2 text-sm font-medium hover:text-purple-200">Admin</Link>
            </nav>
          </div>
          
          <div className="md:hidden flex items-center">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-200 hover:bg-primary-dark" aria-expanded="false" onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              {/* Menu Icon */}
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* X Icon */}
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark hover:text-white">
            Home
          </Link>
          <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark hover:text-white">
            Resources
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark hover:text-white">
            About
          </Link>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark hover:text-white">
            Admin
          </Link>
        </div>
      </div>
    </header>;
};
export default Navbar;