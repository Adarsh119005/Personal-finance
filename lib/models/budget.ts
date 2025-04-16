import mongoose, { Schema } from "mongoose";

const BudgetSchema = new Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., "2025-04"
});

const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

export default Budget;
