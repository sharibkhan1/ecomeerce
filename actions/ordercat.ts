"use server"
import db from '@/lib/db';
import { currentUserId } from '@/lib/auth';

export const addToCart = async ({
  productId,
  color,
  size,
  quantity,
  price,
  name,
  image,
}: {
  productId: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  name:string;
  image: string;
}) => {
  try {
    // Get the current user session

 const userId = await currentUserId();

    // Check if the user already has a cart
    let cart = await db.cart.findFirst({
      where: {
        userId,  // Find the cart for the current user
      },
    });
    
    // If the user doesn't have a cart, create one
    if (!cart) {
      cart = await db.cart.create({
        
        data: {
          userId:userId ?? '',
        },
      });
    }

    // Check if the product already exists in the user's cart (same color, size, etc.)

    const existingCartItems = await db.cartItem.findMany({
      where: {
        cartId: cart.id, // Check if the product is already in the cart
        productId,
      },
    });

    // Sum the total quantity of the existing cart items
    const totalExistingQuantity = existingCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Fetch the product's stock from the database
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, message: "Product not found." };
    }

    const currentStock = product.stocks;
    const newTotalQuantity = totalExistingQuantity + quantity;

    // Check if the total quantity exceeds the product stock
    if (newTotalQuantity > currentStock) {
      return { success: false, message: "Cannot add more items than available stock." };
    }

    const existingCartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id, // Check if the product is already in the cart
        productId,
        color,
        name,
        size,
      },
    });
    
    if (existingCartItem) {
      // If it exists, update the quantity
      await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity, // Add the new quantity
        },
      });
      return { success: true, message: 'Updated cart item quantity.' };
    } else {
      // Otherwise, create a new cart item
      await db.cartItem.create({
        data: {
          cartId: cart.id,  // Link the cart item to the cart
          productId,
          color,
          size,
          name,
          quantity,
          price,
          Image: image,
        },
      });
      return { success: true, message: 'Item added to cart successfully' };
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return { success: false, message: error || 'An error occurred while adding the item to the cart' };
  }
};
