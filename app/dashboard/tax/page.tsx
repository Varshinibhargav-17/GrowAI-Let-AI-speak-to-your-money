// TaxEstimatorPage.tsx - Enhanced
"use client";
import { useEffect, useState } from "react";
import TaxSummaryCard from "@/components/TaxSummaryCard";
import TaxBreakdownChart from "@/components/TaxBreakdownChart";

export default function TaxEstimatorPage() {
  const [taxData, setTaxData] = useState<any>(null);

  useEffect(() => {
    const loadFinancialData = () => {
      const storedData = localStorage.getItem('financialData');
      if (storedData) {
        const financialData = JSON.parse(storedData);
        const income = financialData.income.monthly * 12; // Annual income

        // Calculate tax based on Indian tax slabs
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
          deductibleExpenses: Math.floor(income * 0.1), // Assume 10% deductions
          taxSlabs: slabs,
          totalTax: Math.round(taxPayable),
          quarterlyTax: Math.round(taxPayable / 4),
        };
        setTaxData(taxData);
      } else {
        // Fallback to mock data if no stored data
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

  if (!taxData)
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Loading tax estimator...</p>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 p-4 md:p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            TAX PLANNING
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent mb-3">
            Tax Estimator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Automatically estimated based on your income profile and deductions
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Income</p>
            <p className="text-3xl font-bold text-gray-900">₹{taxData.totalIncome.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Annual gross income</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Deductions</p>
            <p className="text-3xl font-bold text-gray-900">₹{taxData.deductibleExpenses.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Tax-saving deductions</p>
          </div>

          <div className="group bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-green-100 mb-1">Estimated Tax</p>
            <p className="text-3xl font-bold text-white">₹{taxData.totalTax.toLocaleString()}</p>
            <p className="text-xs text-green-100 mt-2">Total tax liability</p>
          </div>
        </div>

        {/* Tax Breakdown Chart */}
        <section className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-green-200 shadow-xl animate-fade-in-delay">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-700">Tax Breakdown by Slab</h2>
          </div>
          
          <TaxBreakdownChart data={taxData.taxSlabs} />
          
          <div className="mt-8 pt-6 border-t-2 border-green-100">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Quarterly Advance Tax Payment</p>
                    <p className="text-xs text-gray-500">Due every quarter</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-700">
                  ₹{taxData.quarterlyTax.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Saving Tips */}
        <section className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 shadow-2xl animate-fade-in-delay-2">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Smart Tax-Saving Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <p className="text-green-50 leading-relaxed">
                💡 Maximize 80C deductions by investing in ELSS, PPF, or EPF to save up to ₹46,800 annually
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <p className="text-green-50 leading-relaxed">
                💡 Claim HRA exemption if you're paying rent - can save significant tax amount
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <p className="text-green-50 leading-relaxed">
                💡 Health insurance premiums under 80D can save up to ₹25,000 in taxes
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <p className="text-green-50 leading-relaxed">
                💡 Keep proof of business expenses if self-employed for additional deductions
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

