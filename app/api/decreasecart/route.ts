// pages/api/cart/decrease-quantity.ts

import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Parse the incoming request body (cart item ID should be passed)
    const { cartItemId } = await req.json();

    // Ensure cartItemId is provided
    if (!cartItemId) {
      return NextResponse.json(
        { success: false, message: "Cart item ID is required." },
        { status: 400 }
      );
    }

    // Find the cart item
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, message: "Cart item not found." },
        { status: 404 }
      );
    }

    // Ensure quantity doesn't go below 1
    const newQuantity = Math.max(1, cartItem.quantity - 1);

    if (newQuantity === cartItem.quantity) {
      return NextResponse.json(
        { success: false, message: "Quantity cannot be less than 1." },
        { status: 400 }
      );
    }

    // Update the quantity in the database
    await db.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    return NextResponse.json(
      { success: true, message: "Quantity decreased." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while decreasing the quantity." },
      { status: 500 }
    );
  }
}
