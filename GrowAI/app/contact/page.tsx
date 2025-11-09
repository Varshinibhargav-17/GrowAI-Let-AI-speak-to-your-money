// Contact.tsx - Enhanced
export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 py-20 px-6 text-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with badge */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-6">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            GET IN TOUCH
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Whether you have questions, feedback, or partnership opportunities,
            reach out to the GrowAI team and we&apos;ll get back to you soon.
          </p>
        </section>

        {/* Contact Form + Info Grid */}
        <section className="grid md:grid-cols-2 gap-12 items-start animate-slide-up">
          {/* Enhanced Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-700">Send a Message</h2>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-2 border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
                  suppressHydrationWarning
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border-2 border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
                  suppressHydrationWarning
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full border-2 border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all resize-none"
                  suppressHydrationWarning
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300 hover:scale-[1.02]"
                suppressHydrationWarning
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6 animate-fade-in-delay">
            {/* Intro Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-3xl shadow-xl text-white">
              <h2 className="text-2xl font-bold mb-4">
                Get in Touch
              </h2>
              <p className="leading-relaxed text-green-50">
                Our team is here to answer your questions and help you get started with GrowAI.
                You can also connect with us through email or social media.
              </p>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800">Contact Details</h3>
              </div>
              
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <span className="font-semibold block">Office:</span>
                    <span>Bengaluru, India</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <span className="font-semibold block">Email:</span>
                    <a href="mailto:support@growai.com" className="text-green-700 hover:text-green-800 hover:underline font-medium">
                      support@growai.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <span className="font-semibold block">Phone:</span>
                    <span>+91 98765 43210</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media Card */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800">Follow Us</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 border border-green-200">
                  LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 border border-green-200">
                  Twitter
                </a>
                <a href="#" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 border border-green-200">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}