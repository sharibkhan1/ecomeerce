// lib/cart.js
"use server"
import db from '@/lib/db';
import { getUserIdInfor } from '@/lib/userinfo';

export const getCartItemCount = async () => {
  try{
    const userId = await getUserIdInfor(); // Return 0 if the user is not logged in

  // Fetch the cart items count for the current user
  const cart = await db.cart.findFirst({
    where: { userId },
    include: { cartItems: true },
  });

  return cart ? cart.cartItems.length : 0;
}catch (error) {
  console.error("Error fetching cart item count:", error);
  return 0; // Return 0 if there's an error or the user is not authenticated
}
};


export const getCartItems = async () => {
  try {
  const userId = await getUserIdInfor(); // Return an empty array if the user is not logged in

  // Fetch the cart items for the current user
  const cart = await db.cart.findFirst({
    where: { userId },
    include: { cartItems: { include: { product: true } } }, // Including product details
  });

  // Map cart items to include necessary product details
  return cart ? cart.cartItems.map(item => ({
    id: item.id,
    name: item.name || item.product.name,
    salesPrice: item.price ?? 0,
    image: item.Image || "", // Use product image if available
    quantity: item.quantity,
    color: item.color,
    size: item.size,
  })) : [];
} catch (error) {
  console.error("Error fetching cart items:", error);
  return []; // Return an empty array in case of an error
}
};

export const checkAndRemoveOutOfStockItems = async () => {
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
  } catch (error) {
    console.error("Error checking and removing out-of-stock items:", error);
  }
};


export const removeFromCart = async (cartItemId: string) => {
  try {
    const userId = await getUserIdInfor();

    // Delete the cart item
    await db.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return { success: true, message: "Item removed from cart." };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { success: false, message: error || "An error occurred while removing the item from the cart." };
  }
};

export const increaseQuantity = async (cartItemId: string) => {
  try {
    const userId = await getUserIdInfor();

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
      return { success: false, message: "Cannot increase quantity beyond available stock." };
    }

    // Update the quantity of the specific cart item
    await db.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: cartItem.quantity + 1 },
    });

    return { success: true, message: "Quantity increased." };
  } catch (error) {
    console.error("Error increasing quantity:", error);
    return { success: false, message: error || "An error occurred while increasing the quantity." };
  }
};


export const decreaseQuantity = async (cartItemId: string) => {
  try {
    const userId = await getUserIdInfor();

    // Find the cart item
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) throw new Error("Cart item not found");

    // Ensure quantity doesn't go below 1
    const newQuantity = Math.max(1, cartItem.quantity - 1);

    if (newQuantity === cartItem.quantity) {
      return { success: false, message: "Quantity cannot be less than 1." };
    }

    // Update the quantity
    await db.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    return { success: true, message: "Quantity decreased." };
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    return { success: false, message: error || "An error occurred while decreasing the quantity." };
  }
};
