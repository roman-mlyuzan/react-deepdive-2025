import { z } from "zod";

const transactionSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Too long"),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["income", "expense"], { message: "Type is required" }),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export default function AddTransactionForm() {
  return <div>AddTransactionForm</div>;
}
