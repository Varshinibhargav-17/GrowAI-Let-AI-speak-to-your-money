"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export default function CashflowChart() {
  const [data, setData] = useState([
    { month: "Jan", income: 8000, expense: 4000 },
    { month: "Feb", income: 7000, expense: 3500 },
    { month: "Mar", income: 9000, expense: 5000 },
    { month: "Apr", income: 7500, expense: 4000 },
    { month: "May", income: 9500, expense: 6000 },
    { month: "Jun", income: 8500, expense: 4200 },
  ]);

  useEffect(() => {
    const financialData = localStorage.getItem('financialData');
    if (financialData) {
      const parsedData = JSON.parse(financialData);
      const monthlyIncome = parsedData.income.monthly;
      const monthlyExpense = parsedData.summary.total_expenses;

      // Generate 6 months of data with some variation
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const newData = months.map((month, index) => {
        const variation = 0.1; // 10% variation
        const variedIncome = monthlyIncome * (1 + (Math.random() * variation * 2 - variation));
        const variedExpense = monthlyExpense * (1 + (Math.random() * variation * 2 - variation));

        return {
          month,
          income: Math.floor(variedIncome),
          expense: Math.floor(variedExpense)
        };
      });

      setData(newData);
    }
  }, []);

  return (
    <div className="bg-white shadow rounded-2xl p-5">
      <h2 className="text-lg font-semibold mb-4">Cashflow</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#16a34a" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expense" fill="#065f46" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
