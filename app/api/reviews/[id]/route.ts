// app/api/reviews/[id]/route.ts

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { rating, comment } = await req.json();

  try {
    const updatedReview = await db.review.update({
      where: { id: String(id) },
      data: { rating, comment },
    });
    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "An error occurred while updating the review." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.review.delete({
      where: { id: String(id) },
    });
    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "An error occurred while deleting the review." }, { status: 500 });
  }
}
