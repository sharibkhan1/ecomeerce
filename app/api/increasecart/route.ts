import { currentUserId } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

export async function POST(req:Request) {
  try {
    // Parse the request body for cartItemId
    const { cartItemId } = await req.json();

    // Get the user ID based on the current session or authentication
    const userId = await currentUserId();
    if(!userId){
      redirect("/auth/login");
    }
    // Find the cart item and its related product
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true, cart: { include: { cartItems: true } } },
    });

    if (!cartItem) throw new Error("Cart item not found");

    // Get all cart items for the user with the same productId
    const sameProductItems = cartItem.cart.cartItems.filter(item => item.productId === cartItem.productId);

    // Sum up the total quantity of this product across all cart items
    const totalQuantity = sameProductItems.reduce((sum, item) => sum + item.quantity, 0);

    // Check if the total quantity exceeds the stock of the product
    const currentStock = cartItem.product.stocks;
    const newTotalQuantity = totalQuantity + 1;

    if (newTotalQuantity > currentStock) {
      return new Response(
        JSON.stringify({ success: false, message: "Cannot increase quantity beyond available stock." }),
        { status: 400 }
      );
    }

    // Update the quantity of the specific cart item
    await db.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: cartItem.quantity + 1 },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Quantity increased." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error increasing quantity:", error);
    return new Response(
      JSON.stringify({ success: false, message: error || "An error occurred while increasing the quantity." }),
      { status: 500 }
    );
  }
}
