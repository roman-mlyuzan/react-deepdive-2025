import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  type PieLabel,
} from "recharts";
import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";

interface SpendingByCategoryChart {
  transactions: Transaction[];
}

interface CategoryEntry {
  category: string;
  amount: number;
  [key: string]: string | number;
}

const CATEGORY_COLORS: Record<string, string> = {
  food: "#FF6384",
  transport: "#36A2EB",
  entertainment: "#FFCE56",
  bills: "#4BC0C0",
  shopping: "#9966FF",
  health: "#FF9F40",
  other: "#C9CBCF",
  income: "#4CAF50", // Just in case, though we filter it out
};

export default function SpendingByCategoryChart({
  transactions,
}: SpendingByCategoryChart) {
  const categoryData: CategoryEntry[] = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc: CategoryEntry[], transaction: Transaction) => {
      const category = transaction.category;
      const existingEntry = acc.find(
        (entry: CategoryEntry) => entry.category === category
      );

      if (existingEntry) {
        existingEntry.amount += transaction.amount;
      } else {
        acc.push({
          category,
          amount: transaction.amount,
        });
      }

      return acc;
    }, []);

  // @ts-expect-error - Recharts Pie label type issue
  const renderLabel: PieLabel = ({
    category,
    amount,
  }: {
    category: string;
    amount: number;
  }) => {
    return `${category}: ${formatCurrency(amount)}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          // @ts-expect-error
          <Pie
            data={categoryData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={renderLabel}
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  CATEGORY_COLORS[entry.category] || CATEGORY_COLORS["other"]
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
