"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Young Professional details page
 * - Presents selectable options / inputs for Income Pattern, Debt, Focus, Career Stage
 * - Sends a PUT to /api/profile to store the structured mock profile data
 * - Redirects back to /auth/mcp after successful save
 */

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
    // fetch("/api/profile").then(...)
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
      // We will store this structured info under profile keys.
      // Adapt keys on backend if you prefer a different schema.
      const payload = {
        // basic summary
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
      // small timeout so user sees success
      setTimeout(() => {
        router.push("/auth/mcp");
      }, 900);
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err?.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-green-600 mb-2">Young Professional — Profile details</h1>
        <p className="text-gray-600 mb-6">
          Fill out a few details so we can generate a realistic financial profile for AI analysis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Income Pattern */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Income Pattern</label>
            <select
              value={form.incomePattern}
              onChange={(e) => updateField("incomePattern", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
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
              className="w-full border rounded-lg px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500"
              placeholder="e.g., I work in tech, salary credited on 1st, bonuses quarterly"
            />
          </section>

          {/* Debt Situation */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Debt Situation</label>
            <select
              value={form.debtType}
              onChange={(e) => updateField("debtType", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option>Education Loan</option>
              <option>Personal Loan</option>
              <option>No Outstanding Loan</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <input
                value={form.debtAmountRange}
                onChange={(e) => updateField("debtAmountRange", e.target.value)}
                className="border rounded-lg px-3 py-2"
                placeholder="Loan amount range"
              />
              <input
                value={form.debtEmiRange}
                onChange={(e) => updateField("debtEmiRange", e.target.value)}
                className="border rounded-lg px-3 py-2"
                placeholder="EMI range"
              />
              <input
                value={form.debtDuration}
                onChange={(e) => updateField("debtDuration", e.target.value)}
                className="border rounded-lg px-3 py-2"
                placeholder="Remaining period"
              />
            </div>
          </section>

          {/* Financial Focus */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Financial Focus</label>
            <select
              value={form.financialFocus}
              onChange={(e) => updateField("financialFocus", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option>Building Emergency Fund</option>
              <option>Debt Repayment</option>
              <option>Investment Growth</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input
                value={form.financialTarget}
                onChange={(e) => updateField("financialTarget", e.target.value)}
                className="border rounded-lg px-3 py-2"
                placeholder="Target (e.g., 6 months of expenses)"
              />
              <input
                value={form.financialCurrently}
                onChange={(e) => updateField("financialCurrently", e.target.value)}
                className="border rounded-lg px-3 py-2"
                placeholder="Currently covered"
              />
            </div>
          </section>

          {/* Career Stage */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Career Stage</label>
            <select
              value={form.careerStage}
              onChange={(e) => updateField("careerStage", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option>Early Career Freelancer/Gig Worker</option>
              <option>Mid Career</option>
              <option>Senior / Established</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input
                value={form.experienceYears}
                onChange={(e) => updateField("experienceYears", e.target.value)}
                className="border rounded-lg px-3 py-2"
                placeholder="Years of experience (e.g., 2-5 years)"
              />
              <input
                value={form.investingNotes}
                onChange={(e) => updateField("investingNotes", e.target.value)}
                className="border rounded-lg px-3 py-2"
                placeholder="Investing & skill upgrade notes"
              />
            </div>
          </section>

          {/* small note */}
          <div className="text-sm text-gray-600">
            <strong>Note:</strong> Based on your selection, we'll generate a realistic financial profile for AI analysis.
          </div>

          {/* actions */}
          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.push("/auth/mcp")}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 rounded-lg font-medium shadow ${
                saving ? "bg-gray-300 text-gray-600" : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
