// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import shortid from "shortid";
// import db from "@/lib/db"; // Assuming you're using Prisma
// import { currentUserId } from "@/lib/auth";

// // Initialize Razorpay instance with your keys
// const instance = new Razorpay({
//   key_id: process.env.RAZOR_KEY!,
//   key_secret: process.env.RAZOR_SECRET_KEY!,
// });
// export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  
//   try {
//     const { orderItems, totalPrice } = await req.json();
//     const userId = await currentUserId();

//     const user = await db.user.findUnique({
//       where: { id: userId },
//       select: {
//         name: true,
//         address: true,
//         phoneno: true,
//       },
//     });
// console.log(user)
//     // Fetch product details for each order item
//     const enrichedOrderItems = await Promise.all(orderItems.map(async (item: any) => {
//       // Fetch product details using the item id
//       const product = await db.product.findUnique({
//         where: { id: item.id },
//         select: {
//           name: true,
//           dilevery: true,
//           images: true,
//         },
//       });
// console.log(enrichedOrderItems)
//       if (!product) {
//         throw new Error(`Product with ID ${item.id} not found.`);
//       }
//       // Enrich the item with product details
//       return {
//         ...item,
//         productname: product?.name || '',
//         dilevery: product?.dilevery || '',
//         image: (product?.images && product?.images.length > 0) ? product.images[0].url : '',  // Take first image
//       };
//     }));

//     // Calculate total price (already provided from frontend)
//     const totalAmount = totalPrice * 100; // Convert to paise (totalPrice already in INR)
// console.log(totalAmount)
//     const orderOptions = {
//       amount: totalAmount, // Total price in paise
//       currency: "INR",
//       receipt: shortid.generate(),
//       payment_capture: 1, // Automatic payment capture
//       notes: {
//         orderDetails: enrichedOrderItems.map((item: any) => item.productname).join(", "), // Add the names of products
//       },
//     };
//     console.log(orderOptions)

//     const order = await instance.orders.create(orderOptions);
//     console.log(order)

//     // Create the order in your database
//     const crt = await db.order.create({
//       data: {
//         storeId: params.storeId,
//         userId: userId,
//         isPaid: false,
//         razorpayOrderId: order.id,  // Save Razorpay order ID
//         phone: user?.phoneno || "",  // Add user's phone number
//         address: user?.address || "", // Add user's address
//         orderItems: {
//           create: enrichedOrderItems.map((item: any) => ({
//             product: {
//               connect: { id: item.id },
//             },
//             color: item.color, // Save color
//             size: item.size,   // Save size
//             quantity: item.quantity, // Save quantity
//             Price: item.price,  // Save the price of the order item
//             username: user?.name || "",
//             productname: item.productname, // Store product name
//             dilevery: item.dilevery, // Store delivery details
//             image: item.image, // Store image
//           })),
//         },
//       },
//     });
//     console.log(crt)

//     return NextResponse.json({ url: order?.id, order });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json(
//       { error: "Failed to create Razorpay order" },
//       { status: 500 }
//     );
//   }
// }


