import { useMemo } from "react";
import type { Budget } from "../types/budget";
import type { Transaction } from "../types/transaction";

export default function useBudgetCalculation(
  budget: Budget,
  transactions: Transaction[]
) {
  return useMemo(() => {
    const spent = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category === budget.category &&
          t.date.startsWith(budget.month)
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = (spent / budget.amount) * 100;

    return {
      spent,
      percentage,
      isOverBudget: percentage > 100,
      isWarning: percentage > 80 && percentage <= 100,
    };
  }, [budget, transactions]);
}
