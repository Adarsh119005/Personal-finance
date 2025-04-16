// app/api/transaction/[id]/route.ts

import { connectToDB } from "../../../../lib/db";
import { Transaction } from "../../../../lib/models/Transaction";
import { NextResponse } from "next/server";

// PUT request to update a transaction by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    await connectToDB();

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ message: "Failed to delete transaction" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;   // Await params before accessing id
  const data = await req.json();
  
  try {
    await connectToDB();

    const body = await req.json();  // Parse the request body
    
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedTransaction);
    
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ message: "Failed to update transaction" }, { status: 500 });
  }
}
