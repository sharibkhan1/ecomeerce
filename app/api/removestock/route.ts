// app/api/cart/remove-out-of-stock/route.js
"use server"

import db from '@/lib/db';
import { getUserIdInfor } from '@/lib/userinfo';

export async function POST() {
  try {
    const userId = await getUserIdInfor();

    // Fetch all cart items for the user
    const cart = await db.cart.findFirst({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });

    if (cart) {
      for (const item of cart.cartItems) {
        const product = await db.product.findUnique({
          where: { id: item.productId },
        });

        // If the product stock is zero, remove it from the cart
        if (product && product.stocks <= 0) {
          await db.cartItem.delete({
            where: { id: item.id },
          });

          // Optionally, you can also update the cart state or inform the user
        }
      }
    }

    return new Response(JSON.stringify({ message: "Out-of-stock items removed successfully." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error checking and removing out-of-stock items:", error);
    return new Response(JSON.stringify({ error: "Something went wrong!" }), {
      status: 500,
    });
  }
}
