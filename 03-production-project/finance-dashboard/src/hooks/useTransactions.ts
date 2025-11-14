import { useEffect, useState } from "react";
import { transactionApi } from "../api/transactions";
import type { Transaction } from "../types/transaction";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const data: Transaction[] = await transactionApi.getAll();
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      setLoading(true);
      setError(null);

      const newTransaction: Transaction = await transactionApi.create(
        transaction
      );
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      await transactionApi.delete(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (
    id: number,
    updatedFields: Omit<Transaction, "id">
  ) => {
    try {
      setLoading(true);
      setError(null);

      const updatedTransaction: Transaction = await transactionApi.update(
        id,
        updatedFields
      );
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? updatedTransaction : t))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    createTransaction,
    deleteTransaction,
    updateTransaction,
  };
}
