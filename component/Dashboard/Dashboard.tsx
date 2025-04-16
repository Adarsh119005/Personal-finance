// /component/Dashboard/Dashboard.tsx
"use client";

import { Transaction } from "../../types/transaction";
import CategoryBreakdown from "./CategoryBreakdown";

type Props = {
  transactions: Transaction[];
};

type CategoryData = {
  category: string;
  total: number;
}[];

const Dashboard = ({ transactions }: Props) => {
  const groupByCategory = (): CategoryData => {
    const summaryMap: Record<string, number> = {};

    transactions.forEach((txn) => {
      const category = txn.category || "Uncategorized";
      if (!summaryMap[category]) summaryMap[category] = 0;
      summaryMap[category] += txn.amount;
    });

    return Object.entries(summaryMap).map(([category, total]) => ({
      category,
      total,
    }));
  };

  const categoryData = groupByCategory();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <CategoryBreakdown data={categoryData} />
      {/* You can add more insights or cards here later */}
    </div>
  );
};

export default Dashboard;
