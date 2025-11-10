"use client";

import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  amount: string;
  type?: "income" | "expense" | "savings";
  icon?: ReactNode;
}

export default function DashboardCard({ title, amount, type, icon }: DashboardCardProps) {
  const color =
    type === "income"
      ? "text-green-600"
      : type === "expense"
      ? "text-red-500"
      : "text-green-500";

  return (
    <div className="bg-white shadow rounded-2xl p-5 flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <span className={`${color} font-semibold`}>{icon}</span>
        <span className="text-gray-400 text-sm">{title}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{amount}</p>
    </div>
  );
}
