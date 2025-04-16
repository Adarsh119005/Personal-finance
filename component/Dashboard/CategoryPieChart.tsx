// /components/Dashboard/CategoryPieChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Transaction } from "../../types/transaction";

const getCategoryExpenses = (transactions: Transaction[]) => {
  const categoryTotals: { [key: string]: number } = {};

  transactions.forEach((transaction) => {
    if (transaction.category) {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) + transaction.amount;
    }
  });

  return Object.keys(categoryTotals).map((category) => ({
    category,
    total: categoryTotals[category],
  }));
};

const CategoryPieChart = ({ transactions }: { transactions: Transaction[] }) => {
  const data = getCategoryExpenses(transactions);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF3377"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPieChart;
