import { useState } from "react";
import EmptyState from "../components/common/EmptyState";
import { SkeletonCard } from "../components/common/Skeleton";
import IncomeExpansesStats from "../components/common/IncomeExpansesStats";
import CategoryBreakdownTable from "../components/reports/CategoryBreakdownTable";
import ReportsFilter from "../components/reports/ReportsFilter";
import { useTransactions } from "../hooks/useTransactions";
import { useToastStore } from "../store/toastStore";
import { ReportPeriod, type ReportPeriodType } from "../types/report";
import { exportTransactionsToCsv } from "../utils/exportToCsv";

export default function Reports() {
  const { transactions, loading } = useTransactions();
  const { addToast } = useToastStore();
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriodType>(
    ReportPeriod.MONTH
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const filteredTransactions = transactions.filter((t) => {
    if (selectedPeriod === ReportPeriod.ALL) return true;

    if (selectedPeriod === ReportPeriod.MONTH) {
      return t.date.startsWith(selectedDate);
    }

    if (selectedPeriod === ReportPeriod.YEAR) {
      return t.date.startsWith(selectedDate.slice(0, 4));
    }

    return true;
  });

  const handleExport = () => {
    // Generate filename based on period
    let filename = "transactions";
    if (selectedPeriod === ReportPeriod.MONTH) {
      filename = `transactions-${selectedDate}.csv`;
    } else if (selectedPeriod === ReportPeriod.YEAR) {
      filename = `transactions-${selectedDate.slice(0, 4)}.csv`;
    } else {
      filename = "transactions-all.csv";
    }

    const success = exportTransactionsToCsv(filteredTransactions, filename);

    if (success) {
      addToast("CSV file exported successfully", "success");
    } else {
      addToast("No transactions to export", "warning");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1">Analyze your financial data</p>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Analyze your financial data</p>
        </div>
        <EmptyState
          icon="📈"
          title="No data to analyze"
          description="Start adding transactions to see detailed reports and insights about your spending patterns."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Analyze your financial data</p>
        </div>
        <button
          onClick={handleExport}
          disabled={filteredTransactions.length === 0}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:hover:shadow-none"
        >
          Export to CSV
        </button>
      </div>

      <ReportsFilter
        selectedPeriod={selectedPeriod}
        selectedDate={selectedDate}
        onPeriodSelect={(v) => setSelectedPeriod(v)}
        onDateSelect={(v) => setSelectedDate(v)}
      />
      <IncomeExpansesStats transactions={filteredTransactions} />

      <div className="text-gray-500">
        Showing {filteredTransactions.length} transactions
      </div>
      <CategoryBreakdownTable transactions={filteredTransactions} />
    </div>
  );
}
