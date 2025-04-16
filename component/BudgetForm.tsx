import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function BudgetForm({
    refetchBudgets,
    budgets, // This is passed as a prop, don't use setBudgets directly here.
    handleDeleteBudget,
}: {
    refetchBudgets: () => void;
    budgets: any[];
    handleDeleteBudget: (id: string) => void;
}) {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [month, setMonth] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [localBudgets, setLocalBudgets] = useState<any[]>(budgets);  // Create a local state variable for budgets

    // 🚀 Fetch budgets (initial load and after adding/removing a budget)
    const fetchBudgets = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/budget");
            const data = await res.json();
            setLocalBudgets(data);  // Update local budgets state
        } catch (error) {
            setError("Failed to load budgets.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        await fetch("/api/budget", {
            method: "POST",
            body: JSON.stringify({ category, amount, month }),
        });
        setCategory("");
        setAmount(0);
        setMonth("");
        fetchBudgets();  // Refresh list
    };

    return (
        <div className="p-4 max-w-md mx-auto space-y-6 border shadow-md rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-semibold">Set Monthly Budget</h2>

                {/* Category */}
                <div>
                    <label className="text-sm font-medium">Select Category</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amount */}
                <div>
                    <label className="text-sm font-medium">Budget Amount</label>
                    <Input
                        type="number"
                        placeholder={amount === 0 ? "Enter budget amount" : `${amount}`}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                    />
                </div>

                {/* Month */}
                <div>
                    <label className="text-sm font-medium">Select Month</label>
                    <Input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    />
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full">
                    {isLoading ? "Saving..." : "Save Budget"}
                </Button>
            </form>

            {/* Loading State */}
            {isLoading && <div>Loading...</div>}

            {/* Error Handling */}
            {error && <div className="text-red-500">{error}</div>}

            {/* 🚧 List of Budgets */}
            {localBudgets.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-md font-semibold mb-2">Your Budgets</h3>
                    <ul className="space-y-2">
                        {localBudgets.map((b: any) => (
                            <li
                                key={b._id}
                                className="flex justify-between items-center border p-2 rounded"
                            >
                                <div>
                                    {b.category} — ₹{b.amount} ({b.month})
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteBudget(b._id)}
                                >
                                    Delete
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
