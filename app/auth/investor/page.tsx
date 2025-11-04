"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  incomePattern: string;
  incomeNotes: string;
  debtType: string;
  debtDetails: string;
  financialFocus: string;
  investmentDetails: string;
  careerStage: string;
  experience: string;
  businessDetails: string;
};

export default function EstablishedInvestorPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    incomePattern: "",
    incomeNotes: "",
    debtType: "",
    debtDetails: "",
    financialFocus: "",
    investmentDetails: "",
    careerStage: "",
    experience: "",
    businessDetails: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        financialProfileType: "established_investor",
        income: {
          pattern: form.incomePattern,
          notes: form.incomeNotes,
        },
        debt: {
          type: form.debtType,
          details: form.debtDetails,
        },
        financialFocus: {
          focus: form.financialFocus,
          investments: form.investmentDetails,
        },
        career: {
          stage: form.careerStage,
          experience: form.experience,
          business: form.businessDetails,
        },
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      setSuccess("Profile saved successfully!");
      setTimeout(() => router.push("/auth/mcp"), 1000);
    } catch (err: any) {
      setError(err.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Established Investor — Profile details
        </h1>
        <p className="text-gray-600 mb-6">
          Fill out the details to generate a realistic financial profile for AI analysis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Income Pattern */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income Pattern
            </label>
            <select
              value={form.incomePattern}
              onChange={(e) => updateField("incomePattern", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select income pattern</option>
              <option>₹80,000 - ₹2,00,000 monthly (stable)</option>
              <option>₹2,00,000+ monthly (high income)</option>
              <option>Variable: ₹1,00,000 - ₹5,00,000 monthly</option>
            </select>
            <textarea
              value={form.incomeNotes}
              onChange={(e) => updateField("incomeNotes", e.target.value)}
              placeholder="e.g., ₹80,000 - ₹2,00,000 monthly (stable)"
              rows={3}
              className="w-full border rounded-lg px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
          </section>

          {/* Debt Situation */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Debt Situation
            </label>
            <select
              value={form.debtType}
              onChange={(e) => updateField("debtType", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select debt type</option>
              <option>Home Loan</option>
              <option>Business Loan</option>
              <option>Home Loan + Business Loan</option>
              <option>No Outstanding Debt</option>
            </select>
            <textarea
              value={form.debtDetails}
              onChange={(e) => updateField("debtDetails", e.target.value)}
              placeholder="e.g., Home loan of ₹50L at 7% interest, 15 years remaining"
              rows={3}
              className="w-full border rounded-lg px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
          </section>

          {/* Financial Focus */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Financial Focus
            </label>
            <select
              value={form.financialFocus}
              onChange={(e) => updateField("financialFocus", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select financial focus</option>
              <option>Diversified Investments</option>
              <option>Debt Reduction</option>
              <option>Retirement Planning</option>
              <option>Business Expansion</option>
            </select>
            <textarea
              value={form.investmentDetails}
              onChange={(e) => updateField("investmentDetails", e.target.value)}
              placeholder="e.g., ₹10L in mutual funds, ₹5L in stocks, ₹3L in FD"
              rows={3}
              className="w-full border rounded-lg px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
          </section>

          {/* Career Stage */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Career Stage
            </label>
            <select
              value={form.careerStage}
              onChange={(e) => updateField("careerStage", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select career stage</option>
              <option>Experienced Consultant</option>
              <option>Business Owner</option>
              <option>Corporate Executive</option>
              <option>Freelance Professional</option>
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input
                value={form.experience}
                onChange={(e) => updateField("experience", e.target.value)}
                placeholder="e.g., 8–15 years experience"
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              />
              <input
                value={form.businessDetails}
                onChange={(e) => updateField("businessDetails", e.target.value)}
                placeholder="e.g., 1–2 team members, business valued ₹20–50L"
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              />
            </div>
          </section>

          {/* Note */}
          <div className="text-sm text-gray-600">
            <strong>Note:</strong> Based on your selection, we'll generate a realistic financial profile for AI
            analysis.
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/auth/mcp")}
              className="px-4 py-2 border border-gray-300 rounded-lg"
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

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </div>
    </main>
  );
}
