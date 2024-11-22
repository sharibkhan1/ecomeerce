// app/api/cart/count/route.ts
import db from '@/lib/db';
import { getUserIdInfor } from '@/lib/userinfo';

export async function POST(req: Request) {
  try {
    const userId = await getUserIdInfor();

    if (!userId) {
      return new Response(JSON.stringify({ count: 0 }), { status: 200 });
    }

    // Fetch the cart items count for the current user
    const cart = await db.cart.findFirst({
      where: { userId },
      include: { cartItems: true },
    });

    const count = cart ? cart.cartItems.length : 0;
    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (error) {
    console.error("Error fetching cart item count:", error);
    return new Response(JSON.stringify({ count: 0 }), { status: 500 });
  }
}
