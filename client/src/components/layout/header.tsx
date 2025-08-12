import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface HeaderProps {
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export default function Header({ isMobileMenuOpen, onMobileMenuToggle }: HeaderProps) {
  // Close mobile menu when clicking on navigation links
  const closeMobileMenu = () => {
    if (isMobileMenuOpen && onMobileMenuToggle) {
      onMobileMenuToggle();
    }
  };

  return (
    <header className="bg-ms-blue border-b border-ms-blue-hover fixed top-0 left-0 right-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden mr-2 text-white hover:bg-white/10"
              onClick={onMobileMenuToggle}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-ms-blue font-bold text-sm">PQ</span>
              </div>
              <span className="text-xl font-semibold text-white">POWER QUERY GUIDE</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/functions" className="text-white hover:text-gray-200 font-medium">
              Functions
            </Link>
            <Link href="/blog" className="text-gray-200 hover:text-white font-medium">
              Blog
            </Link>
            <Link href="/operators" className="text-gray-200 hover:text-white font-medium">
              Operators
            </Link>
            <Link href="/statements" className="text-gray-200 hover:text-white font-medium">
              Statements
            </Link>
            <Link href="/datatypes" className="text-gray-200 hover:text-white font-medium">
              Data Types
            </Link>
            <Link href="/about" className="text-gray-200 hover:text-white font-medium">
              About
            </Link>
          </nav>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-ms-blue border-t border-ms-blue-hover md:hidden z-40">
              <nav className="px-4 py-2 space-y-1">
                <Link href="/functions" onClick={closeMobileMenu} className="block py-2 px-3 text-white hover:bg-white/10 rounded font-medium">
                  Functions
                </Link>
                <Link href="/blog" onClick={closeMobileMenu} className="block py-2 px-3 text-gray-200 hover:bg-white/10 rounded font-medium">
                  Blog
                </Link>
                <Link href="/operators" onClick={closeMobileMenu} className="block py-2 px-3 text-gray-200 hover:bg-white/10 rounded font-medium">
                  Operators
                </Link>
                <Link href="/statements" onClick={closeMobileMenu} className="block py-2 px-3 text-gray-200 hover:bg-white/10 rounded font-medium">
                  Statements
                </Link>
                <Link href="/datatypes" onClick={closeMobileMenu} className="block py-2 px-3 text-gray-200 hover:bg-white/10 rounded font-medium">
                  Data Types
                </Link>
                <Link href="/about" onClick={closeMobileMenu} className="block py-2 px-3 text-gray-200 hover:bg-white/10 rounded font-medium">
                  About
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
