import { memo } from "react";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import type { Budget } from "../../types/budget";
import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";

interface SpentBudgetProp {
  budget: Budget;
  transactions: Transaction[];

  onDelete: () => void;
  onEdit: () => void;
}

function SpentBudget({
  budget,
  transactions,
  onDelete,
  onEdit,
}: SpentBudgetProp) {
  const { spent, percentage, isOverBudget, isWarning } = useBudgetCalculation(
    budget,
    transactions
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold capitalize">
            {budget.category}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(budget.month + "-01").toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 transition-colors duration-200 font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Spent: {formatCurrency(spent)}</span>
          <span className="text-gray-600">
            Budget: {formatCurrency(budget.amount)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${
              isOverBudget
                ? "bg-red-600"
                : isWarning
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="text-right">
          <span
            className={`text-sm font-semibold ${
              isOverBudget
                ? "text-red-600"
                : isWarning
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {percentage.toFixed(1)}% used
            {isOverBudget && ` (${formatCurrency(spent - budget.amount)} over)`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(SpentBudget);
