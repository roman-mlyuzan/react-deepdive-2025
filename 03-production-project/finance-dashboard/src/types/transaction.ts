export const TransactionCategory = {
  INCOME: "income",
  FOOD: "food",
  TRANSPORT: "transport",
  ENTERTAINMENT: "entertainment",
  BILLS: "bills",
  SHOPPING: "shopping",
  HEALTH: "health",
  OTHER: "other",
} as const;

export type TransactionCategory =
  (typeof TransactionCategory)[keyof typeof TransactionCategory];

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: TransactionCategory;
  date: string; // ISO date string
  type: "income" | "expense";
}
