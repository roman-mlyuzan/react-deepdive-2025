import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import type { Transaction } from "../../types/transaction";
import TransactionRow from "./TransactionRow";

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
      {/* Fixed table header */}
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
      </table>

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
            return (
              <div
                key={transaction.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`, // Position row at correct scroll offset (GPU-accelerated)
                }}
              >
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <TransactionRow
                      transaction={transaction}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
