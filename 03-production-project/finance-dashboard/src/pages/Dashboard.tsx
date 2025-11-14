import { useTransactions } from "../hooks/useTransactions";

export default function Dashboard() {
  const { transactions, loading } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          ${totalIncome.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">
          ${totalExpenses.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Net Balance</h3>
        <p
          className={`text-3xl font-bold mt-2 ${
            netBalance >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${netBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
