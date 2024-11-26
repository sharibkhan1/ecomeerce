// actions/get-order-items.ts
"use server"
import db from "@/lib/db"


export const getOrderItems = async () => {
  const orderItems = await db.orderItem.findMany({
    select: {
      productname: true,
      createdAt: true,
      color: true,
      size: true,
    }
  })

  // Now we need to count how many times each item was ordered and canceled.
  const orderItemCounts = await Promise.all(orderItems.map(async (item) => {
    const orderCount = await db.orderItem.count({
      where: {
        productname: item.productname,
        status: 'Ordered',
      }
    })

    const canceledCount = await db.orderItem.count({
      where: {
        productname: item.productname,
        status: 'Cancel',
      }
    })

    return {
      ...item,
      orderCount,
      canceledCount,
    }
  }))

  return orderItemCounts
}
