import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "../api/transactions";
import { useToastStore } from "../store/toastStore";
import type { Transaction } from "../types/transaction";

const TRANSACTIONS_QUERY_KEY = "transactions";

export function useTransactionMutations() {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const create = useMutation({
    mutationFn: transactionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
      addToast("Transaction added successfully", "success");
    },
    onError: () => {
      addToast("Failed to add transaction", "error");
    },
  });

  const update = useMutation({
    mutationFn: ({
      id,
      transaction,
    }: {
      id: number;
      transaction: Omit<Transaction, "id">;
    }) => transactionApi.update(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
      addToast("Transaction updated successfully", "success");
    },
    onError: () => {
      addToast("Failed to update transaction", "error");
    },
  });

  const remove = useMutation({
    mutationFn: transactionApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
      addToast("Transaction deleted successfully", "success");
    },
    onError: () => {
      addToast("Failed to delete transaction", "error");
    },
  });

  return { create, update, remove };
}
