"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", income: 8000, expense: 4000 },
  { month: "Feb", income: 7000, expense: 3500 },
  { month: "Mar", income: 9000, expense: 5000 },
  { month: "Apr", income: 7500, expense: 4000 },
  { month: "May", income: 9500, expense: 6000 },
  { month: "Jun", income: 8500, expense: 4200 },
];

export default function CashflowChart() {
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
