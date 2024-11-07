import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API),{
    apiVersion:"2024-11-1",
    typescript:true,
}