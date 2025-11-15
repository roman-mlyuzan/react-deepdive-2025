import { useState } from "react";
import IncomeExpansesStats from "../components/common/IncomeExpansesStats";
import CategoryBreakdownTable from "../components/reports/CategoryBreakdownTable";
import ReportsFilter from "../components/reports/ReportsFilter";
import { useTransactions } from "../hooks/useTransactions";
import { ReportPeriod, type ReportPeriodType } from "../types/report";
import { exportTransactionsToCsv } from "../utils/exportToCsv";

export default function Reports() {
  const { transactions, loading } = useTransactions();
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

    exportTransactionsToCsv(filteredTransactions, filename);
  };

  if (loading) return <div>Loading ...</div>;

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
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
