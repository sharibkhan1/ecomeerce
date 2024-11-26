import db from "@/lib/db";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        where: {
          status: "Ordered",  // Only include items with status "Ordered"
          orderState: "Delivered",  // Only include items with orderState "Delivered"
        },
        include: {
          product: true,  // Include product details for revenue calculation
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      // Sum up the revenue for each item (salesPrice * quantity)
      return orderSum + (item.product.salesPrice * (item.quantity || 1));
    }, 0);

    // Add the total for this order to the overall revenue
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
