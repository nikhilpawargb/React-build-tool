import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../Button/Button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CodeLingo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`font-medium transition-colors ${
                isActive('/courses') || location.pathname.startsWith('/course')
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Courses
            </Link>
            <Link
              to="/profile"
              className={`font-medium transition-colors ${
                isActive('/profile') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Profile
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`font-medium transition-colors ${
                  isActive('/courses') || location.pathname.startsWith('/course')
                    ? 'text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/profile"
                className={`font-medium transition-colors ${
                  isActive('/profile') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
