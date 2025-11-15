import { useCategoryData } from "../../hooks/useCategoryData";
import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";

type Props = {
  transactions: Transaction[];
};

export default function CategoryBreakdownTable({ transactions }: Props) {
  const categoryData = useCategoryData(transactions);

  if (categoryData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
        <p className="text-center text-gray-500 py-8">
          No expenses in this period
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Category
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Amount
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Transactions
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                % of Total
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map(({ category, amount, count, percentage }) => (
              <tr key={category} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 capitalize">{category}</td>
                <td className="py-3 px-4 text-right font-semibold">
                  {formatCurrency(amount)}
                </td>
                <td className="py-3 px-4 text-right text-gray-600">{count}</td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {percentage.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
