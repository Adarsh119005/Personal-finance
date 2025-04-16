"use client";

import Page from "./dashboard/page"
import { useEffect, useState } from "react";
import { TransactionForm } from "../component/TransactionForm";
import { TransactionList } from "../component/TransactionList";
import ExpensesChart from "../component/ExpensesChart";
import Dashboard from "../component/Dashboard/Dashboard";
import BudgetForm from "../component/BudgetForm";
import { Transaction } from "../types/transaction";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [budgets, setBudgets] = useState([]);

  // 💸 Fetch Transactions
  const getTransactions = async () => {
    try {
      const res = await fetch("/api/transaction", {
        cache: "no-store",
      });
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const refetchTransactions = () => {
    getTransactions();
  };

  // 📊 Fetch Budgets
  const fetchBudgets = async () => {
    try {
      const res = await fetch("/api/budget");
      const data = await res.json();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  // ❌ Delete a budget
  const handleDeleteBudget = async (id: string) => {
    try {
      const res = await fetch(`/api/budget?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Budget deleted successfully");
        fetchBudgets();
      } else {
        alert("Failed to delete budget");
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  useEffect(() => {
    getTransactions();
    fetchBudgets();
  }, []);

  return (
    <main className="max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Personal Finance Visualizer</h1>

      {/* 💰 Transaction Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <TransactionForm
          refetchTransactions={refetchTransactions}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
        />
      </div>

      {/* 📊 Chart */}
      <div className="my-8">
        <ExpensesChart transactions={transactions} />
      </div>

      {/* 📋 Transactions List */}
      <div className="my-8">
        <TransactionList
          transactions={transactions}
          setTransactions={setTransactions}
          setEditingTransaction={setEditingTransaction}
        />
      </div>

      {/* 📈 Dashboard */}
      <div className="my-8">
        <Dashboard transactions={transactions} />
      </div>

      {/* 💸 Budgets */}
      <div className="my-8">
      <BudgetForm 
        refetchBudgets={fetchBudgets} 
        budgets={budgets}   // Make sure you are passing 'budgets' here
        handleDeleteBudget={handleDeleteBudget} 
      />
      </div>

      <div className="my-8">
        <Page />
      </div>
    </main>
  );
}
