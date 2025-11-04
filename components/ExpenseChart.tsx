"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];

export default function ExpenseChart() {
  const [data, setData] = useState([
    { name: "Rent & Living", value: 2100 },
    { name: "Investment", value: 825 },
    { name: "Education", value: 420 },
    { name: "Food & Drink", value: 280 },
    { name: "Entertainment", value: 175 },
  ]);

  useEffect(() => {
    const financialData = localStorage.getItem('financialData');
    if (financialData) {
      const parsedData = JSON.parse(financialData);
      const expenses = parsedData.expenses;

      // Convert expenses object to array format for the chart
      const expenseData = Object.entries(expenses).map(([category, amount]: [string, any]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' '),
        value: amount
      }));

      setData(expenseData);
    }
  }, []);

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
