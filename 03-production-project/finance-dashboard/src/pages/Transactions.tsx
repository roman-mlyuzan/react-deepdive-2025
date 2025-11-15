import { useRef, useState } from "react";
import AddTransactionForm from "../components/transactions/AddTransactionForm";
import EditTransactionForm from "../components/transactions/EditTransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import { useToastStore } from "../store/toastStore";
import type { Transaction } from "../types/transaction";

export default function Transactions() {
  const {
    transactions,
    loading,
    error,
    createTransaction,
    deleteTransaction,
    updateTransaction,
  } = useTransactions();
  const { addToast } = useToastStore();
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
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">
          Error loading transactions: {error}
        </div>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        addToast("Transaction deleted successfully", "success");
      } catch (err) {
        addToast("Failed to delete transaction", "error");
      }
    }
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
        <div className="text-center text-gray-600">No transactions found.</div>
      ) : (
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
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-4">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-900 font-medium pointer"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openEditDialog(transaction)}
                      className="text-blue-600 hover:text-blue-900 font-medium pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
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
            onAddTransaction={createTransaction}
            onSuccess={closeDialog}
          />
        )}
        {dialogMode === "edit" && editingTransaction && (
          <EditTransactionForm
            onEditTransaction={updateTransaction}
            onSuccess={closeDialog}
            transaction={editingTransaction}
          />
        )}
      </dialog>
    </div>
  );
}
