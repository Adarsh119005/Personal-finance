import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/db";
import { Transaction } from "../../../../lib/models/Transaction";

// PUT request to update a transaction
export async function PUT(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectToDB();
    const body = await req.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ message: "Failed to update transaction" }, { status: 500 });
  }
}

// DELETE request to delete a transaction
export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = params;

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
