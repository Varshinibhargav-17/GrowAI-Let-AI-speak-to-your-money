"use client";

interface TaxResultCardProps {
  result: any;
}

export default function TaxResultCard({ result }: TaxResultCardProps) {
  if (!result) return null;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg mx-auto mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Tax Estimation Result</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Gross Income:</span>
          <span className="font-semibold">₹{result.grossIncome?.toLocaleString() || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Deductions:</span>
          <span className="font-semibold">₹{result.deductions?.toLocaleString() || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxable Income:</span>
          <span className="font-semibold">₹{result.taxableIncome?.toLocaleString() || "N/A"}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-800 font-medium">Total Tax:</span>
          <span className="font-bold text-indigo-600">₹{result.totalTax?.toLocaleString() || "N/A"}</span>
        </div>
        {result.quarterlyTax && (
          <div className="flex justify-between">
            <span className="text-gray-600">Quarterly Advance Tax:</span>
            <span className="font-semibold">₹{result.quarterlyTax.toLocaleString()}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        *This is an estimate based on the New Tax Regime. Consult a tax professional for accurate calculations.
      </p>
    </div>
  );
}
