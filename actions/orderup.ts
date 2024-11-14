// /app/actions/orderActions.server.ts
"use server"
import db from '@/lib/db';

export async function updateOrderState(orderItemId: string, newState: 'Packing' | 'Shipped' | 'Delivered' | 'CancelOrder') {
    return await db.orderItem.update({
        where: { id: orderItemId },
        data: {
          orderState: newState,
        },
    });
};

export async function updateOrderItemStatus(orderItemId: string, newStatus: 'Ordered' | 'Cancel') {
  try {

    await db.orderItem.update({
      where: { id: orderItemId },
      data: {
        status: newStatus,
      },
    });

    const orderItem = await db.orderItem.findUnique({
      where: { id: orderItemId },
      select: {
        productId: true,
        quantity: true,
      },
    });

    if (orderItem) {
      // If the status is being changed to 'Cancel', add the quantity back to the product's stock
      if (newStatus === 'Cancel') {
        await db.product.update({
          where: { id: orderItem.productId },
          data: {
            stocks: {
              increment: orderItem.quantity || 1, // Add back the quantity, default to 1 if undefined
            },
          },
        });
      }
    }
  } catch (err) {
    console.error("Error updating order item status:", err);
    throw new Error("Failed to update order item status. Please try again.");
  }
}

// utils/calculateTotalAmount.ts
