// About.tsx - Enhanced
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 py-20 px-6 text-gray-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with gradient badge */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            ABOUT US
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent mb-6 tracking-tight">
            About GrowAI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            GrowAI is designed specifically for freelancers, gig workers, consultants,
            and small business owners. With GrowAI, your finances become simple,
            actionable, and stress-free.
          </p>
        </section>

        {/* Mission Section with icon */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-28 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              At GrowAI, we believe that financial clarity should be accessible
              to everyone. Our mission is to empower individuals with AI-driven
              tools that simplify tax planning, track expenses, and project future
              income — giving you confidence to focus on what you do best.
            </p>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-200 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>
        </section>

        {/* Values with enhanced cards */}
        <section className="mb-28 animate-fade-in-delay">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-4">
            Our Core Values
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            The principles that guide everything we build and every decision we make
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-2xl hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Clarity</h3>
              <p className="text-gray-700 leading-relaxed">
                Complex money matters should be made simple. We cut through the
                noise so you can focus on what matters.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-2xl hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Trust</h3>
              <p className="text-gray-700 leading-relaxed">
                Your privacy and security are our top priorities — every feature
                is built with your data protection in mind.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-2xl hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Empowerment</h3>
              <p className="text-gray-700 leading-relaxed">
                With AI-powered insights, we give you tools to take control and make
                smarter financial decisions with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced CTA */}
        <section className="text-center bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-12 shadow-2xl animate-fade-in-delay-2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Smarten Your Money?
          </h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of self-employed professionals who trust GrowAI
          </p>
          <a 
            href="/auth/signup" 
            className="inline-flex items-center gap-2 bg-white text-green-700 px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </section>
      </div>
    </main>
  );
}