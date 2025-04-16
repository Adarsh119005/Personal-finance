import { connectToDB } from "../../../lib/db";
import { Transaction } from "../../../lib/models/Transaction"; 
import { NextResponse } from "next/server";

// app/api/transaction/route.ts

// POST request to add a transaction
export async function POST(req: Request) {
  try {
    await connectToDB();
    const { amount, description, date, category } = await req.json();

    // Basic validation
    if (!description || !amount || !date || !category) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newTransaction = await Transaction.create({
      description,
      amount,
      date: new Date(date),
      category,
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ message: "Failed to add transaction" }, { status: 500 });
  }
}

// GET: Fetch all transactions
export async function GET() {
  try {
    await connectToDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ message: "Failed to fetch transactions" }, { status: 500 });
  }
}