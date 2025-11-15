import { useState } from "react";
import IncomeExpansesStats from "../components/common/IncomeExpansesStats";
import ReportsFilter from "../components/reports/ReportsFilter";
import { useTransactions } from "../hooks/useTransactions";
import { ReportPeriod, type ReportPeriodType } from "../types/report";

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

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Analyze your financial data</p>
      </div>

      <ReportsFilter
        selectedPeriod={selectedPeriod}
        selectedDate={selectedDate}
        onPeriodSelect={(v) => setSelectedPeriod(v)}
        onDateSelect={(v) => setSelectedDate(v)}
      />

      <div className="text-gray-500">
        Showing {filteredTransactions.length} transactions
      </div>
      <IncomeExpansesStats transactions={filteredTransactions} />
    </div>
  );
}
