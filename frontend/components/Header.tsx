import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Left - Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          FinCoach
        </Link>

        {/* Middle - Nav Links */}
        <ul className="flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-green-500 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-green-500 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-green-500 transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right - Auth Button */}
        <Link
          href="/auth/signup"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow transition-colors"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
