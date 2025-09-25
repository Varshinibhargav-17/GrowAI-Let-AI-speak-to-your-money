"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { UserCircle } from "lucide-react";
import ProfileForm from "@/components/ProfileForm";
import DashboardCard from "@/components/DashboardCard";
import CashflowChart from "@/components/CashflowChart";
import ExpenseChart from "@/components/ExpenseChart";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [showProfile, setShowProfile] = useState(false);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center space-x-2 bg-white shadow px-4 py-2 rounded-lg"
        >
          <UserCircle className="w-6 h-6 text-gray-600" />
          <span className="text-gray-700 font-medium">Profile</span>
        </button>
      </div>

      {/* Profile Section */}
      {showProfile && (
        <div className="mb-6 bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Complete Your Profile
          </h2>
          <ProfileForm />
        </div>
      )}

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Total Income" amount="$78,000" type="income" />
        <DashboardCard title="Total Expense" amount="$43,000" type="expense" />
        <DashboardCard title="Total Savings" amount="$56,000" type="savings" />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cashflow */}
        <div className="md:col-span-2">
          <CashflowChart />
        </div>

        {/* Expense Statistics */}
        <div>
          <ExpenseChart />
        </div>
      </div>
    </main>
  );
}
