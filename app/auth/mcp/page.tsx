"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Shield, Briefcase, TreeDeciduous, User } from "lucide-react";
import { FinancialDataGenerator } from "@/lib/data-templates/generators/data-generator";

export default function MCPPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<string | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [accountDetails, setAccountDetails] = useState<{ [bank: string]: {
    savings: { balance: string, interest: string, use: string, description: string },
    salary: { balance: string, transactions: string, description: string },
    creditCard: { limit: string, balance: string, use: string, description: string },
    loan: { type: string, amount: string, emi: string, tenure: string, description: string },
    investment: { mutualFunds: string, stocks: string, fixedDeposits: string, description: string }
  } }>({});

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

  // Step 5: Handle bank connection simulation
  const handleConnect = async () => {
    setConnecting(true);
    let newProgress: { [key: string]: boolean } = {};
    for (let i = 0; i < selectedBanks.length; i++) {
      const bank = selectedBanks[i];
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s per bank
      newProgress[bank] = true;
      setProgress({ ...newProgress });
    }
    setConnecting(false);
    setStep(6); // Go to success step
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow text-center">
        
        {/* STEP 1 - Profile Selection */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              Tell us about your financial situation
            </h2>
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
                  className={`cursor-pointer border rounded-xl p-6 hover:shadow-lg transition ${
                    profile === p.id ? "border-green-600 bg-green-50" : "border-gray-200"
                  }`}
                >
                  {p.icon}
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
              ))}
            </div>
            <button
              disabled={!profileCompleted}
              onClick={() => setStep(2)}
              className={`mt-8 px-6 py-3 rounded-lg font-medium shadow ${
                profileCompleted
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 2 - Secure Connection Simulation */}
        {step === 2 && (
          <>
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">Secure Connection</h2>
            <p className="text-gray-700 mb-2">We'll simulate connecting to your financial institutions.</p>
            <p className="text-gray-500 text-sm mb-6">
              This is a demonstration - real connection uses bank-level security.
            </p>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700"
            >
              Start Simulation
            </button>
          </>
        )}

        {/* STEP 3 - Select Banks */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-6">Select your banks</h2>
            <div className="space-y-3 text-left">
              {banks.map((bank) => (
                <div key={bank} className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 mb-3">
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
                      className="w-5 h-5 text-green-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-700 font-medium">{bank}</span>
                  </label>

                </div>
              ))}
            </div>
            <button
              disabled={selectedBanks.length === 0}
              onClick={() => setStep(7)}
              className={`mt-8 px-6 py-3 rounded-lg font-medium shadow ${
                selectedBanks.length > 0
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Fill Account Details
            </button>
          </>
        )}

        {/* STEP 4 - Loading Simulation */}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-6">Connecting...</h2>
            <div className="space-y-4">
              {selectedBanks.map((bank) => (
                <div key={bank} className="text-left">
                  <p className="text-gray-700 mb-1">
                    {progress[bank] ? `Connected to ${bank}!` : `Connecting to ${bank}...`}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        progress[bank] ? "bg-green-600 w-full" : "bg-green-300 w-1/2 animate-pulse"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {Object.keys(progress).length === selectedBanks.length && (
              <button
                onClick={handleConnect}
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700"
              >
                Continue
              </button>
            )}
          </>
        )}



        {/* STEP 6 - Success Screen */}
        {step === 6 && (
          <>
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">Connection Successful!</h2>
            <p className="text-gray-700 mb-6">
              Connected to {selectedBanks.length} financial institution
              {selectedBanks.length > 1 ? "s" : ""}.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700"
            >
              View Your Financial Dashboard
            </button>
          </>
        )}

        {/* STEP 7 - Fill Account Details */}
        {step === 7 && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-6">Fill Account Details</h2>
            <p className="text-gray-700 mb-6">
              Please provide specific details for your selected accounts. This will help generate accurate financial insights.
            </p>
            <div className="text-left space-y-6">
              {selectedBanks.map((bank) => (
                <div key={bank} className="border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">{bank} Accounts</h3>

                  {/* Savings Account */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">💵 Savings Account</h4>
                    <div className="space-y-2">
                      <select
                        value={accountDetails[bank]?.savings?.balance || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            savings: { ...prev[bank]?.savings, balance: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Savings account balance range"
                      >
                        <option value="">Select balance range</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                        <option value="₹2,00,000+">₹2,00,000+</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.savings?.interest || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            savings: { ...prev[bank]?.savings, interest: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Savings account interest rate"
                      >
                        <option value="">Select interest rate</option>
                        <option value="2.5% - 3.0%">2.5% - 3.0%</option>
                        <option value="3.0% - 4.0%">3.0% - 4.0%</option>
                        <option value="4.0% - 5.0%">4.0% - 5.0%</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.savings?.use || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            savings: { ...prev[bank]?.savings, use: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Savings account primary use"
                      >
                        <option value="">Select primary use</option>
                        <option value="Emergency fund">Emergency fund</option>
                        <option value="Short-term savings">Short-term savings</option>
                        <option value="Daily expenses">Daily expenses</option>
                        <option value="Other">Other</option>
                      </select>
                      <textarea
                        placeholder="Describe your savings account (optional)"
                        className="w-full border rounded px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500"
                        rows={2}
                        value={accountDetails[bank]?.savings?.description || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            savings: { ...prev[bank]?.savings, description: e.target.value }
                          }
                        }))}
                      />
                    </div>
                  </div>

                  {/* Salary Account */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">💰 Salary Account</h4>
                    <div className="space-y-2">
                      <select
                        value={accountDetails[bank]?.salary?.balance || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            salary: { ...prev[bank]?.salary, balance: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Salary account balance range"
                      >
                        <option value="">Select balance range</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                        <option value="₹5,00,000+">₹5,00,000+</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.salary?.transactions || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            salary: { ...prev[bank]?.salary, transactions: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Salary account monthly transactions"
                      >
                        <option value="">Select monthly transactions</option>
                        <option value="5-10">5-10</option>
                        <option value="10-20">10-20</option>
                        <option value="20-30">20-30</option>
                        <option value="30+">30+</option>
                      </select>
                      <textarea
                        placeholder="Describe your salary account (optional)"
                        className="w-full border rounded px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500"
                        rows={2}
                        value={accountDetails[bank]?.salary?.description || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            salary: { ...prev[bank]?.salary, description: e.target.value }
                          }
                        }))}
                      />
                    </div>
                  </div>

                  {/* Credit Card */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">💳 Credit Card</h4>
                    <div className="space-y-2">
                      <select
                        value={accountDetails[bank]?.creditCard?.limit || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            creditCard: { ...prev[bank]?.creditCard, limit: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Credit card limit range"
                      >
                        <option value="">Select limit range</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                        <option value="₹2,00,000+">₹2,00,000+</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.creditCard?.balance || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            creditCard: { ...prev[bank]?.creditCard, balance: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Credit card current balance"
                      >
                        <option value="">Select current balance</option>
                        <option value="0-10%">0-10%</option>
                        <option value="10-30%">10-30%</option>
                        <option value="30-60%">30-60%</option>
                        <option value="60-100%">60-100%</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.creditCard?.use || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            creditCard: { ...prev[bank]?.creditCard, use: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Credit card primary use"
                      >
                        <option value="">Select primary use</option>
                        <option value="Online shopping">Online shopping</option>
                        <option value="Subscriptions">Subscriptions</option>
                        <option value="Dining">Dining</option>
                        <option value="Travel">Travel</option>
                        <option value="Other">Other</option>
                      </select>
                      <textarea
                        placeholder="Describe your credit card (optional)"
                        className="w-full border rounded px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500"
                        rows={2}
                        value={accountDetails[bank]?.creditCard?.description || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            creditCard: { ...prev[bank]?.creditCard, description: e.target.value }
                          }
                        }))}
                      />
                    </div>
                  </div>

                  {/* Loan Account */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">🏠 Loan Account</h4>
                    <div className="space-y-2">
                      <select
                        value={accountDetails[bank]?.loan?.type || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            loan: { ...prev[bank]?.loan, type: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Loan type"
                      >
                        <option value="">Select loan type</option>
                        <option value="Home">Home</option>
                        <option value="Personal">Personal</option>
                        <option value="Car">Car</option>
                        <option value="Education">Education</option>
                        <option value="Business">Business</option>
                        <option value="Other">Other</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.loan?.amount || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            loan: { ...prev[bank]?.loan, amount: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Loan amount range"
                      >
                        <option value="">Select amount range</option>
                        <option value="₹2L - ₹10L">₹2L - ₹10L</option>
                        <option value="₹10L - ₹25L">₹10L - ₹25L</option>
                        <option value="₹25L - ₹50L">₹25L - ₹50L</option>
                        <option value="₹50L+">₹50L+</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.loan?.emi || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            loan: { ...prev[bank]?.loan, emi: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="EMI range"
                      >
                        <option value="">Select EMI range</option>
                        <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                        <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000+">₹50,000+</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.loan?.tenure || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            loan: { ...prev[bank]?.loan, tenure: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Loan tenure"
                      >
                        <option value="">Select tenure</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10-15 years">10-15 years</option>
                        <option value="15+ years">15+ years</option>
                      </select>
                      <textarea
                        placeholder="Describe your loan account (optional)"
                        className="w-full border rounded px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500"
                        rows={2}
                        value={accountDetails[bank]?.loan?.description || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...prev[bank],
                            loan: { ...prev[bank]?.loan, description: e.target.value }
                          }
                        }))}
                      />
                    </div>
                  </div>

                  {/* Investment Account */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">📈 Investment Account</h4>
                    <div className="space-y-2">
                      <select
                        value={accountDetails[bank]?.investment?.mutualFunds || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...defaultBank,
                            ...prev[bank],
                            investment: { ...defaultBank.investment, ...prev[bank]?.investment, mutualFunds: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Mutual funds investment range"
                      >
                        <option value="">Select mutual funds range</option>
                        <option value="₹50,000 - ₹5,00,000">₹50,000 - ₹5,00,000</option>
                        <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                        <option value="₹10,00,000 - ₹15,00,000">₹10,00,000 - ₹15,00,000</option>
                        <option value="₹15,00,000+">₹15,00,000+</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.investment?.stocks || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...defaultBank,
                            ...prev[bank],
                            investment: { ...defaultBank.investment, ...prev[bank]?.investment, stocks: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Stocks investment range"
                      >
                        <option value="">Select stocks range</option>
                        <option value="₹25,000 - ₹1,00,000">₹25,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                        <option value="₹5,00,000+">₹5,00,000+</option>
                      </select>
                      <select
                        value={accountDetails[bank]?.investment?.fixedDeposits || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...defaultBank,
                            ...prev[bank],
                            investment: { ...defaultBank.investment, ...prev[bank]?.investment, fixedDeposits: e.target.value }
                          }
                        }))}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                        aria-label="Fixed deposits investment range"
                      >
                        <option value="">Select fixed deposits range</option>
                        <option value="₹1,00,000 - ₹5,00,000">₹1,00,000 - ₹5,00,000</option>
                        <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                        <option value="₹10,00,000+">₹10,00,000+</option>
                      </select>
                      <textarea
                        placeholder="Describe your investment account (optional)"
                        className="w-full border rounded px-3 py-2 mt-2 focus:ring-2 focus:ring-green-500"
                        rows={2}
                        value={accountDetails[bank]?.investment?.description || ""}
                        onChange={(e) => setAccountDetails(prev => ({
                          ...prev,
                          [bank]: {
                            ...defaultBank,
                            ...prev[bank],
                            investment: { ...defaultBank.investment, ...prev[bank]?.investment, description: e.target.value }
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={async () => {
                // Generate financial data
                const profileRes = await fetch("/api/profile");
                const profileData = await profileRes.json();
                const profileType = profileData.financialProfileType;

                const financialData = FinancialDataGenerator.generateFinancialData(
                  profileType,
                  selectedBanks
                );

                // Save selectedBanks to user profile
                await fetch("/api/profile", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ selectedBanks }),
                });

                // Save to localStorage for dashboard
                localStorage.setItem('financialData', JSON.stringify(financialData));

                setStep(6);
              }}
              className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700"
            >
              Generate & Continue
            </button>
          </>
        )}
      </div>
    </main>
  );
}
