import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "../api/transactions";

export function useTransactionsQuery() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: transactionApi.getAll,
  });
}
