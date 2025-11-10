"use client";
import { useState, useEffect } from "react";
import { Calculator, MessageCircle, User, Lightbulb, LogOut, RefreshCcw, Settings, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import CashflowChart from "@/components/CashflowChart";
import ExpenseChart from "@/components/ExpenseChart";
import DashboardCard from "@/components/DashboardCard";

import TaxBreakdownChart from "@/components/TaxBreakdownChart";
import NudgeCard from "@/components/NudgeCard";
import NudgeCategoryTabs from "@/components/NudgeCategoryTabs";
import { FinancialDataGenerator } from "@/lib/data-templates/generators/data-generator";

interface TaxSlab {
  slab: string;
  rate: number;
  tax: number;
}

interface TaxData {
  totalIncome: number;
  deductibleExpenses: number;
  taxSlabs: TaxSlab[];
  totalTax: number;
  quarterlyTax: number;
}

interface FinancialData {
  income: {
    monthly: number;
  };
  expenses: {
    [key: string]: number;
  };
  investments: {
    total: number;
  };
  debt: {
    creditCard?: {
      utilization: number;
    };
  };
  savings: {
    emergency: number;
  };
}

export default function DashboardPage() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [taxData, setTaxData] = useState<TaxData | null>(null);
  const [activeNudgeCategory, setActiveNudgeCategory] = useState("All");
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
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
      // Flatten financial data for Gemini API
      const flattenedFinancialData = financialData ? {
        income: financialData.income?.monthly || 0,
        expenses: Object.values(financialData.expenses || {}).reduce((sum: number, val: number) => sum + val, 0),
        investments: financialData.investments?.total || 0,
        debts: financialData.debt || {}
      } : null;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput, financialData: flattenedFinancialData }),
      });

      const data = await res.json();
      const botReply = data.response || data.reply || "No response.";
      setChatMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (_err) {
      setChatMessages([...newMessages, { sender: "bot", text: "Error connecting to GrowAI." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Financial data initialization using FinancialDataGenerator
  useEffect(() => {
    const loadFinancialData = async () => {
      setLoading(true);
      let rawGeneratedData: any = null;
      let transformedData: FinancialData | null = null;

      try {
        // Always try to fetch user profile first
        const profileRes = await fetch('/api/profile');
        let userProfile = {
          financialProfileType: 'young_professional',
          selectedBanks: ['HDFC', 'ICICI'],
          accountDetails: {}
        };

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          userProfile = {
            financialProfileType: profileData?.financialProfileType || 'young_professional',
            selectedBanks: profileData?.selectedBanks || ['HDFC', 'ICICI'],
            accountDetails: profileData?.accountDetails || {}
          };

          // Check if we have stored financial data
          if (profileData.financialData) {
            setFinancialData(profileData.financialData);
            transformedData = profileData.financialData;
          }
        }

        // Generate new data based on user profile if no stored data or always generate fresh
        rawGeneratedData = FinancialDataGenerator.generateFinancialData(userProfile, userProfile.selectedBanks);

        // Transform generated data to match FinancialData interface
        transformedData = {
          income: {
            monthly: rawGeneratedData.income.monthly
          },
          expenses: rawGeneratedData.expenses,
          investments: {
            total: Object.values(rawGeneratedData.banks).reduce((sum: number, bank: any) =>
              sum + (bank.investments?.mutual_funds || 0) +
              (bank.investments?.stocks || 0) +
              (bank.investments?.fixed_deposits || 0), 0)
          },
          debt: {
            creditCard: {
              utilization: Object.values(rawGeneratedData.banks).reduce((max: number, bank: any) =>
                Math.max(max, bank.credit_card?.utilization_rate || 0), 0) / 100
            }
          },
          savings: {
            emergency: rawGeneratedData.summary.monthly_savings * 3 // Approximate emergency fund
          }
        };
        setFinancialData(transformedData);

        // Store the transformed data in database
        await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ financialData: transformedData }),
        });

      } catch (error) {
        console.error('Error loading financial data:', error);
        // Generate default data as last resort
        const defaultUser = {
          financialProfileType: 'young_professional',
          selectedBanks: ['HDFC', 'ICICI'],
          accountDetails: {}
        };
        rawGeneratedData = FinancialDataGenerator.generateFinancialData(defaultUser, defaultUser.selectedBanks);
        transformedData = {
          income: {
            monthly: rawGeneratedData.income.monthly
          },
          expenses: rawGeneratedData.expenses,
          investments: {
            total: Object.values(rawGeneratedData.banks).reduce((sum: number, bank: any) =>
              sum + (bank.investments?.mutual_funds || 0) +
              (bank.investments?.stocks || 0) +
              (bank.investments?.fixed_deposits || 0), 0)
          },
          debt: {
            creditCard: {
              utilization: Object.values(rawGeneratedData.banks).reduce((max: number, bank: any) =>
                Math.max(max, bank.credit_card?.utilization_rate || 0), 0) / 100
            }
          },
          savings: {
            emergency: rawGeneratedData.summary.monthly_savings * 3
          }
        };
        setFinancialData(transformedData);
      } finally {
        setLoading(false);
      }

      // Calculate tax data using the transformed financial data
      if (transformedData) {
        const income = transformedData.income.monthly * 12;

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

    if (taxData && taxData.quarterlyTax > 0) {
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
    if (financialData) {
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
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 py-4 sm:py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                GrowAI Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-gray-700 font-medium hidden sm:block text-sm sm:text-base">Welcome back!</span>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 hover:bg-green-50 rounded-lg transition-colors"
                title="Menu"
              >
                <div className={`w-5 h-0.5 bg-green-600 transition-transform ${showMobileMenu ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-green-600 transition-opacity ${showMobileMenu ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-green-600 transition-transform ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </button>

              {/* Mobile Menu */}
              {showMobileMenu && (
                <div className="md:hidden absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border-2 border-green-100 py-2 z-10 animate-fade-in">
                  <div className="px-4 py-3 border-b border-green-100">
                    <p className="text-sm font-semibold text-gray-900">{session?.user?.email}</p>
                    <p className="text-xs text-green-600">Premium Member</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        router.push('/dashboard');
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 transition-colors font-medium"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        // Add profile navigation if needed
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 transition-colors font-medium"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        // Add settings navigation if needed
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 transition-colors font-medium"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                  </div>
                  <div className="border-t border-green-100 pt-2">
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        signOut();
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
                  title="Profile"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-2xl shadow-xl border-2 border-green-100 py-2 z-10 animate-fade-in">
                    <div className="px-4 py-3 border-b border-green-100">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{session?.user?.email}</p>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
            Financial Overview
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">Your complete financial snapshot at a glance</p>
        </div>

        <div className="space-y-8">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            {loading ? (
              <>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              </>
            ) : financialData ? (
              (() => {
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
              })()
            ) : (
              <div className="col-span-3 flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Failed to load financial data. Please try refreshing the page.</p>
                </div>
              </div>
            )}
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
