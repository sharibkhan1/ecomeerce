"use client";
import React, { useState, useEffect, useMemo } from "react";
import NextImage from "next/image";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { updateOrderState } from "@/actions/orderup";
import { Button } from "@/components/ui/button";
import { format, addDays, intervalToDuration, formatDuration } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OrderItem {
    id: string;
    username?: string| null;
    productname?: string| null;
    dilevery?: string| null; // Should be numeric or converted to a number representing days
    image?: string| null;
    color?: string| null;
    size?: string| null;
    quantity?: number| null;
    Price?: number| null;
    status: string| null;
    orderState: "Packing" | "Shipped" | "Delivered" | "CancelOrder";
}

interface Order {
    id: string;
    orderItems: OrderItem[];
    phone: string;
    address: string;
    createdAt: Date;  // Change from string to Date
    userId: string;
}

interface OrderFormProps {
    order: Order | null; // Allow null values for order
}

const OrderForm: React.FC<OrderFormProps> = ({ order }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStates, setSelectedStates] = useState<{ [key: string]: OrderItem["orderState"] }>({});

    const router = useRouter();

    // Early return if order is null, but hooks should still be called before the return

    // Calculate countdowns using useMemo hook
    const countdowns = useMemo(() => {
        if (!order) return {}; // If order is null, return an empty object
        if (!order.orderItems) return {}; // Handle null or undefined orderItems gracefully
        return order.orderItems.reduce((acc, item) => {
            const deliveryDays = parseInt(item.dilevery || "1", 10); // Default to 1 day if undefined
            const endDate = addDays(new Date(order.createdAt), deliveryDays);
            const now = new Date();

            if (endDate > now) {
                const duration = intervalToDuration({ start: now, end: endDate });
                acc[item.id] = formatDuration(duration, { format: ['days', 'hours'] });
            } else {
                acc[item.id] = "Delivered";
            }

            return acc;
        }, {} as { [key: string]: string });
    }, [order]); // Include 'order' as a dependency

    // Set initial states for the order items using useEffect hook
    useEffect(() => {
        
        if (order?.orderItems) {
            const initialStates = order.orderItems.reduce((acc, item) => {
                acc[item.id] = item.orderState;
                return acc;
            }, {} as { [key: string]: OrderItem["orderState"] });
            setSelectedStates(initialStates);
        }
    }, [order]); // Include 'order' as a dependency

    const handleOrderItemStateChange = async (orderItemId: string) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const newState = selectedStates[orderItemId];
            await updateOrderState(orderItemId, newState);
            toast.success("Order item state updated successfully!");
            if (newState === "CancelOrder") {
                toast.success("Stock updated for canceled item!");
            }
            router.refresh();
        } catch (err) {
            toast.error("Failed to update order item state.");
            console.error("Failed to update order item state:", err);
            setError("Failed to update order item state. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStateChange = (orderItemId: string, newState: OrderItem["orderState"]) => {
        setSelectedStates((prevStates) => ({
            ...prevStates,
            [orderItemId]: newState,
        }));
    };

    return (
        <div className="p-6 dark:text-white dark:bg-black/80 bg-white shadow-xl rounded-lg max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold dark:text-white text-gray-800 mb-6">Order Details</h2>

            {/* Order Summary */}
            <div className="border-b pb-6 mb-6">
                <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Ordered At:</strong>{order?.createdAt ? format(new Date(order.createdAt), "MMMM do, yyyy") : "Unknown Date"}</p>
                <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Customer Address:</strong> {order?.address}</p>
                <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Customer Phone:</strong> {order?.phone}</p>
            </div>

            {/* Order Items */}
            <div className="space-y-8">
                <h3 className="text-2xl font-medium dark:text-white text-gray-700">Order Items</h3>
                {order?.orderItems.map((item) => (
                    <div key={item.id} className="border-t border-gray-300 pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Image */}
                        <div className="md:col-span-1 flex justify-center">
                            {item.image ? (
                                <NextImage src={item.image} alt={item.productname || "Product Image"} width={300} height={200} className="object-cover rounded-lg" />
                            ) : (
                                <div className="w-36 h-36 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">No Image</div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="md:col-span-2 space-y-3">
                            <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{item.productname || "Unnamed Product"}</h4>
                            <p className="text-xl"><strong className="text-gray-900 dark:text-gray-300 text-xl">Total Price:</strong> ₹{(item.Price || 0) * (item.quantity || 1)}</p>
                            <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Customer Name:</strong> {item.username || "Anonymous"}</p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center space-x-2">
  <strong>Color:</strong> 
  {item.color ? (
    <>
      <span
        style={{ backgroundColor: item.color }}
        className="w-6 h-6 inline-block rounded-full border border-gray-300"
        title={item.color} // Tooltip for accessibility
      ></span>
    </>
  ) : (
    <span>N/A</span>
  )}
</p>                            <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Size:</strong> {item.size || "N/A"}</p>
                            <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Quantity:</strong> {item.quantity || 1}</p>
                            <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Price:</strong> ₹{item.Price}</p>
                            <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Delivery Time:</strong> {item.dilevery || "N/A"}</p>
                            <p className="text-lg"><strong className="text-gray-900 dark:text-gray-300">Time Remaining:</strong> {countdowns[item.id] || "Calculating..."}</p>
                        </div>

            
                        <div className="md:col-span-3 mt-6">
                        <p className="text-lg   flex flex-row"><strong className={` text-gray-700 dark:text-gray-300 text-lg`}>Status by Customer:</strong> <p className={`${item.status==="Cancel"?"text-red-500":"text-green-400"} text-lg`}>{item.status || 1}</p></p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleOrderItemStateChange(item.id);
                                }}
                                className="space-y-4"
                            >
                                <label className="block text-lg font-medium dark:text-gray-300 text-gray-700">Order Item State</label>
                                <Select
                                    onValueChange={(value) => handleStateChange(item.id, value as OrderItem["orderState"])}
                                    value={selectedStates[item.id] || item.orderState}
                                >
                                    <SelectTrigger className="w-full md:w-1/2 dark:text-black bg-gray-100 text-lg rounded-md">
                                        <SelectValue>{selectedStates[item.id] || item.orderState}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:text-black">
                                        <SelectItem value="Packing">Packing</SelectItem>
                                        <SelectItem value="Shipped">Shipped</SelectItem>
                                        <SelectItem value="Delivered">Delivered</SelectItem>
                                        <SelectItem value="CancelOrder">Cancel Order</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                variant="brutal"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-3 w-full md:w-auto bg-yellow-300 dark:shadow-yellow-50 shadow-black text-black rounded-lg disabled:bg-gray-400"
                                >
                                    {isSubmitting ? "Updating..." : "Submit"}
                                </Button>
                            </form>

                            {error && <p className="text-red-500 mt-3">{error}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderForm;
