import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Smarter Money Management
      </h2>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        Take Full Control Of Your Finances With FinCoach – your AI-powered financial assistant for freelancers, gig workers, consultants, and small business owners.
      </p>
      <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Get Started Free
      </button>
    </section>
  );
}
