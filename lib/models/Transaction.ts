// lib/models/Transaction.ts

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true }, // ✅ NEW
});

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
