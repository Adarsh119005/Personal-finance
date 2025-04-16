'use client';

import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type TransactionFormProps = {
  refetchTransactions: () => void;
  setEditingTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  editingTransaction: Transaction | null;
};

const categories = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];

export const TransactionForm = ({
  editingTransaction,
  refetchTransactions,
  setEditingTransaction,
}: TransactionFormProps) => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount);
      setDate(new Date(editingTransaction.date).toISOString().split("T")[0]);
      setCategory(editingTransaction.category || "");
    }
  }, [editingTransaction]);

  const resetForm = () => {
    setDescription("");
    setAmount(0);
    setDate("");
    setCategory("");
    setEditingTransaction(null);
    setMessage(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      setMessage("Please select a category.");
      setSuccess(false);
      return;
    }

    const newTransaction = { description, amount, date, category };
    const method = editingTransaction ? "PUT" : "POST";
    const url = editingTransaction
      ? `/api/transaction/${editingTransaction._id}`
      : "/api/transaction";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage(editingTransaction ? "✅ Transaction updated!" : "✅ Transaction added!");
      setSuccess(true);
      resetForm();
      refetchTransactions();
    } catch (error) {
      setMessage("❌ Something went wrong!");
      setSuccess(false);
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4">
      <Card className="w-full max-w-lg shadow-lg border border-gray-200 rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {editingTransaction ? "Update your record below." : "Fill in the form to add a new transaction."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <p className={`mb-4 text-sm font-medium ${success ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                type="text"
                placeholder="e.g. Grocery Shopping"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="e.g. 500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(val) => setCategory(val ?? "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
              <Button type="submit" className="w-full sm:w-auto bg-orange">
                {editingTransaction ? "Update" : "Add"} Transaction
              </Button>
              {editingTransaction && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
