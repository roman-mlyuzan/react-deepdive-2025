import { IncomeExpansesChart } from "../components/dashboard/IncomeExpansesChart";
import IncomeExpansesStats from "../components/dashboard/IncomeExpansesStats";
import { useTransactions } from "../hooks/useTransactions";

export default function Dashboard() {
  const { transactions, loading } = useTransactions();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <IncomeExpansesStats transactions={transactions} />
      <IncomeExpansesChart transactions={transactions} />
    </>
  );
}
