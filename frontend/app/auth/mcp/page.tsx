"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Shield, Briefcase, TreeDeciduous, User } from "lucide-react";

export default function MCPPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<string | null>(null);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  const banks = ["HDFC", "ICICI", "SBI", "Axis"];

  // Step 3: Handle bank connection simulation
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
    setStep(5); // Go to success step
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
                  onClick={() => setProfile(p.id)}
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
              disabled={!profile}
              onClick={() => setStep(2)}
              className={`mt-8 px-6 py-3 rounded-lg font-medium shadow ${
                profile
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
                <label key={bank} className="flex items-center space-x-3">
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
                  <span className="text-gray-700">{bank}</span>
                </label>
              ))}
            </div>
            <button
              disabled={selectedBanks.length === 0}
              onClick={handleConnect}
              className={`mt-8 px-6 py-3 rounded-lg font-medium shadow ${
                selectedBanks.length > 0
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Connect
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
          </>
        )}

        {/* STEP 5 - Success Screen */}
        {step === 5 && (
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
      </div>
    </main>
  );
}
