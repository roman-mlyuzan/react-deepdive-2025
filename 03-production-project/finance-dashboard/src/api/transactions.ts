import type { Transaction } from "../types/transaction";

const API_BASE_URL = "http://localhost:3001";

export const transactionApi = {
  getAll: async (): Promise<Transaction[]> => {
    // Custom server returns all transactions without pagination
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return response.json();
  },

  getById: async (id: number): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction with id ${id}`);
    }
    return response.json();
  },

  create: async (
    transaction: Omit<Transaction, "id">
  ): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error("Failed to create transaction");
    }
    return response.json();
  },

  update: async (
    id: number,
    transaction: Omit<Transaction, "id">
  ): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error(`Failed to update transaction with id ${id}`);
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete transaction with id ${id}`);
    }
  },
};
