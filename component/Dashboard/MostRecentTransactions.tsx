// /components/Dashboard/MostRecentTransactions.tsx
import { Transaction } from "../../types/transaction";

const MostRecentTransactions = ({ transactions }: { transactions: Transaction[] }) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recentTransactions = sortedTransactions.slice(0, 5);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg">Most Recent Transactions</h2>
      <ul className="space-y-2 mt-2">
        {recentTransactions.map((transaction) => (
          <li key={transaction._id} className="flex justify-between">
            <span>{transaction.description}</span>
            <span>${transaction.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostRecentTransactions;
