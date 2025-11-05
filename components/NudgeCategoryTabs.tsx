interface Props {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function NudgeCategoryTabs({ activeCategory, onCategoryChange }: Props) {
  const categories = ["All", "Spending", "Savings", "Investments", "Tax"];

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-5 py-2 rounded-full font-medium border transition ${
            activeCategory === cat
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
