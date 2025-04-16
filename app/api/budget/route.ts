import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("finance-app");

export const GET = async () => {
  try {
    await client.connect();
    const budgets = await db.collection("budgets").find().toArray();
    return NextResponse.json(budgets);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { category, amount, month } = await req.json();
    await client.connect();
    const result = await db.collection("budgets").insertOne({ category, amount, month });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); // Correct way to access query parameters

  if (!id) {
    return NextResponse.json({ error: "Budget ID is required" }, { status: 400 });
  }

  try {
    await client.connect();
    const result = await db.collection("budgets").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Budget deleted successfully" });
    } else {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 });
  }
};
