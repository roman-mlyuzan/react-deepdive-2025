import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";

interface IncomeExpansesStats {
  transactions: Transaction[];
}

export default function IncomeExpansesStats({
  transactions,
}: IncomeExpansesStats) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
        <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {formatCurrency(totalIncome)}
        </p>
      </div>

      <div
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <h3 className="text-gray-500 text-sm font-medium">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">
          {formatCurrency(totalExpenses)}
        </p>
      </div>

      <div
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <h3 className="text-gray-500 text-sm font-medium">Net Balance</h3>
        <p
          className={`text-3xl font-bold mt-2 ${
            netBalance >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrency(netBalance)}
        </p>
      </div>
    </div>
  );
}
