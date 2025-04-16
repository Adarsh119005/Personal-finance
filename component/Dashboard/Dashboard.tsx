// /component/Dashboard/Dashboard.tsx
"use client";

import { Transaction } from "../../types/transaction";
import CategoryBreakdown from "./CategoryBreakdown";

type Props = {
  transactions: Transaction[];
};

const Dashboard = ({ transactions }: Props) => {
  const groupByCategory = () => {
    const summaryMap: Record<string, number> = {};

    transactions.forEach((txn) => {
      if (!summaryMap[txn.category]) summaryMap[txn.category] = 0;
      summaryMap[txn.category] += txn.amount;
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
      {/* Add more summary components here later */}
    </div>
  );
};

export default Dashboard;
