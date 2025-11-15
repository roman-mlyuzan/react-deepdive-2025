import { ReportPeriod, type ReportPeriodType } from "../../types/report";

type Props = {
  selectedPeriod: ReportPeriodType;
  selectedDate: string;
  onPeriodSelect: (period: ReportPeriodType) => void;
  onDateSelect: (date: string) => void;
};

export default function ReportsFilter({
  selectedPeriod,
  selectedDate,
  onPeriodSelect,
  onDateSelect,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Period
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) =>
              onPeriodSelect(e.target.value as typeof selectedPeriod)
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={ReportPeriod.MONTH}>Monthly</option>
            <option value={ReportPeriod.YEAR}>Yearly</option>
            <option value={ReportPeriod.ALL}>All Time</option>
          </select>
        </div>

        {selectedPeriod === ReportPeriod.MONTH && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <input
              type="month"
              value={selectedDate}
              onChange={(e) => onDateSelect(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {selectedPeriod === ReportPeriod.YEAR && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="number"
              value={selectedDate.slice(0, 4)}
              onChange={(e) => onDateSelect(e.target.value + "-01")}
              min="2020"
              max="2030"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );
}
