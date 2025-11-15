import { useEffect, useState } from "react";
import { SkeletonCard } from "../components/common/Skeleton";
import SpentBudget from "../components/budgets/SpentBudget";
import { useTransactions } from "../hooks/useTransactions";
import { useBudgetStore } from "../store/budgetStore";
import { useToastStore } from "../store/toastStore";
import type { BudgetFormData } from "../types/budget";
import { TransactionCategory } from "../types/transaction";

const DEFAULT_FORM: BudgetFormData = {
  category: TransactionCategory.FOOD,
  amount: 0,
  month: new Date().toISOString().slice(0, 7), // "yyyy-mm"
};

export default function Budgets() {
  const { budgets, addBudget, updateBudget, deleteBudget } = useBudgetStore();
  const { transactions, loading } = useTransactions();
  const { addToast } = useToastStore();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BudgetFormData>(DEFAULT_FORM);

  useEffect(() => {
    if (editingId) {
      const editingBudget = budgets.find((b) => b.id === editingId);
      if (editingBudget) {
        setFormData({
          category: editingBudget.category,
          amount: editingBudget.amount,
          month: editingBudget.month,
        });
      }
      setIsAdding(true);
    }
  }, [editingId, budgets]);

  const categories = [...Object.values(TransactionCategory)];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicates (if not editing the same one)
    const duplicate = budgets.find(
      (b) =>
        b.category === formData.category &&
        b.month === formData.month &&
        b.id !== editingId
    );

    if (duplicate) {
      addToast("Budget for this category and month already exists", "warning");
      return;
    }

    if (editingId) {
      updateBudget(editingId, formData);
      addToast("Budget updated successfully", "success");
    } else {
      addBudget(formData);
      addToast("Budget added successfully", "success");
    }

    // Reset form and close
    setFormData(DEFAULT_FORM);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData(DEFAULT_FORM);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      deleteBudget(id);
      addToast("Budget deleted successfully", "success");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
            <p className="text-gray-600 mt-1">
              Set and track spending limits by category
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-1">
            Set and track spending limits by category
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
          >
            Add Budget
          </button>
        )}
      </div>
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-md animate-slide-in-left">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Budget" : "Add New Budget"}
          </h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value as typeof formData.category,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Amount
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    amount: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <input
                type="month"
                value={formData.month}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, month: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-md"
              >
                {editingId ? "Update Budget" : "Add Budget"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="space-y-4">
        {budgets.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
            No budgets yet. Add one to start tracking your spending limits!
          </div>
        ) : (
          budgets.map((budget, index) => (
            <div
              key={budget.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SpentBudget
                budget={budget}
                transactions={transactions}
                onDelete={() => handleDelete(budget.id)}
                onEdit={() => setEditingId(budget.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
