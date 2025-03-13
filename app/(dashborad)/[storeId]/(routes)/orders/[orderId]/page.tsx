    import db from '@/lib/db';
    import React from 'react';
    import OrderForm from '../_components/order-form';
    
    const OrderPage = async({
        params
    }:{
        params:{orderId: string}
    }) => {
        // Fetch the order data
        const order = await db.order.findUnique({
            where: { id: params.orderId },
            include: {
                orderItems: true
                
            }
        });
        const orderWithDefaults = order ? {
            ...order,
            createdAt: order.createdAt.toString(),  // Optionally convert to string if needed
            orderItems: order.orderItems.map(item => ({
                ...item,
                quantity: item.quantity ?? 0, // Default to 0 if quantity is null
            }))
        } : null;
        
        if (!orderWithDefaults) {
            return (
                <div className="flex-col dark:bg-[#09090B] h">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <p>Order not found.</p>
                    </div>
                </div>
            );
        }
        
        return (
            <div className='flex-col dark:bg-[#09090B] overflow-y-auto h-max min-h-screen flex'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    
                    <OrderForm order={order} />
                </div>
            </div>
        );
    }
    
    export default OrderPage;
