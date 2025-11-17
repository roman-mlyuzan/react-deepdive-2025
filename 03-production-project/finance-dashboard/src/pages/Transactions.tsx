import { useRef, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import { SkeletonTable } from "../components/common/Skeleton";
import AddTransactionForm from "../components/transactions/AddTransactionForm";
import EditTransactionForm from "../components/transactions/EditTransactionForm";
import TransactionRow from "../components/transactions/TransactionRow";
import VirtualizedTransactionTable from "../components/transactions/VirtualizedTransactionTable";
import { useTransactionMutations } from "../hooks/useTransactionMutations";
import { useTransactionsQuery } from "../hooks/useTransactionsQuery";
import type { Transaction } from "../types/transaction";

// Threshold for switching to virtual scrolling
const VIRTUALIZATION_THRESHOLD = 50;

export default function Transactions() {
  const {
    data: transactions = [],
    isLoading: loading,
    error,
  } = useTransactionsQuery();
  const mutations = useTransactionMutations();

  const [dialogMode, setDialogMode] = useState<"add" | "edit" | null>(null);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openAddDialog = () => {
    setDialogMode("add");
    setEditingTransaction(null);
    dialogRef.current?.showModal();
  };

  const openEditDialog = (transaction: Transaction) => {
    setDialogMode("edit");
    setEditingTransaction(transaction);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    setDialogMode(null);
    setEditingTransaction(null);
    dialogRef.current?.close();
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Transactions</h1>
        </div>
        <SkeletonTable />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">
          Error loading transactions: {error?.message || String(error)}
        </div>
      </div>
    );
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      mutations.remove.mutate(id);
    }
  };

  const handleCreate = async (transaction: Omit<Transaction, "id">) => {
    return mutations.create.mutateAsync(transaction);
  };

  const handleUpdate = async (
    id: number,
    transaction: Omit<Transaction, "id">
  ) => {
    return mutations.update.mutateAsync({ id, transaction });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          onClick={openAddDialog}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Add transaction
        </button>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon="💸"
          title="No transactions yet"
          description="Start tracking your finances by adding your first transaction. Click the button above to get started!"
          action={{
            label: "Add Your First Transaction",
            onClick: openAddDialog,
          }}
        />
      ) : transactions.length > VIRTUALIZATION_THRESHOLD ? (
        // Use virtual scrolling for large datasets (50+ items)
        <VirtualizedTransactionTable
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={openEditDialog}
        />
      ) : (
        // Use regular table for small datasets (better for animations)
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={handleDelete}
                  onEdit={openEditDialog}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog
        onMouseDown={(e) => {
          if (e.target === dialogRef.current) {
            closeDialog();
          }
        }}
        ref={dialogRef}
        className="rounded-lg p-6 backdrop:bg-black/50 min-w-[500px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClose={closeDialog}
      >
        {dialogMode === "add" && (
          <AddTransactionForm
            onAddTransaction={handleCreate}
            onSuccess={closeDialog}
          />
        )}
        {dialogMode === "edit" && editingTransaction && (
          <EditTransactionForm
            onEditTransaction={handleUpdate}
            onSuccess={closeDialog}
            transaction={editingTransaction}
          />
        )}
      </dialog>
    </div>
  );
}
