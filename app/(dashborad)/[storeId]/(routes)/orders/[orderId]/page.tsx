    import db from '@/lib/db';
    import React, { useState } from 'react';
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
    
        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <OrderForm order={order} />
                </div>
            </div>
        );
    }
    
    export default OrderPage;
