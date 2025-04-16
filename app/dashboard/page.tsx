"use client"
import { useEffect, useState } from "react";
import BudgetComparisonChart from "../../component/BudgetComparisonChart";
import SpendingInsights from "../../component/SpendingInsights";
import { Button } from "@/components/ui/button";

// The data for transactions and budgets will come from your backend or state
const DashboardPage = () => {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  // Fetch budgets from the backend
  const fetchBudgets = async () => {
    const response = await fetch("/api/budget");
    const data = await response.json();
    setBudgets(data);
  };

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    const response = await fetch("/api/transaction");
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  return (
    <main className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Personal Finance Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Budget vs Actual Comparison Chart */}
        <BudgetComparisonChart budgets={budgets} transactions={transactions} />

        {/* Spending Insights */}
        <SpendingInsights budgets={budgets} transactions={transactions} />

        <div className="mt-8">
          <Button className="w-full">Add New Transaction</Button>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
