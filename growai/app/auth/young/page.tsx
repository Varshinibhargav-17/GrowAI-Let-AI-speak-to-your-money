// YoungProfessionalPage.tsx - Enhanced UI
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Briefcase, Target, TrendingUp, ArrowLeft } from "lucide-react";

type FormState = {
  incomePattern: string;
  incomeNotes: string;
  debtType: string;
  debtAmountRange: string;
  debtEmiRange: string;
  debtDuration: string;
  financialFocus: string;
  financialTarget: string;
  financialCurrently: string;
  careerStage: string;
  experienceYears: string;
  investingNotes: string;
};

const DEFAULT_STATE: FormState = {
  incomePattern: "",
  incomeNotes: "",
  debtType: "",
  debtAmountRange: "",
  debtEmiRange: "",
  debtDuration: "",
  financialFocus: "",
  financialTarget: "",
  financialCurrently: "",
  careerStage: "",
  experienceYears: "",
  investingNotes: "",
};

export default function YoungProfessionalPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    // (Optional) You can fetch existing profile to prefill; skip if not required
  }, []);

  const updateField = (k: keyof FormState, v: string) => {
    setForm((s) => ({ ...s, [k]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSaving(true);

    try {
      const payload = {
        financialProfileType: "young_professional",
        incomePattern: form.incomePattern,
        incomeNotes: form.incomeNotes,
        debt: {
          type: form.debtType,
          amountRange: form.debtAmountRange,
          emiRange: form.debtEmiRange,
          remaining: form.debtDuration,
        },
        financialFocus: {
          focus: form.financialFocus,
          target: form.financialTarget,
          currently: form.financialCurrently,
        },
        career: {
          stage: form.careerStage,
          experience: form.experienceYears,
          investingNotes: form.investingNotes,
        },
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || data?.message || "Failed to save profile");
      }

      setSuccessMsg("Profile saved. Redirecting to simulation...");
      setTimeout(() => {
        router.push("/auth/mcp");
      }, 900);
    } catch (error: unknown) {
      console.error("Save error:", error);
      const errorMessage = error instanceof Error ? error.message : "Error saving profile";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 py-12 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
            <User className="w-4 h-4 text-green-600" />
            YOUNG PROFESSIONAL
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-3">
            Profile Details
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out a few details so we can generate a realistic financial profile for AI analysis
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200 shadow-2xl p-8 md:p-10 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Income Pattern */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Income Pattern</label>
              </div>
              <select
                value={form.incomePattern}
                onChange={(e) => updateField("incomePattern", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option value="">Select income pattern</option>
                <option value="Stable Salary (₹50,000 - ₹1,00,000 monthly)">Stable Salary (₹50,000 - ₹1,00,000 monthly)</option>
                <option value="Variable Income (₹30,000 - ₹1,50,000 monthly)">Variable Income (₹30,000 - ₹1,50,000 monthly)</option>
                <option value="Freelance/Gig Work (₹20,000 - ₹80,000 monthly)">Freelance/Gig Work (₹20,000 - ₹80,000 monthly)</option>
                <option value="Entry-level (₹25,000 - ₹50,000 monthly)">Entry-level (₹25,000 - ₹50,000 monthly)</option>
              </select>
              <textarea
                value={form.incomeNotes}
                onChange={(e) => updateField("incomeNotes", e.target.value)}
                rows={3}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., I work in tech, salary credited on 1st, bonuses quarterly"
              />
            </section>

            {/* Debt Situation */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <label className="text-lg font-bold text-gray-900">Debt Situation</label>
              </div>
              <select
                value={form.debtType}
                onChange={(e) => updateField("debtType", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option>Education Loan</option>
                <option>Personal Loan</option>
                <option>No Outstanding Loan</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <input
                  value={form.debtAmountRange}
                  onChange={(e) => updateField("debtAmountRange", e.target.value)}
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Loan amount range"
                />
                <input
                  value={form.debtEmiRange}
                  onChange={(e) => updateField("debtEmiRange", e.target.value)}
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="EMI range"
                />
                <input
                  value={form.debtDuration}
                  onChange={(e) => updateField("debtDuration", e.target.value)}
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Remaining period"
                />
              </div>
            </section>

            {/* Financial Focus */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Financial Focus</label>
              </div>
              <select
                value={form.financialFocus}
                onChange={(e) => updateField("financialFocus", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option>Building Emergency Fund</option>
                <option>Debt Repayment</option>
                <option>Investment Growth</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <input
                  value={form.financialTarget}
                  onChange={(e) => updateField("financialTarget", e.target.value)}
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Target (e.g., 6 months of expenses)"
                />
                <input
                  value={form.financialCurrently}
                  onChange={(e) => updateField("financialCurrently", e.target.value)}
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Currently covered"
                />
              </div>
            </section>

            {/* Career Stage */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Career Stage</label>
              </div>
              <select
                value={form.careerStage}
                onChange={(e) => updateField("careerStage", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option>Early Career Freelancer/Gig Worker</option>
                <option>Mid Career</option>
                <option>Senior / Established</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <input
                  value={form.experienceYears}
                  onChange={(e) => updateField("experienceYears", e.target.value)}
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Years of experience (e.g., 2-5 years)"
                />
                <input
                  value={form.investingNotes}
                  onChange={(e) => updateField("investingNotes", e.target.value)}
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Investing & skill upgrade notes"
                />
              </div>
            </section>

            {/* Info Note */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-blue-900">Note</p>
                <p className="text-sm text-blue-700">Based on your selection, we&apos;ll generate a realistic financial profile for AI analysis.</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-green-700">{successMsg}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-end pt-6 border-t-2 border-green-100">
              <button
                type="button"
                onClick={() => router.push("/auth/mcp")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all font-semibold text-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="submit"
                disabled={saving}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
                  saving 
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl hover:scale-105"
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

