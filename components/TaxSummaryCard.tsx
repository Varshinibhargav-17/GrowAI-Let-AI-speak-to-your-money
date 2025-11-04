interface Props {
  title: string;
  value: string;
  highlight?: boolean;
}

export default function TaxSummaryCard({ title, value, highlight }: Props) {
  return (
    <div
      className={`p-6 rounded-2xl shadow text-center transition ${
        highlight ? "bg-green-600 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
