// /components/Dashboard/TotalExpenses.tsx
import { Transaction } from "../../types/transaction";

const getTotalExpenses = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
};

const TotalExpenses = ({ transactions }: { transactions: Transaction[] }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
    <h2 className="font-semibold text-lg">Total Expenses</h2>
    <p className="text-xl font-bold">${getTotalExpenses(transactions).toFixed(2)}</p>
  </div>
);

export default TotalExpenses;
