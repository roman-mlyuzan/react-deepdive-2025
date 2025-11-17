import IncomeExpansesStats from "../components/common/IncomeExpansesStats";
import IncomeExpansesChart from "../components/dashboard/IncomeExpansesChart";
import SpendingByCategoryChart from "../components/dashboard/SpendingByCategoryChart";
import { useTransactionsQuery } from "../hooks/useTransactionsQuery";

export default function Dashboard() {
  const { data: transactions = [], isLoading } = useTransactionsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <IncomeExpansesStats transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpansesChart transactions={transactions} />
          <SpendingByCategoryChart transactions={transactions} />
        </div>
      </div>
    </>
  );
}
