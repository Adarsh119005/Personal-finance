"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

type Transaction = {
  _id: string;
  description: string;
  amount: number;
  date: string;
};

export const TransactionChart = ({ transactions }: { transactions: Transaction[] }) => {
  const data = transactions.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: t.amount,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
