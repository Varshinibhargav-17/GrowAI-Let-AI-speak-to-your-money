// SmartNudgeCenter.tsx - Enhanced
"use client";

import { useState } from "react";
import { Lightbulb, RefreshCcw } from "lucide-react";
import NudgeCard from "@/components/NudgeCard";
import NudgeCategoryTabs from "@/components/NudgeCategoryTabs";

export default function SmartNudgeCenter() {
  const [activeCategory, setActiveCategory] = useState("All");

  const nudges = [
    {
      id: 1,
      title: "Increase your SIP by ₹1,000",
      category: "Investments",
      description:
        "You've been consistent with ₹5,000/month SIP. Increasing it by ₹1,000 can grow your corpus by ₹3L in 10 years.",
      icon: "📈",
      color: "green",
    },
    {
      id: 2,
      title: "High Dining Expenses Detected",
      category: "Spending",
      description:
        "Your food and dining spend rose 18% this month. Consider using meal plans or reward cards to optimize spending.",
      icon: "🍽️",
      color: "orange",
    },
    {
      id: 3,
      title: "Emergency Fund at 60% Target",
      category: "Savings",
      description:
        "You've saved ₹60,000 out of ₹1L target. Keep ₹10,000/month aside for the next 4 months to complete it.",
      icon: "💰",
      color: "blue",
    },
    {
      id: 4,
      title: "Quarterly Tax Payment Due Soon",
      category: "Tax",
      description:
        "Your estimated tax for this quarter is ₹15,000. Paying before 15th Dec will help you avoid late payment interest.",
      icon: "📋",
      color: "purple",
    },
  ];

  const filteredNudges =
    activeCategory === "All"
      ? nudges
      : nudges.filter((n) => n.category === activeCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 px-4 md:px-6 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
              <Lightbulb className="w-4 h-4 text-green-600" />
              SMART INSIGHTS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent mb-3">
              Smart Nudge Center
            </h1>
            <p className="text-gray-600 text-lg">
              AI-powered recommendations to optimize your financial health
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border-2 border-green-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {filteredNudges.length} Active Nudges
                </p>
                <p className="text-sm text-gray-500">Updated just now</p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all hover:scale-105"
            >
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 animate-slide-up">
          <NudgeCategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Nudge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-delay">
          {filteredNudges.map((nudge, index) => (
            <div
              key={nudge.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <NudgeCard nudge={nudge} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNudges.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              No nudges available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No insights for this category right now. Check back later or explore other categories!
            </p>
          </div>
        )}

        {/* Info Footer */}
        {filteredNudges.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-center shadow-xl animate-fade-in-delay-2">
            <h3 className="text-2xl font-bold text-white mb-2">
              💡 Want more personalized insights?
            </h3>
            <p className="text-green-50 mb-6 max-w-2xl mx-auto">
              Connect your accounts to get AI-powered recommendations tailored specifically to your financial situation
            </p>
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Connect Accounts
            </button>
          </div>
        )}
      </div>
    </main>
  );
}