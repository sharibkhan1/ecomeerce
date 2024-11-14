import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        console.log("event",event)
    } catch (e: any) {
        console.error("Webhook signature verification failed:", e.message);
        return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponents.filter((c) => c !== null).join(', ');

    if (event.type === "checkout.session.completed") {
        console.log("payment was successgugll")
        try {
            // Ensure the order is marked as paid after successful payment
            const order = await db.order.update({
                where: {
                    id: session?.metadata?.orderId, // Ensure that the correct orderId is passed in metadata
                },
                data: {
                    isPaid: true, // Set isPaid to true once payment is successful
                    address: addressString,
                    phone: session?.customer_details?.phone || '',
                },
                include: {
                    orderItems: true,
                },
            });

            const productIds = order.orderItems.map((orderItem) => orderItem.productId);

            await db.product.updateMany({
                where: {
                    id: {
                        in: [...productIds],
                    },
                },
                data: {
                    isArchived: true, // Mark products as archived after purchase
                },
            });

            return new NextResponse(null, { status: 200 });
        } catch (err) {
            console.error("Error updating order:", err);
            return new NextResponse("Failed to update order", { status: 500 });
        }
    }

    return new NextResponse("Unhandled event type", { status: 400 });
}
