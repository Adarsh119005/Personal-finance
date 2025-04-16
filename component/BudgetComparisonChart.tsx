import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Define the type for the chart data
interface BudgetComparisonData {
  category: string;
  budgetedAmount: number;
  actualAmount: number;
}

interface BudgetComparisonChartProps {
  budgets: any[];
  transactions: any[];
}

const BudgetComparisonChart: React.FC<BudgetComparisonChartProps> = ({
  budgets,
  transactions
}) => {
  // Prepare the data for the chart
  const chartData: BudgetComparisonData[] = budgets.map((budget) => {
    const actualSpending = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      category: budget.category,
      budgetedAmount: budget.amount,
      actualAmount: actualSpending,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budgetedAmount" fill="#8884d8" />
        <Bar dataKey="actualAmount" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetComparisonChart;
