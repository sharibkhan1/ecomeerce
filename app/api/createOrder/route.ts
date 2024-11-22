"use server"

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher"; // import your pusherServer

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY!,
  key_secret: process.env.RAZOR_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
  const user = await currentUser();
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_SECRET_KEY!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  
  if (isAuthentic) {
    const orderToUpdate = await db.order.findFirst({
      where: { razorpayOrderId: razorpay_order_id },  // Query based on razorpayOrderId
    });
    
    if (orderToUpdate) {
      
      const ordItems = await db.orderItem.findMany({
        where: { orderId: orderToUpdate.id },
      });
      if (ordItems.length === 0) {
        window.location.reload();
        console.log(ordItems)
      }
      // if (ordItems.length === 0) {
      //   console.log(ordItems)
      //   await db.order.update({
      //     where: { id: orderToUpdate.id },
      //     data: {
      //       status: "Cancel", // Mark the order as canceled
      //       isPaid: false,
      //     },
          
      //   });

      //   return NextResponse.json({ message: "Cart is empty, order cancelled." });
      // }
      
      await db.order.update({
        where: { id: orderToUpdate.id },  // Now use ObjectId (id) for update
        data: {
          isPaid: true,
          address:user?.address,
          phone:user?.phoneno,
          status: "Ordered", 
        },
      });

      await db.orderItem.updateMany({
        where: { orderId: orderToUpdate.id }, // Match OrderItems by orderId
        data: {
          status: "Ordered", // Update status of the order items to "Ordered"
        },
      });

      const orderItems = await db.orderItem.findMany({
        where: { orderId: orderToUpdate.id }, // Get all OrderItems for this order
      });

      for (const orderItem of orderItems) {
        const product = await db.product.findUnique({
          where: { id: orderItem.productId }, // Find the product by ID
        });

        if (product) {
          const updatedStock = product.stocks - (orderItem.quantity || 0);

          // Update the stock of the product
          await db.product.update({
            where: { id: product.id },
            data: {
              stocks: updatedStock, // Decrease the stock by the ordered quantity
              CartItem: {
                deleteMany: {}, // Clear all cart items associated with this product
              },
            },
          });



          pusherServer.trigger('product-channel', 'stock-updated', {
            productId: product.id,
            newStock: updatedStock,
          });
        }
      }
      
      return NextResponse.json({ message: "success" });
    } else {
      return NextResponse.json({ message: "fail" }, { status: 400 });
    }
}
}
