// // /lib/invoice.ts

// export const generateInvoice = (order: any, paymentId: string, orderId: string) => {
//     // You can adjust this to include more detailed info as needed
//     return {
//       invoiceId: `INV-${orderId}-${paymentId}`,  // Generate a unique invoice ID
//       orderId: order.id,
//       paymentId: paymentId,
//       date: new Date().toISOString(),
//       customer: {
//         name: order.user?.name,
//         address: order.address,
//         phone: order.phone,
//       },
//       items: order.orderItems.map((item: any) => ({
//         productId: item.productId,
//         name: item.name,
//         price: item.salesPrice,
//         quantity: item.quantity,
//         total: item.salesPrice * item.quantity,
//       })),
//       totalAmount: order.orderItems.reduce((sum: number, item: any) => sum + (item.salesPrice * item.quantity), 0),
//       status: order.status,
//       currency: "INR",  // Example, can be dynamic
//     };
//   };
  