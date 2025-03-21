import db from "@/lib/db";

export const getGraphRevenue = async (storeId: string, year: number) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const yearlyRevenue: { [key: number]: { [key: number]: number } } = {};

  // Calculate yearly and monthly revenue from paid orders
  for (const order of paidOrders) {
    // Filter only those orders where orderItems have the right status and orderState
    const filteredOrderItems = order.orderItems.filter(
      (item) => item.status === "Ordered" && item.orderState === "Delivered"
    );

    if (filteredOrderItems.length === 0) continue; // Skip this order if no valid items

    // Sum up the revenue for each valid order item
    // Loop through each valid order item and calculate revenue based on the item's createdAt
    for (const item of filteredOrderItems) {
      const orderItemYear = item.createdAt.getFullYear(); // Use the createdAt of OrderItem
      const month = item.createdAt.getMonth(); // 0-based index for months

      let revenueForItem = item.product.salesPrice * (item.quantity || 1); // Calculate revenue for the item

      if (!yearlyRevenue[orderItemYear]) yearlyRevenue[orderItemYear] = {};
      yearlyRevenue[orderItemYear][month] = (yearlyRevenue[orderItemYear][month] || 0) + revenueForItem;
    }
  }


  // Prepare the graph data
  const graphData = Object.keys(yearlyRevenue).map((yearStr) => {
    const year = parseInt(yearStr, 10); // Convert year string to number

    return {
      year,
      data: [
        { name: 'Jan', total: yearlyRevenue[year][0] || 0 },
        { name: 'Feb', total: yearlyRevenue[year][1] || 0 },
        { name: 'Mar', total: yearlyRevenue[year][2] || 0 },
        { name: 'Apr', total: yearlyRevenue[year][3] || 0 },
        { name: 'May', total: yearlyRevenue[year][4] || 0 },
        { name: 'Jun', total: yearlyRevenue[year][5] || 0 },
        { name: 'Jul', total: yearlyRevenue[year][6] || 0 },
        { name: 'Aug', total: yearlyRevenue[year][7] || 0 },
        { name: 'Sep', total: yearlyRevenue[year][8] || 0 },
        { name: 'Oct', total: yearlyRevenue[year][9] || 0 },
        { name: 'Nov', total: yearlyRevenue[year][10] || 0 },
        { name: 'Dec', total: yearlyRevenue[year][11] || 0 },
      ],
    };
  });

  return graphData;
};


export const getYearOrderStatus = async (storeId: string) => {
  // Fetch all orders for the store, including their OrderItems
  const orders = await db.order.findMany({
    where: { storeId },
    include: {
      orderItems: true, // Include all order items
    },
  });

  const yearlyStatus: { [key: number]: { [key: number]: { Ordered: number; Cancel: number } } } = {};

  // Iterate over each order and aggregate statuses from orderItems
  for (const order of orders) {
    for (const item of order.orderItems) {
      const year = item.createdAt.getFullYear(); // Extract year from OrderItem's creation date
      const month = item.createdAt.getMonth(); // 0-based month index

      // Ensure year and month entries exist
      if (!yearlyStatus[year]) yearlyStatus[year] = {};
      if (!yearlyStatus[year][month]) yearlyStatus[year][month] = { Ordered: 0, Cancel: 0 };

      // Increment count based on OrderItem's status
      if (item.status === 'Ordered') {
        yearlyStatus[year][month].Ordered += 1;
      } else if (item.status === 'Cancel') {
        yearlyStatus[year][month].Cancel += 1;
      }
    }
  }

  // Prepare graph data for visualization
  const graphData = Object.keys(yearlyStatus).map((yearStr) => {
    const year = parseInt(yearStr, 10);

    return {
      year,
      data: [
        { name: 'Jan', Ordered: yearlyStatus[year][0]?.Ordered || 0, Cancel: yearlyStatus[year][0]?.Cancel || 0, total: (yearlyStatus[year][0]?.Ordered || 0) + (yearlyStatus[year][0]?.Cancel || 0) },
        { name: 'Feb', Ordered: yearlyStatus[year][1]?.Ordered || 0, Cancel: yearlyStatus[year][1]?.Cancel || 0, total: (yearlyStatus[year][1]?.Ordered || 0) + (yearlyStatus[year][1]?.Cancel || 0) },
        { name: 'Mar', Ordered: yearlyStatus[year][2]?.Ordered || 0, Cancel: yearlyStatus[year][2]?.Cancel || 0, total: (yearlyStatus[year][2]?.Ordered || 0) + (yearlyStatus[year][2]?.Cancel || 0) },
        { name: 'Apr', Ordered: yearlyStatus[year][3]?.Ordered || 0, Cancel: yearlyStatus[year][3]?.Cancel || 0, total: (yearlyStatus[year][3]?.Ordered || 0) + (yearlyStatus[year][3]?.Cancel || 0) },
        { name: 'May', Ordered: yearlyStatus[year][4]?.Ordered || 0, Cancel: yearlyStatus[year][4]?.Cancel || 0, total: (yearlyStatus[year][4]?.Ordered || 0) + (yearlyStatus[year][4]?.Cancel || 0) },
        { name: 'Jun', Ordered: yearlyStatus[year][5]?.Ordered || 0, Cancel: yearlyStatus[year][5]?.Cancel || 0, total: (yearlyStatus[year][5]?.Ordered || 0) + (yearlyStatus[year][5]?.Cancel || 0) },
        { name: 'Jul', Ordered: yearlyStatus[year][6]?.Ordered || 0, Cancel: yearlyStatus[year][6]?.Cancel || 0, total: (yearlyStatus[year][6]?.Ordered || 0) + (yearlyStatus[year][6]?.Cancel || 0) },
        { name: 'Aug', Ordered: yearlyStatus[year][7]?.Ordered || 0, Cancel: yearlyStatus[year][7]?.Cancel || 0, total: (yearlyStatus[year][7]?.Ordered || 0) + (yearlyStatus[year][7]?.Cancel || 0) },
        { name: 'Sep', Ordered: yearlyStatus[year][8]?.Ordered || 0, Cancel: yearlyStatus[year][8]?.Cancel || 0, total: (yearlyStatus[year][8]?.Ordered || 0) + (yearlyStatus[year][8]?.Cancel || 0) },
        { name: 'Oct', Ordered: yearlyStatus[year][9]?.Ordered || 0, Cancel: yearlyStatus[year][9]?.Cancel || 0, total: (yearlyStatus[year][9]?.Ordered || 0) + (yearlyStatus[year][9]?.Cancel || 0) },
        { name: 'Nov', Ordered: yearlyStatus[year][10]?.Ordered || 0, Cancel: yearlyStatus[year][10]?.Cancel || 0, total: (yearlyStatus[year][10]?.Ordered || 0) + (yearlyStatus[year][10]?.Cancel || 0) },
        { name: 'Dec', Ordered: yearlyStatus[year][11]?.Ordered || 0, Cancel: yearlyStatus[year][11]?.Cancel || 0, total: (yearlyStatus[year][11]?.Ordered || 0) + (yearlyStatus[year][11]?.Cancel || 0) },
      ],
    };
  });

  return graphData;
};



