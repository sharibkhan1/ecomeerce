"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { format, addDays, intervalToDuration, formatDuration } from "date-fns";
import NextImage from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai"; // Icons

interface OrderItem {
  id: string;
  username?: string | null; // Allow null here
  productname?: string;
  dilevery?: string | null; // Should be numeric or converted to a number representing days
  image?: string | null; // Allow null here
  color?: string | null; // Allow null here
  size?: string | null;
  quantity?: number | null; // Allow null here
  Price?: number | null | undefined;
  status?: "Ordered" | "Cancel";
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

const OrderFormCustomer: React.FC<OrderFormProps> = ({ order }) => {
  const [visibleItems, setVisibleItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 5; // Adjust the number of items to load per scroll
  const observerRef = useRef<HTMLDivElement | null>(null);

  const totalPrice = useMemo(() => {
    return visibleItems.reduce((acc, item) => {
      const itemPrice = (item.Price || 0) * (item.quantity || 1);
      return acc + itemPrice;
    }, 0);
  }, [visibleItems]);

  const countdowns = useMemo(() => {
    return visibleItems.reduce((acc, item) => {
      const deliveryDays = parseInt(item.dilevery || "1", 10); // Default to 1 day
      const endDate = addDays(new Date(order.createdAt), deliveryDays);
      const now = new Date();

      if (endDate > now) {
        const duration = intervalToDuration({ start: now, end: endDate });
        acc[item.id] = formatDuration(duration, { format: ["days", "hours"] });
      } else {
        acc[item.id] = "Delivered";
      }

      return acc;
    }, {} as { [key: string]: string });
  }, [visibleItems, order.createdAt]);

  const loadMoreItems = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      // Simulate loading more items by taking a slice of the next items
      const nextItems = order.orderItems.slice(visibleItems.length, visibleItems.length + itemsPerPage);
      setVisibleItems((prev) => [...prev, ...nextItems]);

      if (nextItems.length < itemsPerPage) {
        setHasMore(false); // No more items to load
      }
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  // IntersectionObserver to trigger loadMoreItems when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [visibleItems]);

  useEffect(() => {
    // Initially load the first batch of items
    loadMoreItems();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Order Summary */}
      <div>
        <div className="bg-white dark:bg-muted-foreground shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <p className="text-lg">
            <strong>Ordered At:</strong>{" "}
            {format(new Date(order.createdAt), "MMMM do, yyyy")}
          </p>
          <p className="text-lg">
            <strong>Owner Address:</strong> {order.address}
          </p>
          <p className="text-lg">
            <strong>Owner Phone:</strong> {order.phone}
          </p>
        </div>
        {visibleItems.length > 0 && (
          <div className="text-2xl font-bold text-center bg-gray-100 dark:text-white dark:bg-black/40 p-6 rounded-lg shadow-md">
            Total Order Price: ₹{totalPrice}
          </div>
        )}
        {/* Ordered Items */}
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 dark:text-white dark:bg-black/40 p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Image */}
            <div className="col-span-1 flex justify-center">
              {item.image ? (
                <NextImage
                  src={item.image}
                  alt={item.productname || "Product"}
                  width={350}
                  height={150}
                  className="rounded-lg"
                />
              ) : (
                <div className="bg-gray-200 w-24 h-24 rounded-md flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            {/* Details */}
            <div className="col-span-2 space-y-4">
              <h3 className="text-xl font-semibold">{item.productname}</h3>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    item.status === "Cancel" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p>
                <strong>Package Status:</strong> {item.orderState || "Pending"}
              </p>
              <p>
                <strong>Color:</strong>{" "}
                {item.color ? (
                  <span
                    style={{ backgroundColor: item.color }}
                    className="inline-block w-5 h-5 rounded-full border"
                  />
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                <strong>Size:</strong> {item.size || "N/A"}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity || 1}
              </p>
              <p>
                <strong>Price:</strong> ₹{item.Price}
              </p>
              <p>
                <strong>Dilevertt:</strong> {item.dilevery}
              </p>
              <p className="flex items-center space-x-2">
                <AiOutlineClockCircle className="text-lg" />
                <strong>Time Remaining:</strong>{" "}
                {countdowns[item.id] || "Calculating..."}
              </p>
              <p className="text-xl font-bold">
                Total Price: ₹{(item.Price || 0) * (item.quantity || 1)}
              </p>
            </div>
          </div>
        ))}
        {/* Loading Indicator */}
        {loading && <div className="text-center">Loading more...</div>}
        {/* Observer Trigger */}
        {hasMore && (
          <div ref={observerRef} className="h-1"></div> // Invisible observer target
        )}
      </div>
    </div>
  );
};

export default OrderFormCustomer;