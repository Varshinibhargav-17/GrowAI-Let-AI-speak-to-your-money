 // page.tsx - Enhanced Homepage
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-green-50 via-white to-green-50/50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Tag pill with enhanced styling */}
        <div className="mb-8 flex justify-center animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            GROWAI
            <span className="text-neutral-600 font-medium">Smarter Money Management</span>
          </span>
        </div>

        {/* Enhanced Headline with gradient */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-green-900 bg-clip-text text-transparent animate-slide-up px-4">
          Take Full Control Of Your Finances With{" "}
          <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            GrowAI
          </span>
        </h1>

        {/* Enhanced Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed animate-fade-in-delay px-4">
          Smart, secure and scalable financial management built specifically for freelancers, gig workers, consultants, and small business owners.
          Powered by AI, designed for growth.
        </p>

        {/* Enhanced CTA with icon */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2 px-4">
          <Link
            href="/auth/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 hover:scale-105 transition-all duration-300"
          >
            Get Started Free
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-green-700 shadow-md hover:shadow-lg border-2 border-green-200 hover:border-green-300 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-500 animate-fade-in-delay-3 px-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">AI-Powered Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Bank-Level Security</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-medium">Trusted by 10,000+ Users</span>
          </div>
        </div>
      </div>
    </section>
  );
}
