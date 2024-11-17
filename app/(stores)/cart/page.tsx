// pages/cart.js
"use client"
import Cont from '@/components/ui/cont';
import React, { useEffect, useState } from 'react';
import CartItem from './components/cart-item';
import Summary from './components/summary';
import { checkAndRemoveOutOfStockItems, getCartItems } from '@/actions/cartcount';


interface CartItemType {
    id: string;
    name: string;
    salesPrice: number | null;
    image: string;
    quantity: number;
    color: string | null;
    size: string | null;
}


const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Fetch cart items when the page loads
  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  // Set up an interval to check and remove out-of-stock items every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await checkAndRemoveOutOfStockItems(); // Check and remove out-of-stock items
      const items = await getCartItems(); // Re-fetch the cart items after removal
      setCartItems(items);
    }, 5000); // 5 seconds

    // Cleanup interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

    return (
        <div className="bg-white">
            <Cont>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cartItems.length === 0 ? (
                                <p className="text-neutral-500">No items added to cart</p>
                            ) : (
                                <ul>
                                    {cartItems.map((item) => (
                                        <CartItem key={item.id} data={item} />
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Summary />
                    </div>
                </div>
            </Cont>
        </div>
    );
};

export default CartPage;
