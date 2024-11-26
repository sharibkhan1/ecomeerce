// app/api/cart/remove/route.js (or route.ts if using TypeScript)

import db from '@/lib/db';

export async function POST(req:Request) {
  try {
    // Extract the cartItemId from the request body
    const { cartItemId } = await req.json();  // Assuming the body contains { cartItemId: 'some-id' }

    // Retrieve user ID information (this can be from cookies or session depending on your setup)
    // Ensure the cart item exists and belongs to the user before deleting

    // Delete the cart item
    await db.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Item removed from cart." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return new Response(
      JSON.stringify({ success: false, message: error || "An error occurred while removing the item from the cart." }),
      { status: 500 }
    );
  }
}
