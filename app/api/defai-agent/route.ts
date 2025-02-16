import { NextResponse } from "next/server";
import { db } from "../../../db/db"; // Database connection
import { agents } from "../../../db/schema"; 
import { eq } from "drizzle-orm";

// ✅ GET: Fetch all AI agents
export async function GET() {
  try {
    const allAgents = await db.select().from(agents);
    return NextResponse.json({ success: true, data: allAgents });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch agents" }, { status: 500 });
  }
}

// ✅ POST: Add a new AI agent
export async function POST(req: Request) {
  try {
    const { name, description, actionType } = await req.json();

    // Validate request body
    if (!name || !description || !actionType) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // Insert into database
    const [newAgent] = await db.insert(agents).values({
      name,
      description,
      actionType,
    }).returning();

    return NextResponse.json({ success: true, data: newAgent });
  } catch (error) {
    console.error("Error inserting agent:", error);
    return NextResponse.json({ success: false, error: "Failed to add agent" }, { status: 500 });
  }
}

// ✅ DELETE: Remove an AI agent by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await db.delete(agents).where(eq(agents.id, id));

    return NextResponse.json({ success: true, message: "Agent deleted" });
  } catch (error) {
    console.error("Error deleting agent:", error);
    return NextResponse.json({ success: false, error: "Failed to delete agent" }, { status: 500 });
  }
}
