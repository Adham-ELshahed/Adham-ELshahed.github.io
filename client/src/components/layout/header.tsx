import { Link } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export default function Header({ isMobileMenuOpen, onMobileMenuToggle }: HeaderProps) {
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/datatypes", label: "Data Types" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="bg-ms-blue border-b border-ms-blue-hover fixed top-0 left-0 right-0 z-50">
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
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <img src="/logo-icon.ico" alt="Power Query Guide" className="w-8 h-8" />
              </div>
              <span className="text-xl font-semibold text-white">POWER QUERY GUIDE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium transition-colors text-gray-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Dropdown */}
          <div className="md:hidden relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 flex items-center space-x-1"
              onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}
            >
              <span className="text-sm font-medium">Menu</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isTopMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {/* Mobile Dropdown Menu */}
            {isTopMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    onClick={() => setIsTopMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Overlay */}
      {isTopMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsTopMenuOpen(false)}
        />
      )}
    </header>
  );
}
