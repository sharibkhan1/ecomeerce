import db from "@/lib/db";

// Fetch orders and associated order items for a specific user
export async function fetchUserOrders(userId: string) {
  const orders = await db.order.findMany({
    where: {
      userId: userId,
      isPaid: true, // Only fetch orders where isPaid is true
    },
    orderBy: {
      createdAt: 'desc', // Sort by createdAt in descending order
    },
    select: {
      id: true,
      phone: true,
      address: true,
      createdAt: true,
      userId:true,
      orderItems: {
        select: {
          id: true,
          orderId: true,
          productId: true,
          createdAt: true,
          updatedAt: true,
          color: true,
          size: true,
          Price:true,
          dilevery:true,
          quantity: true,
          status: true,
          username: true, // Ensure username is selected
          image: true,
        },
      },
    },
  });
  const ordersWithValidUsername = orders.map(order => ({
    ...order,
    createdAt: order.createdAt.toISOString(), // Convert Date to string
    orderItems: order.orderItems.map(item => ({
      ...item,
      image: item.image ?? undefined, // Convert null to undefined here
      username: item.username ?? undefined, // Convert null to undefined
      color: item.color ?? undefined, // Convert null to undefined here
      quantity: item.quantity ?? undefined, // Convert null to undefined here
      createdAt: item.createdAt.toISOString(), // Convert Date to string for orderItem
      updatedAt: item.updatedAt.toISOString(),
      dilevery: item.dilevery ?? null, // Ensure 'dilevery' is null if not available
      Price: item.Price ?? undefined, // Convert null to undefined here

    })),
  }));

  return ordersWithValidUsername;
}

