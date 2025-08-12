import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-ms-gray-light border-t border-ms-gray-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-ms-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">PQ</span>
              </div>
              <span className="text-lg font-semibold text-ms-gray">Power Query Guide</span>
            </div>
            <p className="text-sm text-ms-gray-secondary mb-4">
              The definitive reference for Power Query functions and expressions.
            </p>
            <p className="text-xs text-ms-gray-secondary">
              Last site update: Dec 15, 2024
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-ms-gray mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/functions" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Functions</Link></li>
              <li><Link href="/operators" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Operators</Link></li>
              <li><Link href="/statements" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Statements</Link></li>
              <li><Link href="/datatypes" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Data Types</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-ms-gray mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="/changelog" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Updates</Link></li>
              <li><Link href="/contribute" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Contribute</Link></li>
              <li><Link href="/privacy" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Privacy Policy</Link></li>
              <li><a href="mailto:info@powerqueryguide.com" className="text-sm text-ms-gray-secondary hover:text-ms-blue">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-ms-gray-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-ms-gray-secondary">
            2024 © Power Query Guide. All rights reserved. Information coming from Microsoft documentation is property of Microsoft Corp.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <div className="flex items-center space-x-4 opacity-60">
              <span className="text-xs text-ms-gray-secondary">Inspired by</span>
              <a 
                href="https://www.sqlbi.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-6 bg-ms-gray-secondary opacity-30 rounded flex items-center justify-center hover:opacity-50 transition-opacity"
              >
                <span className="text-xs text-white">SQLBI</span>
              </a>
              <div className="w-16 h-6 bg-ms-blue opacity-30 rounded flex items-center justify-center">
                <span className="text-xs text-white">Power BI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
