// SmartNudgeCenter.tsx - Enhanced
"use client";

import { useState, useEffect } from "react";
import { Lightbulb, RefreshCcw } from "lucide-react";
import NudgeCard from "@/components/NudgeCard";
import NudgeCategoryTabs from "@/components/NudgeCategoryTabs";
import { FinancialDataGenerator } from "@/lib/data-templates/generators/data-generator";

export default function SmartNudgeCenter() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [financialData, setFinancialData] = useState<any>(null);
  const [taxData, setTaxData] = useState<any>(null);

  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        // First try to fetch existing financial data from database
        const profileRes = await fetch('/api/profile');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.financialData) {
            setFinancialData(profileData.financialData);
          } else {
            // If no stored data, generate new data based on user profile
            const profileType = profileData?.financialProfileType || 'young_professional';
            const selectedBanks = profileData?.selectedBanks || ['HDFC', 'ICICI'];

            const generatedData = FinancialDataGenerator.generateFinancialData(profileType, selectedBanks);
            setFinancialData(generatedData);

            // Store the generated data in database
            await fetch('/api/profile', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ financialData: generatedData }),
            });
          }
        } else {
          // Fallback to default data if profile fetch fails
          const generatedData = FinancialDataGenerator.generateFinancialData('young_professional', ['HDFC', 'ICICI']);
          setFinancialData(generatedData);
        }
      } catch (error) {
        console.error('Error loading financial data:', error);
        // Fallback to default data
        const generatedData = FinancialDataGenerator.generateFinancialData('young_professional', ['HDFC', 'ICICI']);
        setFinancialData(generatedData);
      }
    };

    loadFinancialData();
  }, []);

  useEffect(() => {
    // Calculate tax data using the financial data
    if (financialData) {
      const income = financialData.income.monthly * 12;

      let taxPayable = 0;
      let slabs = [];

      if (income <= 300000) {
        slabs = [{ slab: "0 - 3L", rate: 0, tax: 0 }];
        taxPayable = 0;
      } else if (income <= 600000) {
        const taxable = income - 300000;
        taxPayable = taxable * 0.05;
        slabs = [
          { slab: "0 - 3L", rate: 0, tax: 0 },
          { slab: "3L - 6L", rate: 0.05, tax: taxPayable }
        ];
      } else if (income <= 900000) {
        taxPayable = 15000 + (income - 600000) * 0.1;
        slabs = [
          { slab: "0 - 3L", rate: 0, tax: 0 },
          { slab: "3L - 6L", rate: 0.05, tax: 15000 },
          { slab: "6L - 9L", rate: 0.10, tax: (income - 600000) * 0.1 }
        ];
      } else if (income <= 1200000) {
        taxPayable = 45000 + (income - 900000) * 0.15;
        slabs = [
          { slab: "0 - 3L", rate: 0, tax: 0 },
          { slab: "3L - 6L", rate: 0.05, tax: 15000 },
          { slab: "6L - 9L", rate: 0.10, tax: 30000 },
          { slab: "9L - 12L", rate: 0.15, tax: (income - 900000) * 0.15 }
        ];
      } else {
        taxPayable = 90000 + (income - 1200000) * 0.2;
        slabs = [
          { slab: "0 - 3L", rate: 0, tax: 0 },
          { slab: "3L - 6L", rate: 0.05, tax: 15000 },
          { slab: "6L - 9L", rate: 0.10, tax: 30000 },
          { slab: "9L - 12L", rate: 0.15, tax: 45000 },
          { slab: "12L+", rate: 0.20, tax: (income - 1200000) * 0.2 }
        ];
      }

      const taxData = {
        totalIncome: income,
        deductibleExpenses: Math.floor(income * 0.1),
        taxSlabs: slabs,
        totalTax: Math.round(taxPayable),
        quarterlyTax: Math.round(taxPayable / 4),
      };
      setTaxData(taxData);
    }
  }, [financialData]);

  const generateRuleBasedNudges = (userData: any) => {
    const nudges = [];
    const monthlyIncome = userData.income?.monthly || 0;
    const monthlyExpenses = Object.values(userData.expenses || {}).reduce((sum: number, val: any) => sum + (typeof val === 'number' ? val : 0), 0);
    const savingsRate = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0;
    const emergencyFund = userData.savings?.emergency || 0;
    const investments = userData.investments?.total || 0;
    const creditCardUtilization = userData.debt?.creditCard?.utilization || 0;
    const diningExpense = userData.expenses?.dining || 0;

    if (savingsRate < 0.2) {
      nudges.push({
        id: 1,
        title: "Increase Savings Rate",
        category: "Savings",
        description: `💡 Your savings rate is ${(savingsRate * 100).toFixed(0)}%. Aim for 20% to build wealth faster. Review discretionary spending.`,
        icon: "💰",
        color: "blue",
      });
    }

    if (emergencyFund < 3 * monthlyExpenses) {
      nudges.push({
        id: 2,
        title: "Build Emergency Fund",
        category: "Savings",
        description: `💰 Emergency fund covers ${(emergencyFund / monthlyExpenses).toFixed(1)} months. Target 3-6 months for security.`,
        icon: "🛡️",
        color: "green",
      });
    }

    if (creditCardUtilization > 0.3) {
      nudges.push({
        id: 3,
        title: "Optimize Credit Usage",
        category: "Debt",
        description: `🎯 Credit card usage at ${(creditCardUtilization * 100).toFixed(0)}%. Keep under 30% for better score.`,
        icon: "💳",
        color: "orange",
      });
    }

    if (investments < monthlyIncome * 6) {
      nudges.push({
        id: 4,
        title: "Grow Investments",
        category: "Investments",
        description: `📈 Investments are ${(investments / monthlyIncome).toFixed(1)}x monthly income. Target 6-12x for growth.`,
        icon: "📈",
        color: "green",
      });
    }

    if (diningExpense > monthlyIncome * 0.1) {
      nudges.push({
        id: 5,
        title: "Optimize Dining Expenses",
        category: "Spending",
        description: `🍔 Dining: ₹${diningExpense.toLocaleString()}/month. Cook 2 more meals/week to save ₹${Math.round(diningExpense * 0.25).toLocaleString()}.`,
        icon: "🍽️",
        color: "orange",
      });
    }

    if (taxData?.quarterlyTax > 0) {
      nudges.push({
        id: 6,
        title: "Quarterly Tax Payment Due",
        category: "Tax",
        description: `📋 Estimated tax: ₹${taxData.quarterlyTax.toLocaleString()}. Pay before 15th Dec to avoid interest.`,
        icon: "📋",
        color: "purple",
      });
    }

    return nudges;
  };

  const nudges = (() => {
    if (financialData) {
      return generateRuleBasedNudges(financialData);
    } else {
      return [
        {
          id: 1,
          title: "Loading personalized insights...",
          category: "Savings",
          description: "Analyzing your financial data to provide tailored recommendations.",
          icon: "⏳",
          color: "blue",
        },
      ];
    }
  })();

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