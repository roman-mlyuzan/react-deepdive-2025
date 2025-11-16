import { z } from "zod";
import { TransactionCategory } from "../types/transaction";

export const transactionSchema = z
  .object({
    description: z
      .string()
      .min(1, "Description is required")
      .max(100, "Too long"),
    amount: z.number().positive("Amount must be positive"),
    category: z.enum(TransactionCategory, { message: "Category is required" }),
    date: z.string().min(1, "Date is required"),
    type: z.enum(["income", "expense"], { message: "Type is required" }),
  })
  .refine(
    (data) => {
      if (data.type === "income") {
        return data.category === "income";
      }

      if (data.type === "expense") {
        return data.category !== "income";
      }

      return true;
    },
    {
      message: "Income must use 'income' category, expenses cannot",
      path: ["category"],
    }
  );

export type TransactionFormData = z.infer<typeof transactionSchema>;