export const getDailyRevenue = async (storeId: string, year: number) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const dailyRevenue: { [key: number]: { [key: number]: number } } = {};

  // Loop through each paid order
  for (const order of paidOrders) {
    // Filter only those orderItems that were created in the given year
    const filteredOrderItems = order.orderItems.filter((item) => {
      const itemYear = item.createdAt.getFullYear(); // Get the year of the order item
      return itemYear === year && item.status === "Ordered" && item.orderState === "Delivered";
    });

    if (filteredOrderItems.length === 0) continue; // Skip if no valid items for the specified year

    // Loop through each valid order item and calculate revenue based on createdAt
    for (const item of filteredOrderItems) {
      const month = item.createdAt.getMonth(); // 0-based index for months
      const day = item.createdAt.getDate(); // Day of the month
      let revenueForItem = item.product.salesPrice * (item.quantity || 1); // Calculate revenue for the item

      if (!dailyRevenue[month]) dailyRevenue[month] = {}; // Initialize month if it doesn't exist
      dailyRevenue[month][day] = (dailyRevenue[month][day] || 0) + revenueForItem; // Add to the existing revenue
    }
  }

  // Prepare the graph data with monthly breakdown
  const graphData = Object.keys(dailyRevenue).map((monthStr) => {
    const month = parseInt(monthStr, 10);

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the current month

    const monthlyData = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1; // Day of the month (1-based index)
      return {
        name: `${day}`, // Day as string
        total: dailyRevenue[month][day] || 0, // Total revenue for the day
      };
    });

    return {
      month: month + 1, // Month (1-based index)
      data: monthlyData,
    };
  });

  return graphData;
};


export const getDailyOrderStatus = async (storeId: string, year: number) => {
  const orders = await db.order.findMany({
    where: {
      storeId,
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      },
    },
    include: {
      orderItems: {
        where: {
          status: {
            in: ['Ordered', 'Cancel'], // Filter by 'Ordered' or 'Cancel' status on OrderItems
          },
        },
      },
    },
  });

  // Aggregate data by month and day, and track each item's status
  const dailyStatus: { [month: number]: { [day: number]: { Ordered: number; Cancel: number } } } = {};

  // Initialize dailyStatus for each month
  for (let month = 0; month < 12; month++) {
    dailyStatus[month] = {};
  }

  // Fill the dailyStatus with actual data from the orders
  for (const order of orders) {
    const month = order.createdAt.getMonth(); // 0-based month index
    const day = order.createdAt.getDate(); // Day of the month

    // Ensure the object exists for the current day and increment the corresponding status
    for (const item of order.orderItems) {
      if (item.status === 'Cancel') {
        dailyStatus[month][day] = dailyStatus[month][day] || { Ordered: 0, Cancel: 0 };
        dailyStatus[month][day].Cancel += 1;
      } else if (item.status === 'Ordered') {
        dailyStatus[month][day] = dailyStatus[month][day] || { Ordered: 0, Cancel: 0 };
        dailyStatus[month][day].Ordered += 1;
      }
    }
  }

  // Prepare the graph data with monthly breakdown
  const graphData = Object.keys(dailyStatus).map((monthStr) => {
    const month = parseInt(monthStr, 10);

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the current month

    const monthlyData = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1; // Day of the month (1-based index)
      return {
        name: `${day}`, // Day as string
        Ordered: dailyStatus[month][day]?.Ordered || 0,
        Cancel: dailyStatus[month][day]?.Cancel || 0,
      };
    });

    return {
      month: month + 1, // Month (1-based index)
      data: monthlyData,
    };
  }) .filter((monthData) => {
    const hasData = monthData.data.some(
      (dayData) => dayData.Ordered > 0 || dayData.Cancel > 0
    );
    return hasData; // Only keep months with actual data
  });

  return graphData;
};
