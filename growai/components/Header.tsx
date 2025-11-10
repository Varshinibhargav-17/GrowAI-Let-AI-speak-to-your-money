// Header.tsx - Enhanced
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 w-full max-w-7xl mx-auto">
        {/* Left - Logo with gradient */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            GrowAI
          </span>
        </Link>

        {/* Middle - Nav Links with hover effects */}
        <ul className="hidden md:flex space-x-1 text-gray-700 font-medium">
          <li>
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="px-4 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right - Enhanced Auth Button */}
        <Link
          href="/auth/signup"
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2.5 rounded-full font-semibold shadow-md shadow-green-600/30 hover:shadow-lg hover:shadow-green-600/40 transition-all duration-300 hover:scale-105"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
