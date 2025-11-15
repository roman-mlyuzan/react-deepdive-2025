import type { TransactionCategory } from "./transaction";

export interface Budget {
  id: string;
  category: BudgetCategory;
  amount: number;
  month: string;
  createdAt: string;
}

export type BudgetFormData = Omit<Budget, "id" | "createdAt">;

export type BudgetCategory = Exclude<TransactionCategory, "income">;
