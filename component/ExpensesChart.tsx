import { Transaction } from "../types/transaction";  // Correct import
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  transactions: Transaction[];
};

export default function ExpensesChart({ transactions }: Props) {
  const monthlyData = getMonthlyTotals(transactions);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function getMonthlyTotals(transactions: Transaction[]) {
  const monthlyMap = new Map();

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + tx.amount);
  });

  return Array.from(monthlyMap.entries()).map(([month, total]) => ({ month, total }));
}
