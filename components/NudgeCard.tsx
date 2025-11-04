interface Nudge {
  id: number;
  title: string;
  category: string;
  description: string;
}

interface Props {
  nudge: Nudge;
}

export default function NudgeCard({ nudge }: Props) {
  const { title, description, category } = nudge;
  const categoryColors: Record<string, string> = {
    Investments: "bg-green-100 text-green-700",
    Spending: "bg-yellow-100 text-yellow-700",
    Savings: "bg-blue-100 text-blue-700",
    Tax: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition border border-gray-100">
      <div
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-3 ${
          categoryColors[category] || "bg-gray-100 text-gray-700"
        }`}
      >
        {category}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
