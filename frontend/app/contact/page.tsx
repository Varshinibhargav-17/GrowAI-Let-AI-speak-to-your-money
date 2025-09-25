export default function Contact() {
  return (
    <main className="min-h-screen bg-white py-16 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-600 mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you. Whether you have questions, feedback, or partnership opportunities, 
            reach out to the FinCoach team and we’ll get back to you soon.
          </p>
        </section>

        {/* Contact Form + Info */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">Send a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  suppressHydrationWarning
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
                suppressHydrationWarning
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our team is here to answer your questions and help you get started with FinCoach. 
                You can also connect with us through email or social media.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md">
              <h3 className="text-lg font-semibold text-green-700 mb-3">Contact Details</h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  📍 <span className="font-medium">Office:</span> Bengaluru, India
                </li>
                <li>
                  ✉️ <span className="font-medium">Email:</span>{" "}
                  <a href="mailto:support@fincoach.com" className="text-green-600 hover:underline">
                    support@fincoach.com
                  </a>
                </li>
                <li>
                  📞 <span className="font-medium">Phone:</span> +91 98765 43210
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md">
              <h3 className="text-lg font-semibold text-green-700 mb-3">Follow Us</h3>
              <div className="flex space-x-5">
                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                  LinkedIn
                </a>
                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                  Twitter
                </a>
                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
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
