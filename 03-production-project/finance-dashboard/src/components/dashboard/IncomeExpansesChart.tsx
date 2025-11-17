import { memo, useMemo } from "react";
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
import { useIncomeExpensesChartData } from "../../hooks/useIncomeExpensesChartData";
import type { Transaction } from "../../types/transaction";

interface IncomeExpansesChartProps {
  transactions: Transaction[];
}

function IncomeExpansesChart({ transactions }: IncomeExpansesChartProps) {
  const chartData = useIncomeExpensesChartData(transactions);

  const sortedChartData = useMemo(() => {
    return [...chartData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [chartData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={sortedChartData}
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

export default memo(IncomeExpansesChart);
