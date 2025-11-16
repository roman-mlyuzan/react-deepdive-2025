import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import type { Transaction } from "../../types/transaction";

interface VirtualizedTransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
}

export default function VirtualizedTransactionTable({
  transactions,
  onDelete,
  onEdit,
}: VirtualizedTransactionTableProps) {
  // Reference to the scrollable container
  const parentRef = useRef<HTMLDivElement>(null);

  // Configure the virtualizer
  const rowVirtualizer = useVirtualizer({
    count: transactions.length, // Total number of items
    getScrollElement: () => parentRef.current, // The scrollable element
    estimateSize: () => 57, // Estimated height of each row in pixels
    overscan: 5, // Number of items to render outside visible area (buffer)
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Fixed header using CSS Grid */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-[150px_1fr_150px_150px_120px] gap-4 px-6 py-3">
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </div>
          <div className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </div>
          <div className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </div>
        </div>
      </div>

      {/* Scrollable container with fixed height */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{
          height: "600px", // Fixed height enables scrolling
        }}
      >
        {/* Inner container with total calculated height */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`, // Total height of all items (e.g., 1000 items × 57px = 57,000px)
            width: "100%",
            position: "relative", // For absolute positioning of children
          }}
        >
          {/* Only render visible items + buffer */}
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const transaction = transactions[virtualRow.index];
            const formattedDate = new Date(
              transaction.date
            ).toLocaleDateString();
            const formattedAmount = `${transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}`;

            return (
              <div
                key={transaction.id}
                className="grid grid-cols-[150px_1fr_150px_150px_120px] gap-4 px-6 py-4 hover:bg-gray-50 transition-all duration-100 border-b border-gray-200"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`, // Position row at correct scroll offset (GPU-accelerated)
                }}
              >
                <div className="text-sm text-gray-900">{formattedDate}</div>
                <div className="text-sm text-gray-900 truncate">
                  {transaction.description}
                </div>
                <div className="text-sm text-gray-600">
                  {transaction.category}
                </div>
                <div className="text-sm text-right font-medium">
                  <span
                    className={
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {formattedAmount}
                  </span>
                </div>
                <div className="text-sm text-right space-x-4">
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
