import type { Transaction } from "../types/transaction";

export function exportTransactionsToCsv(
  transactions: Transaction[],
  filename: string
): boolean {
  if (transactions.length === 0) {
    return false;
  }

  try {
    // Define CSV headers
    const headers = ["Date", "Description", "Category", "Type", "Amount"];

    // Convert transactions to CSV rows
    const rows = transactions.map((t) => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`, // Escape quotes in description
      t.category,
      t.type,
      t.amount.toString(),
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    return true;
  } catch (error) {
    console.error("Failed to export CSV:", error);
    return false;
  }
}
