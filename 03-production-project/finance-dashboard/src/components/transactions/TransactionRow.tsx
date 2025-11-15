import { memo, useMemo } from "react";
import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";

interface TransactionRowProps {
  transaction: Transaction;
  onDelete: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
}

const TransactionRow = memo(
  ({ transaction, onDelete, onEdit }: TransactionRowProps) => {
    // Memoize expensive date formatting - only recalculates when date changes
    const formattedDate = useMemo(
      () => new Date(transaction.date).toLocaleDateString(),
      [transaction.date]
    );

    // Memoize formatted amount to avoid recalculation
    const formattedAmount = useMemo(
      () =>
        `${transaction.type === "income" ? "+" : "-"}${formatCurrency(
          transaction.amount
        )}`,
      [transaction.type, transaction.amount]
    );

    return (
      <tr className="hover:bg-gray-50 transition-all duration-100 animate-fade-in">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {formattedDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {transaction.description}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {transaction.category}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
          {formattedAmount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-4">
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-red-600 hover:text-red-900 font-medium pointer"
          >
            Delete
          </button>
          <button
            onClick={() => onEdit(transaction)}
            className="text-blue-600 hover:text-blue-900 font-medium pointer"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }
);

TransactionRow.displayName = "TransactionRow";

export default TransactionRow;
