"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Rent & Living", value: 2100 },
  { name: "Investment", value: 825 },
  { name: "Education", value: 420 },
  { name: "Food & Drink", value: 280 },
  { name: "Entertainment", value: 175 },
];

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];

export default function ExpenseChart() {
  return (
    <div className="bg-white shadow rounded-2xl p-5">
      <h2 className="text-lg font-semibold mb-4">Statistics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
