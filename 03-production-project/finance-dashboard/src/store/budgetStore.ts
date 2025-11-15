import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Budget, BudgetFormData } from "../types/budget";

interface budgetStore {
  budgets: Budget[];

  // Actions
  addBudget: (data: BudgetFormData) => void;
  updateBudget: (id: string, data: BudgetFormData) => void;
  deleteBudget: (id: string) => void;
  getBudgetByCategory: (category: string, month: string) => Budget | undefined;
}

export const useBudgetStore = create<budgetStore>()(
  persist(
    (set, get) => ({
      budgets: [],

      addBudget: (data) =>
        set((state) => ({
          budgets: [
            ...state.budgets,
            {
              ...data,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateBudget: (id, data) =>
        set((state) => ({
          budgets: state.budgets.map((budget) =>
            budget.id === id ? { ...budget, ...data } : budget
          ),
        })),

      deleteBudget: (id) =>
        set((state) => ({
          budgets: state.budgets.filter((budget) => budget.id !== id),
        })),

      getBudgetByCategory: (category, month) => {
        return get().budgets.find(
          (budget) => budget.category === category && budget.month === month
        );
      },
    }),
    { name: "budget-storage" }
  )
);
