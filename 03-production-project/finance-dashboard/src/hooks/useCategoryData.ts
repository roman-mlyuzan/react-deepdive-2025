import { useMemo } from "react";
import type { CategoryData } from "../types/category";
import type { GroupedExpensesReportEntry } from "../types/report";
import type { Transaction } from "../types/transaction";

export function useCategoryData(transactions: Transaction[]) {
  const categoryData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");

    if (expenses.length === 0) return [];

    let totalExpenses = 0;

    //Group by category
    const grouped = expenses.reduce((acc, t) => {
      totalExpenses += t.amount;

      if (!acc[t.category]) {
        acc[t.category] = { amount: 0, count: 0 };
      }
      acc[t.category].amount += t.amount;
      acc[t.category].count += 1;
      return acc;
    }, {} as GroupedExpensesReportEntry);

    // Convert to array and calculate percentages
    const data: CategoryData[] = Object.entries(grouped).map(
      ([category, { amount, count }]) => ({
        category,
        amount,
        count,
        percentage: (amount / totalExpenses) * 100,
      })
    );

    // Sort by amount
    return data.sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return categoryData;
}
