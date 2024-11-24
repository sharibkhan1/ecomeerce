// app/api/cart/count/route.js
import db from '@/lib/db';
import { getUserIdInfor } from '@/lib/userinfo';

export async function POST() {
  try {
    // Get the user ID
    const userId = await getUserIdInfor(); // Return 0 if the user is not logged in
    
    // Fetch the cart items count for the current user
    const cart = await db.cart.findFirst({
      where: { userId },
      include: { cartItems: true },
    });
    
    const itemCount = cart ? cart.cartItems.length : 0;
    
    return new Response(JSON.stringify({ count: itemCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching cart item count:", error);
    return new Response(JSON.stringify({ count: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
