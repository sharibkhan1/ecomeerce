// app/api/reviews/route.ts

import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth"; // Your method for getting the user ID
import db from "@/lib/db";

export async function POST(req: Request) {
  const { productId, rating, comment,image  } = await req.json();
  const userId = await currentUserId();

  if (!userId) {
    return NextResponse.json({ error: "You must be logged in to submit a review." }, { status: 400 });
  }

  try {
    const newReview = await db.review.create({
      data: { productId, userId, rating, comment,image  },
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "An error occurred while creating the review." }, { status: 500 });
  }
}
