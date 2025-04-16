import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("finance-app");

export async function GET() {
  try {
    await client.connect();
    const budgets = await db.collection("budgets").find().toArray();
    return NextResponse.json(budgets);
  } catch (error) {
    console.error("GET /api/budget error:", error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { category, amount, month } = await req.json();
    await client.connect();
    const result = await db.collection("budgets").insertOne({ category, amount, month });
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/budget error:", error);
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 });
    }

    await client.connect();
    const result = await db.collection("budgets").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Budget deleted successfully" });
    } else {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("DELETE /api/budget error:", error);
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 });
  }
}
