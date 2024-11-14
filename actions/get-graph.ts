import db from "@/lib/db"

interface GraphData{
  name: string,
  total: number,
}

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  const monthlyRevenue: {[key: number]: number} = {};

  // Calculate monthly revenue from paid orders
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();  // 0-based index for months
    let revenueForOrder = 0;

    // Sum up the revenue for each order item
    for (const item of order.orderItems) {
      revenueForOrder += item.product.salesPrice;
    }

    // Accumulate revenue for each month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Prepare the graph data with month names
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Populate the graph data based on the monthly revenue
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;  // Return the graph data, not the orders
}
