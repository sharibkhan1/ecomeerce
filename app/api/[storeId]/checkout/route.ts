import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import db from "@/lib/db"; // Assuming you're using Prisma
import { currentUserId } from "@/lib/auth";

// Initialize Razorpay instance with your keys
const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY!,
  key_secret: process.env.RAZOR_SECRET_KEY!,
});
interface OrderItem {
  id: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}
interface EnrichedOrderItem {
  id: string |undefined;
  quantity: number;
  size: string;
  color: string;
  price: number;
  productId: string;
  productname: string;
  dilevery: string;
  image: string;
}
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  
  try {
    const { orderItems, totalPrice }: { orderItems: OrderItem[], totalPrice: number } = await req.json();
    const userId = await currentUserId();
    if (orderItems.length === 0) {
      window.location.reload();
      return NextResponse.json({ error: "Cart is empty, cannot proceed with order." }, { status: 400 });
    }
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        address: true,
        phoneno: true,
      },
    });
    // Fetch product details for each order item
    const enrichedOrderItems: EnrichedOrderItem[] = await Promise.all(orderItems.map(async (item: OrderItem) => {

      // Fetch product details using the item id
      const cartItem = await db.cartItem.findUnique({
        where: { id: item.id },
        select: {
           // Ensure we get the product's ID
          quantity: true, // Cart item quantity
          size: true, // Cart item size
          color: true, // Cart item color
          price: true, // Cart item price
          name: true, // Cart item name
          Image: true, // Cart item image
          product: {
            select: {
              id: true,
              name: true, // Product name
              dilevery: true, // Product delivery details
              images: {
                select: {
                  url: true, // Product image URL
                },
              },
            },
          },
        },
      });
      if (!cartItem?.product?.id) {
        throw new Error(`Product ID not found for order item with ID: ${item.id}`);
      }
      // Enrich the item with product details
      return {
        ...item,
        productId: cartItem?.product?.id, // Ensure productId is set
        productname: cartItem?.product?.name || '',
        dilevery: cartItem?.product?.dilevery || '',
        image: (cartItem?.product?.images && cartItem?.product?.images.length > 0) ? cartItem?.product.images[0].url : '',  // Take first image
      };
    }));

    // Log enrichedOrderItems after all async tasks are completed
    // Calculate total price (already provided from frontend)
    const totalAmount = totalPrice * 100; // Convert to paise (totalPrice already in INR)

    const orderOptions = {
      amount: totalAmount, // Total price in paise
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1, // Automatic payment capture
      notes: {
        orderDetails: enrichedOrderItems.map((item: EnrichedOrderItem) => item.productname).join(", "), 
      },
    };
    

    const order = await instance.orders.create(orderOptions);

    // Create the order in your database
    await db.order.create({
      data: {
        storeId: params.storeId,
        userId: userId ?? '',
        isPaid: false,
        razorpayOrderId: order.id,  // Save Razorpay order ID
        phone: user?.phoneno || "",  // Add user's phone number
        address: user?.address || "", // Add user's address
        orderItems: {
          create: enrichedOrderItems.map((item: EnrichedOrderItem) => ({
            product: {
              connect: { id: item.productId   },
            },
            color: item.color, // Save color
            size: item.size,   // Save size
            quantity: item.quantity, // Save quantity
            Price: item.price,  // Save the price of the order item
            username: user?.name || "",
            productname: item.productname, // Store product name
            dilevery: item.dilevery, // Store delivery details
            image: item.image, // Store image
          })),
        },
      },
    });

    return NextResponse.json({ url: order?.id, order });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}


