"use client";
import { useState } from "react";

interface TaxEstimatorFormProps {
  onResult: (result: any) => void;
}

export default function TaxEstimatorForm({ onResult }: TaxEstimatorFormProps) {
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState("salaried");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/tax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income: Number(income),
          category,
        }),
      });
      const data = await res.json();
      onResult(data);
    } catch (error) {
      console.error("Error estimating tax:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🧮 Estimate Your Taxes</h2>

      <label className="block mb-3">
        <span className="text-gray-600">Annual Income (₹)</span>
        <input
          type="number"
          required
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:ring focus:ring-indigo-200"
          placeholder="Enter your annual income"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-600">Income Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:ring focus:ring-indigo-200"
        >
          <option value="salaried">Salaried</option>
          <option value="business">Business</option>
          <option value="freelance">Freelance</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-50"
      >
        {loading ? "Calculating..." : "Estimate Tax"}
      </button>
    </form>
  );
}
