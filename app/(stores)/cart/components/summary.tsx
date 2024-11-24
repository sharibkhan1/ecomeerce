"use client";
import { fetchCartItems } from "@/actions/cartfuntion";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { UserDetail } from "@/components/userdetail";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SummaryProps {
  itemss: CartItem[]; // Ensure you're passing the latest items
}
type CartItem = {
  id: string;
  name: string;
  salesPrice: number | null;
  image: string;
  quantity: number;
  color: string | null;
  size: string | null;
};
type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
const Summary = ({ itemss }: SummaryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open,setOpen] = useState(false);
  const [loading,] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]); // Initialize items state with CartItem type
  const [isProcessing, setIsProcessing] = useState(false); // Track processing state

  const user =  useCurrentUser();

  const loadCartItems  = async () => {
    const data = await fetchCartItems(); // Call the fetchCartItems function
    setItems(data);
  };

  useEffect(() => {
    loadCartItems();

    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      setIsProcessing(false);
      setItems([]);
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
      setIsProcessing(false);
      router.refresh();
    }
  }, [searchParams, router]);
  const hasOutOfStockItems = items.some(item => item.quantity <= 0);

  // Calculate total price based on quantity of each item
  const totalPrice = itemss.reduce((total, item) => {
    return total + (item.salesPrice ? item.salesPrice : 0) * item.quantity;
  }, 0);

  // Handle Checkout using Razorpay
  const onCheckout = async () => {
    if (hasOutOfStockItems) {
      toast.error("One or more items are out of stock. Please remove them before proceeding.");
      window.location.reload();
      return; // Prevent checkout if any item has 0 quantity

    }
    setIsProcessing(true);
    try {
      const orderItems = items.map((item) => ({
        id: item.id,
        color: item.color,  // Pass the color of the item
        size: item.size,    // Pass the size of the item
        quantity: item.quantity, // Pass the quantity of the item
        price: item.salesPrice,
      }));
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        body: JSON.stringify({
          orderItems, // Send the orderItems array with all item details
          totalPrice: totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const { order } = await response.json();
      // if (hasOutOfStockItems) {
      //   toast.error("One or more items are out of stock. Please remove them before proceeding.");
      //   window.location.reload();

      //   if (window.Razorpay) {
      //     const paymentObject = new (window as any).Razorpay();
      //     paymentObject.close();

      //   }
  
      //   return; // Prevent checkout if any item has 0 quantity
      // }
      if (order) {
        const options = {
          key: process.env.RAZOR_KEY!, // Razorpay public key
          name: "Your Company",
          amount: order.amount, // Amount in paise
          currency: order.currency,
          order_id: order.id,
          description: "Order Description",
          handler: async function (response: RazorpayResponse) {
            try {
              const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/createOrder`, {
                method: "POST",
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              
              const result = await verifyResponse.json();
              if (result.message === "success") {
                toast.success("Payment successful.");
                router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/myorder`);
              } else {
                toast.error("Payment failed.");
              }
            } catch (error) {
              toast.error("Failed to verify payment. Please try again.");
            }finally {
              setIsProcessing(false); // Reset processing after payment attempt
            }
          },
          prefill: {
            name: user?.name || "no name",
            email: user?.email || "noemail@gmail.com",
            contact: user?.phoneno || "1",
          },
          notes: {
            address: user?.address || "Customer Address",
            phone: user?.phoneno || "9876543210",
          },
        };
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
  
        paymentObject.on("payment.failed", function () {
          toast.error("Payment failed. Please try again.");
          setIsProcessing(false); // Reset processing after failure
        });
      }
    } catch (error) {
      toast.error("Failed to initiate checkout. Please try again.");
      setIsProcessing(false); // Reset processing on error

    }
  };
  

  return (
    <div className="mt-16 rounded-lg dark:bg-muted-foreground bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <UserDetail isOpen={open} onClose={() => setOpen(false)} onConfirm={onCheckout} loading={loading} />
      <Button disabled={isProcessing} variant="stretch"  onClick={() => setOpen(true)} className="w-full mt-6 bg-yellow-300">
      {isProcessing ? "Finalizing..." : "Checkout"}
      </Button>
    </div>
  );
};

export default Summary;
