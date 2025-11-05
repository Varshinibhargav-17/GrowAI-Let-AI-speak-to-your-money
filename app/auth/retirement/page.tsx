// RetirementProfilePage.tsx - Enhanced UI
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TreeDeciduous, TrendingUp, Target, Shield, ArrowLeft, Briefcase } from "lucide-react";

type FormState = {
  incomePattern: string;
  incomeNotes: string;
  debtType: string;
  debtDetails: string;
  financialFocus: string;
  investmentDetails: string;
  careerStage: string;
  experience: string;
  successionPlans: string;
};

export default function RetirementProfilePage() {
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
    successionPlans: "",
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
        financialProfileType: "retirement_focused",
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
          successionPlans: form.successionPlans,
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
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
            <TreeDeciduous className="w-4 h-4 text-green-600" />
            RETIREMENT FOCUSED
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-3">
            Retirement Profile
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the details to generate a realistic financial profile for AI analysis
          </p>
        </div>

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
                <option>Business Revenue Based</option>
                <option>Pension + Investments</option>
                <option>Rental Income</option>
                <option>Mixed Sources</option>
              </select>
              <textarea
                value={form.incomeNotes}
                onChange={(e) => updateField("incomeNotes", e.target.value)}
                placeholder="e.g., Monthly pension of ₹50,000, rental income from 2 properties"
                rows={3}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
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
                <option value="">Select financial focus</option>
                <option>Wealth Preservation</option>
                <option>Exit Planning</option>
                <option>Estate Planning</option>
                <option>Income Generation</option>
              </select>
              <textarea
                value={form.investmentDetails}
                onChange={(e) => updateField("investmentDetails", e.target.value)}
                placeholder="e.g., ₹2Cr in mutual funds, ₹1Cr in stocks, ₹50L in FDs"
                rows={3}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </section>

            {/* Debt Situation */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Debt Situation</label>
              </div>
              <select
                value={form.debtType}
                onChange={(e) => updateField("debtType", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option value="">Select debt type</option>
                <option>Minimal Business Debt</option>
                <option>Home Loan</option>
                <option>No Outstanding Debt</option>
                <option>Business Expansion Loans</option>
              </select>
              <textarea
                value={form.debtDetails}
                onChange={(e) => updateField("debtDetails", e.target.value)}
                placeholder="e.g., Home loan of ₹20L remaining, EMI ₹15,000/month"
                rows={3}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </section>

            {/* Career Stage */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <TreeDeciduous className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Career Stage</label>
              </div>
              <select
                value={form.careerStage}
                onChange={(e) => updateField("careerStage", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option value="">Select career stage</option>
                <option>Mature Business Owner</option>
                <option>Retired Professional</option>
                <option>Pre-Retirement</option>
                <option>Legacy Builder</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <input
                  value={form.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  placeholder="e.g., 15–25+ years in business"
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                <input
                  value={form.successionPlans}
                  onChange={(e) => updateField("successionPlans", e.target.value)}
                  placeholder="e.g., Planning reduced involvement, legacy, succession"
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
                <p className="text-sm text-blue-700">Based on your selection, we'll generate a realistic financial profile for AI analysis.</p>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-green-700">{success}</p>
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
                {saving ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
