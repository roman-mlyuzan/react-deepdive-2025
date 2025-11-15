import { useState } from "react";
import IncomeExpansesStats from "../components/common/IncomeExpansesStats";
import { IncomeExpansesChart } from "../components/dashboard/IncomeExpansesChart";
import SpendingByCategoryChart from "../components/dashboard/SpendingByCategoryChart";
import { useTransactions } from "../hooks/useTransactions";

// Test component that throws error during render
function BuggyComponent(): never {
  throw new Error("💥 Intentional error for testing Error Boundary!");
}

export default function Dashboard() {
  const { transactions, loading } = useTransactions();
  const [showBuggy, setShowBuggy] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Temporary: Test Error Boundary */}
        <button
          onClick={() => setShowBuggy(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          🧪 Test Error Boundary (Trigger Render Error)
        </button>

        {/* This will throw error during render when showBuggy is true */}
        {showBuggy && ((<BuggyComponent />) as unknown as React.ReactElement)}

        <IncomeExpansesStats transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpansesChart transactions={transactions} />
          <SpendingByCategoryChart transactions={transactions} />
        </div>
      </div>
    </>
  );
}
