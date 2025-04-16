'use client';

import { useState } from "react";
import { Transaction } from "../types/transaction";

type TransactionListProps = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setEditingTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
};

export const TransactionList = ({
  transactions,
  setTransactions,
  setEditingTransaction,
}: TransactionListProps) => {
  const [error, setError] = useState<string | null>(null);

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting transaction");
      }

      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      setError("Failed to delete transaction");
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                ₹{transaction.amount} • {transaction.category} •{" "}
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(transaction)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>&nbsp;&nbsp;
              <button
                onClick={() => deleteTransaction(transaction._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
