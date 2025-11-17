import { useMemo } from "react";
import type { ChartEntry } from "../types/ChartEntry";
import type { Transaction } from "../types/transaction";

export function useIncomeExpensesChartData(
  transactions: Transaction[]
): ChartEntry[] {
  const chartData = useMemo<ChartEntry[]>(() => {
    return [...transactions].reduce(
      (acc: ChartEntry[], transaction: Transaction) => {
        const date = transaction.date;
        const existingEntry = acc.find(
          (entry: ChartEntry) => entry.date === date
        );

        if (existingEntry) {
          if (transaction.type === "income") {
            existingEntry.income += transaction.amount;
          } else {
            existingEntry.expenses += transaction.amount;
          }
        } else {
          acc.push({
            date,
            income: transaction.type === "income" ? transaction.amount : 0,
            expenses: transaction.type === "expense" ? transaction.amount : 0,
          });
        }

        return acc;
      },
      []
    );
  }, [transactions]);

  return chartData;
}
