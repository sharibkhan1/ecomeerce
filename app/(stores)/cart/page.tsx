// pages/cart.js
"use client"
import Cont from '@/components/ui/cont';
import React, { useEffect, useState } from 'react';
import CartItem from './components/cart-item';
import Summary from './components/summary';
import { checkAndRemoveOutOfStockItems, getCartItems } from '@/actions/cartcount';
import { fetchCartItems } from '@/actions/cartfuntion';

interface CartItemType {
    id: string;
    name: string;
    salesPrice: number;
    image: string;
    quantity: number;
    color: string | null;  // Change here from string | null to string | undefined
    size: string | null;
}



const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const loadCartItems = async () => {
    const items = await fetchCartItems();
    setCartItems(items);
};
  const removeItemFromCart = (id: string) => {
    // Remove item from the state when it's removed from the cart
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  const updateCartItems = () => {
    loadCartItems();
};

useEffect(() => {
    loadCartItems();
}, []);
  // Set up an interval to check and remove out-of-stock items every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await checkAndRemoveOutOfStockItems(); // Check and remove out-of-stock items
      const items = await getCartItems(); // Re-fetch the cart items after removal
      setCartItems(items);
    }, 3600000); // 5 seconds
 
    // Cleanup interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

    return (
        <div className="bg-white dark:bg-black/90 min-h-screen">
            <Cont>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold dark:text-white text-black">Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cartItems.length === 0 ? (
                                <p className="text-neutral-500 text-lg">No items added to cart</p>
                            ) : (
                                <ul>
                                    {cartItems.map((item) => (
                                        <CartItem onUpdate={updateCartItems} key={item.id} data={item}  onRemove={removeItemFromCart}/>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Summary  itemss={cartItems} />
                    </div>
                </div>
            </Cont>
        </div>
    );
};

export default CartPage;
