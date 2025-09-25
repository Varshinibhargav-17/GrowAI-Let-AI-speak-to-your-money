export default function About() {
  return (
    <main className="min-h-screen bg-white py-16 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-600 mb-4 tracking-tight">
            About FinCoach
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Smarter money management for freelancers, gig workers, consultants, 
            and small business owners. With FinCoach, your finances become simple, 
            actionable, and stress-free.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-semibold text-green-600 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At FinCoach, we believe that financial clarity should be accessible 
              to everyone. Our mission is to empower individuals with AI-driven 
              tools that simplify tax planning, track expenses, and project future 
              income — giving you confidence to focus on what you do best.
            </p>
          </div>
          <div className="hidden md:block">
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="text-3xl font-semibold text-center text-green-600 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl border border-green-200 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Clarity</h3>
              <p className="text-gray-700">
                Complex money matters should be made simple. We cut through the 
                noise so you can focus on what matters.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-green-200 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Trust</h3>
              <p className="text-gray-700">
                Your privacy and security are our top priorities — every feature 
                is built with your data protection in mind.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-green-200 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Empowerment</h3>
              <p className="text-gray-700">
                With AI-powered insights, we give you tools to take control and make 
                smarter financial decisions with ease.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-6">
            Ready to Smarten Your Money?
          </h2>
          <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-semibold shadow-md transition">
            Get Started
          </button>
        </section>
      </div>
    </main>
  );
}
