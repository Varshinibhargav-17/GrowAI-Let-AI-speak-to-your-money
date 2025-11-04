// MCPPage.tsx - Enhanced (Step 1, 2, 3, 6, 7 only - keeping functionality same)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Shield, Briefcase, TreeDeciduous, User, Building2, Check } from "lucide-react";
import { FinancialDataGenerator } from "@/lib/data-templates/generators/data-generator";

export default function MCPPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<string | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [accountDetails, setAccountDetails] = useState<{ [bank: string]: any }>({});

  const defaultBank = {
    savings: { balance: "", interest: "", use: "", description: "" },
    salary: { balance: "", transactions: "", description: "" },
    creditCard: { limit: "", balance: "", use: "", description: "" },
    loan: { type: "", amount: "", emi: "", tenure: "", description: "" },
    investment: { mutualFunds: "", stocks: "", fixedDeposits: "", description: "" }
  };

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.financialProfileType) {
            setProfileCompleted(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const banks = ["HDFC", "ICICI", "SBI", "Axis"];

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 px-4 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-3xl relative z-10">

        {/* STEP 1 - Profile Selection */}
        {step === 1 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border-2 border-green-200 shadow-2xl text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-6">
              <User className="w-4 h-4 text-green-600" />
              PROFILE SETUP
            </div>

            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-4">
              Tell Us About Yourself
            </h2>
            <p className="text-gray-600 mb-10">Choose your financial profile to get personalized insights</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "young",
                  title: "Young Professional",
                  desc: "Early career, building savings",
                  icon: <User className="w-10 h-10 text-green-600" />,
                },
                {
                  id: "investor",
                  title: "Established Investor",
                  desc: "Wealth accumulation phase",
                  icon: <Briefcase className="w-10 h-10 text-green-600" />,
                },
                {
                  id: "retirement",
                  title: "Retirement Focused",
                  desc: "Managing retirement funds",
                  icon: <TreeDeciduous className="w-10 h-10 text-green-600" />,
                },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setProfile(p.id);
                    if (p.id === "young") router.push("/auth/young");
                    if (p.id === "investor") router.push("/auth/investor");
                    if (p.id === "retirement") router.push("/auth/retirement");
                  }}
                  className={`cursor-pointer border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    profile === p.id ? "border-green-600 bg-green-50 shadow-lg" : "border-green-200 bg-white/50"
                  }`}
                >
                  <div className="flex justify-center mb-4">{p.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
              ))}
            </div>

            <button
              disabled={!profileCompleted}
              onClick={() => setStep(2)}
              className={`mt-10 px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                profileCompleted
                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 - Secure Connection */}
        {step === 2 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border-2 border-green-200 shadow-2xl text-center animate-slide-up">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-4">
              Secure Connection
            </h2>
            <p className="text-gray-700 mb-3 max-w-2xl mx-auto">
              We'll simulate connecting to your financial institutions using bank-level security protocols.
            </p>
            <p className="text-gray-500 text-sm mb-8 max-w-xl mx-auto">
              This is a demonstration of how GrowAI would securely connect to your real accounts.
            </p>
            
            {/* Security Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <Check className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-sm font-semibold text-gray-800">256-bit Encryption</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <Check className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-sm font-semibold text-gray-800">Read-Only Access</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <Check className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-sm font-semibold text-gray-800">No Data Stored</p>
              </div>
            </div>
            
            <button
              onClick={() => setStep(3)}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold shadow-lg shadow-green-600/30 hover:shadow-xl transition-all hover:scale-105"
            >
              Start Simulation
            </button>
          </div>
        )}

        {/* STEP 3 - Select Banks */}
        {step === 3 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border-2 border-green-200 shadow-2xl animate-slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
                <Building2 className="w-4 h-4 text-green-600" />
                BANK SELECTION
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
                Select Your Banks
              </h2>
              <p className="text-gray-600">Choose the financial institutions you want to connect</p>
            </div>
            
            <div className="space-y-4 mb-10">
              {banks.map((bank) => (
                <label
                  key={bank}
                  className={`flex items-center space-x-4 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedBanks.includes(bank)
                      ? "border-green-600 bg-green-50 shadow-md"
                      : "border-green-200 bg-white/50 hover:border-green-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBanks.includes(bank)}
                    onChange={() =>
                      setSelectedBanks((prev) =>
                        prev.includes(bank)
                          ? prev.filter((b) => b !== bank)
                          : [...prev, bank]
                      )
                    }
                    className="w-6 h-6 text-green-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <span className="text-lg font-bold text-gray-900">{bank}</span>
                    <p className="text-sm text-gray-500">Connect accounts from {bank}</p>
                  </div>
                  {selectedBanks.includes(bank) && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </label>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                disabled={selectedBanks.length === 0}
                onClick={() => setStep(7)}
                className={`px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                  selectedBanks.length > 0
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue ({selectedBanks.length} selected)
              </button>
            </div>
          </div>
        )}

        {/* STEP 6 - Success Screen */}
        {step === 6 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border-2 border-green-200 shadow-2xl text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-4">
              Connection Successful!
            </h2>
            <p className="text-gray-700 mb-8 max-w-md mx-auto">
              Successfully connected to {selectedBanks.length} financial institution
              {selectedBanks.length > 1 ? "s" : ""}. Your dashboard is ready!
            </p>
            
            {/* Connected Banks */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {selectedBanks.map((bank) => (
                <div key={bank} className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">{bank}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold shadow-lg shadow-green-600/30 hover:shadow-xl transition-all hover:scale-105"
            >
              View Your Financial Dashboard
            </button>
          </div>
        )}

        {/* STEP 7 - Fill Account Details */}
        {step === 7 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border-2 border-green-200 shadow-2xl animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
                Account Details
              </h2>
              <p className="text-gray-600">
                Provide details for accurate financial insights
              </p>
            </div>

            <div className="text-left space-y-8 max-h-[600px] overflow-y-auto pr-2">
              {selectedBanks.map((bank) => (
                <div key={bank} className="border-2 border-green-200 rounded-2xl p-6 bg-green-50/50">
                  <h3 className="text-xl font-bold text-green-800 mb-4">{bank} Accounts</h3>

                  {/* Savings Account */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Savings Account</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`savings-balance-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Balance (₹)</label>
                        <select
                          id={`savings-balance-${bank}`}
                          value={accountDetails[bank]?.savings?.balance || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              savings: { ...prev[bank]?.savings, balance: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Balance</option>
                          <option value="0-10,000">0-10,000</option>
                          <option value="10,001-50,000">10,001-50,000</option>
                          <option value="50,001-1,00,000">50,001-1,00,000</option>
                          <option value="1,00,001-5,00,000">1,00,001-5,00,000</option>
                          <option value="5,00,001-10,00,000">5,00,001-10,00,000</option>
                          <option value="Above 10,00,000">Above 10,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`savings-interest-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                        <select
                          id={`savings-interest-${bank}`}
                          value={accountDetails[bank]?.savings?.interest || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              savings: { ...prev[bank]?.savings, interest: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Interest Rate</option>
                          <option value="0%">0%</option>
                          <option value="1%">1%</option>
                          <option value="2%">2%</option>
                          <option value="3%">3%</option>
                          <option value="4%">4%</option>
                          <option value="5%">5%</option>
                          <option value="6%">6%</option>
                          <option value="7%">7%</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`savings-use-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Use</label>
                        <select
                          id={`savings-use-${bank}`}
                          value={accountDetails[bank]?.savings?.use || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              savings: { ...prev[bank]?.savings, use: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Use</option>
                          <option value="Emergency Fund">Emergency Fund</option>
                          <option value="Daily Expenses">Daily Expenses</option>
                          <option value="Savings">Savings</option>
                          <option value="Investment">Investment</option>
                          <option value="Retirement Fund">Retirement Fund</option>
                          <option value="Education Fund">Education Fund</option>
                          <option value="Vacation Fund">Vacation Fund</option>
                          <option value="Wedding Fund">Wedding Fund</option>
                          <option value="Medical Fund">Medical Fund</option>
                          <option value="Home Down Payment">Home Down Payment</option>
                          <option value="Car Purchase">Car Purchase</option>
                          <option value="Business Startup">Business Startup</option>
                          <option value="Debt Repayment">Debt Repayment</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`savings-description-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <select
                          id={`savings-description-${bank}`}
                          value={accountDetails[bank]?.savings?.description || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              savings: { ...prev[bank]?.savings, description: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Description</option>
                          <option value="Primary Savings">Primary Savings</option>
                          <option value="Emergency Savings">Emergency Savings</option>
                          <option value="Investment Savings">Investment Savings</option>
                          <option value="Retirement Savings">Retirement Savings</option>
                          <option value="Education Savings">Education Savings</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Salary Account */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Salary Account</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`salary-balance-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Balance (₹)</label>
                        <select
                          id={`salary-balance-${bank}`}
                          value={accountDetails[bank]?.salary?.balance || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              salary: { ...prev[bank]?.salary, balance: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Balance</option>
                          <option value="0-10,000">0-10,000</option>
                          <option value="10,001-50,000">10,001-50,000</option>
                          <option value="50,001-1,00,000">50,001-1,00,000</option>
                          <option value="1,00,001-5,00,000">1,00,001-5,00,000</option>
                          <option value="5,00,001-10,00,000">5,00,001-10,00,000</option>
                          <option value="Above 10,00,000">Above 10,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`salary-transactions-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Monthly Transactions</label>
                        <select
                          id={`salary-transactions-${bank}`}
                          value={accountDetails[bank]?.salary?.transactions || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              salary: { ...prev[bank]?.salary, transactions: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Transactions</option>
                          <option value="0-10">0-10</option>
                          <option value="10-50">10-50</option>
                          <option value="50-100">50-100</option>
                          <option value="100-500">100-500</option>
                          <option value="Above 500">Above 500</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor={`salary-description-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <select
                          id={`salary-description-${bank}`}
                          value={accountDetails[bank]?.salary?.description || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              salary: { ...prev[bank]?.salary, description: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Description</option>
                          <option value="Primary Salary Account">Primary Salary Account</option>
                          <option value="Secondary Salary Account">Secondary Salary Account</option>
                          <option value="Joint Salary Account">Joint Salary Account</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Credit Card</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`creditCard-limit-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Credit Limit (₹)</label>
                        <select
                          id={`creditCard-limit-${bank}`}
                          value={accountDetails[bank]?.creditCard?.limit || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              creditCard: { ...prev[bank]?.creditCard, limit: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Credit Limit</option>
                          <option value="10,000-50,000">10,000-50,000</option>
                          <option value="50,001-1,00,000">50,001-1,00,000</option>
                          <option value="1,00,001-2,00,000">1,00,001-2,00,000</option>
                          <option value="2,00,001-5,00,000">2,00,001-5,00,000</option>
                          <option value="Above 5,00,000">Above 5,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`creditCard-balance-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Outstanding Balance (₹)</label>
                        <select
                          id={`creditCard-balance-${bank}`}
                          value={accountDetails[bank]?.creditCard?.balance || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              creditCard: { ...prev[bank]?.creditCard, balance: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Outstanding Balance</option>
                          <option value="0">0</option>
                          <option value="1-10,000">1-10,000</option>
                          <option value="10,001-50,000">10,001-50,000</option>
                          <option value="50,001-1,00,000">50,001-1,00,000</option>
                          <option value="Above 1,00,000">Above 1,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`creditCard-use-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Use</label>
                        <select
                          id={`creditCard-use-${bank}`}
                          value={accountDetails[bank]?.creditCard?.use || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              creditCard: { ...prev[bank]?.creditCard, use: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Use</option>
                          <option value="Shopping">Shopping</option>
                          <option value="Online Shopping">Online Shopping</option>
                          <option value="Groceries">Groceries</option>
                          <option value="Travel">Travel</option>
                          <option value="Dining">Dining</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Fuel">Fuel</option>
                          <option value="Medical">Medical</option>
                          <option value="Education">Education</option>
                          <option value="Home Improvement">Home Improvement</option>
                          <option value="Insurance">Insurance</option>
                          <option value="Utilities">Utilities</option>
                          <option value="Subscriptions">Subscriptions</option>
                          <option value="Cash Advances">Cash Advances</option>
                          <option value="Rewards Redemption">Rewards Redemption</option>
                          <option value="ATM Withdrawals">ATM Withdrawals</option>
                          <option value="International Transactions">International Transactions</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`creditCard-description-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <select
                          id={`creditCard-description-${bank}`}
                          value={accountDetails[bank]?.creditCard?.description || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              creditCard: { ...prev[bank]?.creditCard, description: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Description</option>
                          <option value="Primary Credit Card">Primary Credit Card</option>
                          <option value="Business Credit Card">Business Credit Card</option>
                          <option value="Rewards Card">Rewards Card</option>
                          <option value="Travel Card">Travel Card</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Loan */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Loan</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`loan-type-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
                        <select
                          id={`loan-type-${bank}`}
                          value={accountDetails[bank]?.loan?.type || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              loan: { ...prev[bank]?.loan, type: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Loan Type</option>
                          <option value="Home Loan">Home Loan</option>
                          <option value="Personal Loan">Personal Loan</option>
                          <option value="Car Loan">Car Loan</option>
                          <option value="Education Loan">Education Loan</option>
                          <option value="Business Loan">Business Loan</option>
                          <option value="Gold Loan">Gold Loan</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`loan-amount-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
                        <select
                          id={`loan-amount-${bank}`}
                          value={accountDetails[bank]?.loan?.amount || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              loan: { ...prev[bank]?.loan, amount: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Loan Amount</option>
                          <option value="1,00,000-5,00,000">1,00,000-5,00,000</option>
                          <option value="5,00,001-10,00,000">5,00,001-10,00,000</option>
                          <option value="10,00,001-20,00,000">10,00,001-20,00,000</option>
                          <option value="20,00,001-50,00,000">20,00,001-50,00,000</option>
                          <option value="Above 50,00,000">Above 50,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`loan-emi-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">EMI (₹)</label>
                        <select
                          id={`loan-emi-${bank}`}
                          value={accountDetails[bank]?.loan?.emi || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              loan: { ...prev[bank]?.loan, emi: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select EMI</option>
                          <option value="5,000-10,000">5,000-10,000</option>
                          <option value="10,001-20,000">10,001-20,000</option>
                          <option value="20,001-50,000">20,001-50,000</option>
                          <option value="50,001-1,00,000">50,001-1,00,000</option>
                          <option value="Above 1,00,000">Above 1,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`loan-tenure-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Tenure (Years)</label>
                        <select
                          id={`loan-tenure-${bank}`}
                          value={accountDetails[bank]?.loan?.tenure || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              loan: { ...prev[bank]?.loan, tenure: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Tenure</option>
                          <option value="1-5">1-5</option>
                          <option value="5-10">5-10</option>
                          <option value="10-15">10-15</option>
                          <option value="15-20">15-20</option>
                          <option value="Above 20">Above 20</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor={`loan-description-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <select
                          id={`loan-description-${bank}`}
                          value={accountDetails[bank]?.loan?.description || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              loan: { ...prev[bank]?.loan, description: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Description</option>
                          <option value="Primary Home Loan">Primary Home Loan</option>
                          <option value="Personal Loan">Personal Loan</option>
                          <option value="Car Loan">Car Loan</option>
                          <option value="Education Loan">Education Loan</option>
                          <option value="Business Loan">Business Loan</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Investment */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Investment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`investment-mutualFunds-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Mutual Funds (₹)</label>
                        <select
                          id={`investment-mutualFunds-${bank}`}
                          value={accountDetails[bank]?.investment?.mutualFunds || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              investment: { ...prev[bank]?.investment, mutualFunds: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Mutual Funds</option>
                          <option value="0-1,00,000">0-1,00,000</option>
                          <option value="1,00,001-5,00,000">1,00,001-5,00,000</option>
                          <option value="5,00,001-10,00,000">5,00,001-10,00,000</option>
                          <option value="10,00,001-25,00,000">10,00,001-25,00,000</option>
                          <option value="Above 25,00,000">Above 25,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`investment-stocks-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Stocks (₹)</label>
                        <select
                          id={`investment-stocks-${bank}`}
                          value={accountDetails[bank]?.investment?.stocks || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              investment: { ...prev[bank]?.investment, stocks: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Stocks</option>
                          <option value="0-1,00,000">0-1,00,000</option>
                          <option value="1,00,001-5,00,000">1,00,001-5,00,000</option>
                          <option value="5,00,001-10,00,000">5,00,001-10,00,000</option>
                          <option value="10,00,001-25,00,000">10,00,001-25,00,000</option>
                          <option value="Above 25,00,000">Above 25,00,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`investment-fixedDeposits-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Fixed Deposits (₹)</label>
                        <select
                          id={`investment-fixedDeposits-${bank}`}
                          value={accountDetails[bank]?.investment?.fixedDeposits || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              investment: { ...prev[bank]?.investment, fixedDeposits: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Fixed Deposits</option>
                          <option value="0-1,00,000">0-1,00,000</option>
                          <option value="1,00,001-5,00,000">1,00,001-5,00,000</option>
                          <option value="5,00,001-10,00,000">5,00,001-10,00,000</option>
                          <option value="10,00,001-25,00,000">10,00,001-25,00,000</option>
                          <option value="Above 25,00,000">Above 25,00,000</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor={`investment-description-${bank}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <select
                          id={`investment-description-${bank}`}
                          value={accountDetails[bank]?.investment?.description || ""}
                          onChange={(e) => setAccountDetails(prev => ({
                            ...prev,
                            [bank]: {
                              ...prev[bank],
                              investment: { ...prev[bank]?.investment, description: e.target.value }
                            }
                          }))}
                          className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Description</option>
                          <option value="Primary Investment">Primary Investment</option>
                          <option value="Retirement Investment">Retirement Investment</option>
                          <option value="Education Investment">Education Investment</option>
                          <option value="Emergency Investment">Emergency Investment</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                const profileRes = await fetch("/api/profile");
                const profileData = await profileRes.json();
                const profileType = profileData.financialProfileType;

                const financialData = FinancialDataGenerator.generateFinancialData(
                  profileType,
                  selectedBanks
                );

                await fetch("/api/profile", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ selectedBanks, accountDetails }),
                });

                localStorage.setItem('financialData', JSON.stringify(financialData));
                setStep(6);
              }}
              className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold shadow-lg shadow-green-600/30 hover:shadow-xl transition-all"
            >
              Generate & Continue
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
