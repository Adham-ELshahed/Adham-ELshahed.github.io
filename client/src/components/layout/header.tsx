import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white border-b border-ms-gray-border fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-ms-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">PQ</span>
              </div>
              <span className="text-xl font-semibold text-ms-gray">POWER QUERY GUIDE</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/functions" className="text-ms-blue hover:text-ms-blue-hover font-medium">
              Functions
            </Link>
            <Link href="/blog" className="text-ms-gray-secondary hover:text-ms-gray font-medium">
              Blog
            </Link>
            <Link href="/operators" className="text-ms-gray-secondary hover:text-ms-gray font-medium">
              Operators
            </Link>
            <Link href="/statements" className="text-ms-gray-secondary hover:text-ms-gray font-medium">
              Statements
            </Link>
            <Link href="/datatypes" className="text-ms-gray-secondary hover:text-ms-gray font-medium">
              Data Types
            </Link>
            <Link href="/changelog" className="text-ms-gray-secondary hover:text-ms-gray font-medium">
              Updates
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
