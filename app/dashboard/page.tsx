"use client";
import { useState, useEffect } from "react";
import { Calculator, MessageCircle, User, Lightbulb, LogOut, RefreshCcw, Mail, Calendar, Settings, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import CashflowChart from "@/components/CashflowChart";
import ExpenseChart from "@/components/ExpenseChart";
import DashboardCard from "@/components/DashboardCard";
import TaxSummaryCard from "@/components/TaxSummaryCard";
import TaxBreakdownChart from "@/components/TaxBreakdownChart";
import NudgeCard from "@/components/NudgeCard";
import NudgeCategoryTabs from "@/components/NudgeCategoryTabs";

export default function DashboardPage() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [taxData, setTaxData] = useState<any>(null);
  const [activeNudgeCategory, setActiveNudgeCategory] = useState("All");
  const { data: session } = useSession();
  const router = useRouter();

  // Chat functionality
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const newMessages = [...chatMessages, { sender: "user", text: chatInput }];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });

      const data = await res.json();
      const botReply = data.reply || "No response.";
      setChatMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (err) {
      setChatMessages([...newMessages, { sender: "bot", text: "Error connecting to GrowAI." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Tax data initialization with real data from localStorage
  useEffect(() => {
    const loadFinancialData = () => {
      const storedData = localStorage.getItem('financialData');
      if (storedData) {
        const financialData = JSON.parse(storedData);
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
      } else {
        const mockData = {
          totalIncome: 720000,
          deductibleExpenses: 120000,
          taxSlabs: [
            { slab: "0 - 3L", rate: 0, tax: 0 },
            { slab: "3L - 6L", rate: 0.05, tax: 15000 },
            { slab: "6L - 9L", rate: 0.10, tax: 30000 },
            { slab: "9L+", rate: 0.15, tax: 15000 },
          ],
          totalTax: 60000,
          quarterlyTax: 15000,
        };
        setTaxData(mockData);
      }
    };

    loadFinancialData();
  }, []);

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
      });
    }

    if (emergencyFund < 3 * monthlyExpenses) {
      nudges.push({
        id: 2,
        title: "Build Emergency Fund",
        category: "Savings",
        description: `💰 Emergency fund covers ${(emergencyFund / monthlyExpenses).toFixed(1)} months. Target 3-6 months for security.`,
      });
    }

    if (creditCardUtilization > 0.3) {
      nudges.push({
        id: 3,
        title: "Optimize Credit Usage",
        category: "Debt",
        description: `🎯 Credit card usage at ${(creditCardUtilization * 100).toFixed(0)}%. Keep under 30% for better score.`,
      });
    }

    if (investments < monthlyIncome * 6) {
      nudges.push({
        id: 4,
        title: "Grow Investments",
        category: "Investments",
        description: `📈 Investments are ${(investments / monthlyIncome).toFixed(1)}x monthly income. Target 6-12x for growth.`,
      });
    }

    if (diningExpense > monthlyIncome * 0.1) {
      nudges.push({
        id: 5,
        title: "Optimize Dining Expenses",
        category: "Spending",
        description: `🍔 Dining: ₹${diningExpense.toLocaleString()}/month. Cook 2 more meals/week to save ₹${Math.round(diningExpense * 0.25).toLocaleString()}.`,
      });
    }

    if (taxData?.quarterlyTax > 0) {
      nudges.push({
        id: 6,
        title: "Quarterly Tax Payment Due",
        category: "Tax",
        description: `Estimated tax: ₹${taxData.quarterlyTax.toLocaleString()}. Pay before 15th Dec to avoid interest.`,
      });
    }

    return nudges;
  };

  const nudges = (() => {
    const storedData = localStorage.getItem('financialData');
    if (storedData) {
      const financialData = JSON.parse(storedData);
      return generateRuleBasedNudges(financialData);
    } else {
      return [
        {
          id: 1,
          title: "Increase your SIP by ₹1,000",
          category: "Investments",
          description: "Consistent with ₹5,000/month SIP. Increase by ₹1,000 to grow corpus by ₹3L in 10 years.",
        },
        {
          id: 2,
          title: "High Dining Expenses Detected",
          category: "Spending",
          description: "Food spend rose 18% this month. Consider meal plans to optimize.",
        },
      ];
    }
  })();

  const filteredNudges =
    activeNudgeCategory === "All"
      ? nudges
      : nudges.filter((n) => n.category === activeNudgeCategory);

  return (
    <main className="bg-gradient-to-br from-green-50 via-white to-green-50/50 min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                GrowAI Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium hidden md:block">Welcome back!</span>
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
                  title="Profile"
                >
                  <User className="w-5 h-5 text-white" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border-2 border-green-100 py-2 z-10 animate-fade-in">
                    <div className="px-4 py-3 border-b border-green-100">
                      <p className="text-sm font-semibold text-gray-900">{session?.user?.email}</p>
                      <p className="text-xs text-green-600">Premium Member</p>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
            Financial Overview
          </h2>
          <p className="text-gray-600">Your complete financial snapshot at a glance</p>
        </div>

        <div className="space-y-8">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            {(() => {
              const storedData = localStorage.getItem('financialData');
              if (storedData) {
                const financialData = JSON.parse(storedData);
                const income = financialData.income.monthly;
                const expenses = Object.values(financialData.expenses).reduce((sum: number, val: any) => sum + (typeof val === 'number' ? val : 0), 0);
                const savings = income - expenses;

                return (
                  <>
                    <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Monthly Income</p>
                      <p className="text-3xl font-bold text-gray-900">₹{income.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +12% from last month
                      </p>
                    </div>

                    <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Expenses</p>
                      <p className="text-3xl font-bold text-gray-900">₹{expenses.toLocaleString()}</p>
                      <p className="text-xs text-orange-600 mt-2">
                        {((expenses / income) * 100).toFixed(0)}% of income
                      </p>
                    </div>

                    <div className="group bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <PiggyBank className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-green-100 mb-1">Savings</p>
                      <p className="text-3xl font-bold text-white">₹{savings.toLocaleString()}</p>
                      <p className="text-xs text-green-100 mt-2">
                        {((savings / income) * 100).toFixed(0)}% savings rate
                      </p>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <DashboardCard title="Monthly Income" amount="₹60,000" type="income" />
                    <DashboardCard title="Expenses" amount="₹45,000" type="expense" />
                    <DashboardCard title="Savings" amount="₹15,000" type="savings" />
                  </>
                );
              }
            })()}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-delay">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg">
              <CashflowChart />
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg">
              <ExpenseChart />
            </div>
          </div>
        </div>
      </section>

      {/* Chat with AI Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16 border-y border-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
              <MessageCircle className="w-4 h-4 text-green-600" />
              AI ASSISTANT
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
              Chat with GrowAI
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border-2 border-green-200 overflow-hidden animate-slide-up">
            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {chatMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Start a conversation</h3>
                  <p className="text-gray-500 max-w-md">
                    Ask me about budgeting, investments, or any financial questions!
                  </p>
                </div>
              )}

              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl max-w-md shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border-2 border-green-100"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-green-100 px-5 py-3 rounded-2xl rounded-bl-none shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      </div>
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white border-t-2 border-green-100">
              <div className="flex gap-3">
                <input
                  className="flex-1 border-2 border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
                  placeholder="Ask about your financial goals..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                />
                <button
                  onClick={sendChatMessage}
                  disabled={chatLoading}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Estimator Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
            <Calculator className="w-4 h-4 text-green-600" />
            TAX PLANNING
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
            Tax Estimator
          </h2>
        </div>

        {taxData ? (
          <div className="space-y-8 animate-slide-up">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                <p className="text-sm font-semibold text-gray-600 mb-1">Total Income</p>
                <p className="text-3xl font-bold text-gray-900">₹{taxData.totalIncome.toLocaleString()}</p>
              </div>
              <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                <p className="text-sm font-semibold text-gray-600 mb-1">Deductions</p>
                <p className="text-3xl font-bold text-gray-900">₹{taxData.deductibleExpenses.toLocaleString()}</p>
              </div>
              <div className="group bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                <p className="text-sm font-semibold text-green-100 mb-1">Estimated Tax</p>
                <p className="text-3xl font-bold text-white">₹{taxData.totalTax.toLocaleString()}</p>
              </div>
            </div>

            {/* Breakdown Chart */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-green-200 shadow-xl">
              <h3 className="text-2xl font-bold text-green-700 mb-6">Tax Breakdown</h3>
              <TaxBreakdownChart data={taxData.taxSlabs} />
              <div className="mt-6 pt-6 border-t-2 border-green-100">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-5 flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-700">Quarterly Advance Tax Payment</p>
                  <p className="text-2xl font-bold text-green-700">₹{taxData.quarterlyTax.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600 font-medium">Loading tax estimator...</p>
            </div>
          </div>
        )}
      </section>

      {/* Smart Nudges Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16 border-y border-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
                <Lightbulb className="w-4 h-4 text-green-600" />
                SMART INSIGHTS
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                Smart Nudge Center
              </h2>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-600/30 hover:shadow-xl transition-all hover:scale-105"
            >
              <RefreshCcw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <NudgeCategoryTabs activeCategory={activeNudgeCategory} onCategoryChange={setActiveNudgeCategory} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {filteredNudges.map((nudge) => (
              <NudgeCard key={nudge.id} nudge={nudge} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
