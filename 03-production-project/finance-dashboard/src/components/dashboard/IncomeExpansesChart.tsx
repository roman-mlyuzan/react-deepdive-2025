import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Transaction } from "../../types/transaction";

interface ChartEntry {
  date: string;
  income: number;
  expenses: number;
}

interface IncomeExpansesChartProps {
  transactions: Transaction[];
}

export function IncomeExpansesChart({
  transactions,
}: IncomeExpansesChartProps) {
  const chartData = transactions.reduce(
    (acc: ChartEntry[], transaction: Transaction) => {
      const date = transaction.date;
      const existingEntry = acc.find(
        (entry: ChartEntry) => entry.date === date
      );

      if (existingEntry) {
        if (transaction.type === "income") {
          existingEntry.income += transaction.amount;
        } else {
          existingEntry.expenses += transaction.amount;
        }
      } else {
        acc.push({
          date,
          income: transaction.type === "income" ? transaction.amount : 0,
          expenses: transaction.type === "expense" ? transaction.amount : 0,
        });
      }

      return acc;
    },
    []
  );

  chartData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4ade80"
            strokeWidth={2}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#f87171"
            strokeWidth={2}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
