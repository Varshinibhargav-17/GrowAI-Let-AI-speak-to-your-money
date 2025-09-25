import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mt-20 mb-20 text-center">
      {/* Tag pill */}
      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1 text-sm font-medium text-green-700 ring-1 ring-green-200">
          <span className="text-green-600">•</span>
          FINCOACH
          <span className="text-neutral-600"> Smarter Money Management</span>
        </span>
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-neutral-900">
        Take Full Control Of Your Finances With FinCoach
      </h1>

      {/* Subheadline */}
      <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600">
        Smart,secure and scalable financial Management built for modern individuals and businesses
      </p>

      {/* CTA */}
      <div className="mt-8">
        <Link
          href="/auth"
          className="inline-flex items-center rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-green-700 transition"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}

