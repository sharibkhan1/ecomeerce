// pages/api/cart.js
import db from '@/lib/db';
import { getUserIdInfor } from '@/lib/userinfo';

export async function GET() {
  try {
    const userId = await getUserIdInfor(); // Get user information (user ID)

    // If no user is logged in, return an empty array
    if (!userId) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // Fetch the cart items for the current user
    const cart = await db.cart.findFirst({
      where: { userId },
      include: { cartItems: { include: { product: true } } }, // Include product details
    });

    // Map the cart items to include necessary product details
    const cartItems = cart
      ? cart.cartItems.map(item => ({
          id: item.id,
          name: item.name || item.product.name,
          salesPrice: item.price ?? 0,
          image: item.Image || '', // Use product image if available
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        }))
      : [];

    // Return the cart items as a JSON response
    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return new Response(JSON.stringify([]), { status: 500 }); // Return an empty array in case of an error
  }
}
