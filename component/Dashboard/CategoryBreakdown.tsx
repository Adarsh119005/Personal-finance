// /component/Dashboard/CategoryBreakdown.tsx
"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type CategorySummary = {
  category: string;
  total: number;
};

type Props = {
  data: CategorySummary[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D33F49", "#B39CD0"];

const CategoryBreakdown = ({ data }: Props) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryBreakdown;
