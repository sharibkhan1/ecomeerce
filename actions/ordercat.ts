import useCart from "@/hooks/use-cart"; // Importing the Zustand store
import db from "@/lib/db";

export async function updateOrderDetails(orderId: string) {
  try {
    // Fetch the cart data from Zustand store
    const cartItems = useCart.getState().items;

    // Log the cart items to ensure data is available
    console.log("Cart Items:", cartItems);

    // Initialize variables for aggregated values
    let color = "";
    let size = "";
    let quantity = 0;

    // Iterate through each item in the cart
    cartItems.forEach(item => {
      console.log("Item details:", item);  // Log individual item details

      // Accumulate color, size, and quantity values
      if (item.color?.value) {
        color += item.color.value + ", "; // Append color to the string
      }
      if (item.size?.value) {
        size += item.size.value + ", "; // Append size to the string
      }

      quantity += item.quantity; // Sum the quantity of each item
    });

    // Trim the last comma and space
    color = color.slice(0, -2); // Remove the last comma and space
    size = size.slice(0, -2);   // Remove the last comma and space

    // Log the final aggregated values
    console.log("Aggregated Order Details:", { color, size, quantity });

    // Update the order in the database with the aggregated color, size, and quantity
    await db.order.update({
      where: { id: orderId },
      data: {
        color: color || null,  // Set to null if no color exists
        size: size || null,    // Set to null if no size exists
        quantity,              // Total quantity of items in the cart
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating order details:", error);
    throw new Error("Failed to update order details.");
  }
}
