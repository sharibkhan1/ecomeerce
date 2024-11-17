"use client"
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateOrderItemStatus } from '@/actions/orderup';
import { toast } from 'sonner';
import { AlertModal } from '@/components/alert-modal';
import { format, addDays, intervalToDuration, formatDuration } from "date-fns";
import NextImage from "next/image";
import { useRouter } from 'next/navigation';
import Cont from '@/components/ui/cont';

interface OrderItem {
  id: string;
  username?: string;
  productname?: string;
  dilevery?: string; // Should be numeric or converted to a number representing days
  image?: string;
  color?: string;
  size?: string;
  quantity?: number;
  Price?: number;
  status?: 'Ordered' | 'Cancel';
  orderState?: string;
}

interface Order {
  id: string;
  orderItems: OrderItem[];
  phone: string;
  address: string;
  createdAt: string;
  userId: string;
}

interface OrderFormProps {
  order: Order;
}

const OrderForm: React.FC<OrderFormProps> = ({ order }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // For Modal visibility
  const router = useRouter();

  const [itemToCancel, setItemToCancel] = useState<OrderItem | null>(null); // Store the item to cancel

  const countdowns = useMemo(() => {
    return order.orderItems.reduce((acc, item) => {
        const deliveryDays = parseInt(item.dilevery || "1", 10); // Default to 8 days if undefined
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
}, [order.orderItems, order.createdAt]);

  const handleStatusChange = async (orderItemId: string, newStatus: 'Ordered' | 'Cancel') => {
    setIsSubmitting(true);
    setError(null);

    try {
      await updateOrderItemStatus(orderItemId, newStatus);
      setIsSubmitting(false);
      router.refresh();
      toast.success("Status updated");
    } catch (error) {
      setError("Failed to update item status. Please try again.");
      toast.error("Status not updated");
      setIsSubmitting(false);
    }
  };

  // Handle Cancel Order modal confirmation
  const handleCancelOrder = () => {
    if (itemToCancel) {
      handleStatusChange(itemToCancel.id, 'Cancel');
      setIsModalOpen(false);  // Close the modal after confirming
    }
  };

  return (
    <Cont>
    <div className="p-8 bg-gray-300 shadow-lg rounded-xl space-y-8 mb-5">
      <h2 className="text-3xl font-bold text-gray-900">Order Details</h2>

      {/* Order Summary */}
      <div className="">
        <p className="text-lg text-gray-700"><strong>Ordered At:</strong> {format(new Date(order.createdAt), "MMMM do, yyyy")}</p>
        <p className="text-lg text-gray-700"><strong>Owner Address:</strong> {order.address}</p>
        <p className="text-lg text-gray-700"><strong>Owner Phone:</strong> {order.phone}</p>
      </div>

      {/* Order Items */}
      <div className="space-y-6 bg-white shadow-lg rounded-xl">
        {order.orderItems.map((item) => (
          <div key={item.id} className=" pt-6 grid border-t border-gray-800  grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Image */}
            <div className="md:col-span-1  flex justify-center">
              {item.image ? (
                <NextImage src={item.image} alt={item.productname || "Product Image"} width={300} height={200} className="object-cover rounded-lg shadow-md" />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-600">No Image</div>
              )}
            </div>

            {/* Product Info */}
            <div className="md:col-span-2 space-y-4">
            <p className="text-lg text-gray-600"><strong>Status:</strong> {item.status}</p>
            <p className="text-lg text-gray-600"><strong>Store Status:</strong> {item.orderState}</p>
              <h4 className="text-xl font-semibold text-gray-800">{item.productname || "Unnamed Product"}</h4>
              <p className="text-lg text-gray-600"><strong>Owner Name:</strong> {item.username || "Anonymous"}</p>
{/* Color */}
<p className="text-lg text-gray-600 flex items-center space-x-2">
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
</p>
              <p className="text-lg text-gray-600"><strong>Size:</strong> {item.size || "N/A"}</p>
              <p className="text-lg text-gray-600"><strong>Quantity:</strong> {item.quantity || 1}</p>
              <p className="text-lg text-gray-600"><strong>Price:</strong> ₹{item.Price}</p>
              <p className="text-lg text-gray-600"><strong>Delivery Time:</strong> {item.dilevery || "N/A"}</p>
              <p className="text-lg text-gray-600"><strong>Time Remaining:</strong> {countdowns[item.id] || "Calculating..."}</p>
              <p className="text-lg font-semibold text-gray-800"><strong>Total Price:</strong> ₹{(item.Price || 0) * (item.quantity || 1)}</p> {/* Total price calculation */}
            </div>

            {/* Cancel Button */}
            {item.status !== 'Cancel' && (
              <Button
                variant="destructive"
                onClick={() => {
                  setItemToCancel(item);  // Set the item to cancel
                  setIsModalOpen(true);    // Open the modal
                }}
                className="w-full mt-4 text-white bg-red-600 hover:bg-red-700"
              >
                Cancel Order
              </Button>
            )}
          </div>
        ))}

        {/* Alert Modal for Confirmation */}
        <AlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}  // Close the modal
          onConfirm={handleCancelOrder}         // Confirm cancel and update status
          loading={isSubmitting}
        />
      </div>
    </div>
    </Cont>
  );
};

export default OrderForm;
