import React from 'react';
import BillBoardClient from './_components/client';
import db from '@/lib/db';
import { OrderColumn } from './_components/columns';
import { format, addDays, intervalToDuration, formatDuration } from 'date-fns';
import { formatter } from '@/lib/utils';

const Ordersdpage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
// @ts-ignore

  const formattedOrders: OrderColumn[] = orders.map((item) => {
    const countdowns = item.orderItems.reduce((acc, orderItem) => {
      const deliveryDays = parseInt(orderItem.dilevery || "1", 10);
      const endDate = addDays(new Date(item.createdAt), deliveryDays);
      const now = new Date();

      if (endDate > now) {
        const duration = intervalToDuration({ start: now, end: endDate });
        acc[orderItem.id] = formatDuration(duration, { format: ['days', 'hours'] });
      } else {
        acc[orderItem.id] = "Delivered";
      }

      return acc;
    }, {} as { [key: string]: string });

    return {
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      isPaid: item.isPaid,
      totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
        return total + Number(orderItem.product.salesPrice);
      }, 0)),
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
      itemsSummary: item.orderItems.map((orderItem) => ({
        name: orderItem.product.name,
        price: formatter.format(Number(orderItem.product.salesPrice)),
        status: orderItem.status || 'N/A',
        orderState: orderItem.orderState || 'Packing',
        dilevery: countdowns[orderItem.id] || 'N/A',
      })),
      dileve: item.orderItems.map((orderItem) => ({
        dilevery: countdowns[orderItem.id] || 'N/A',
      })),
      statuss: item.orderItems.map((orderItem) => orderItem.status || 'N/A').join(', '),
      orderStat: item.orderItems.map((orderItem) => ({
        orderState: orderItem.orderState || 'Packing',
      })),
      itemDetails: item.orderItems.map((orderItem) => ({
        name: orderItem.product.name,
        color: orderItem.color || 'N/A',
        size: orderItem.size || 'Packing',
        quantity: orderItem.quantity || 'Packing',
      })),
      status: item.status,
      userId: item.userId || "No user assigned",
      orderState: item.orderState || "Packing"
    };
  });

  return (
    <div className='flex-col dark:bg-muted-foreground min-h-screen flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillBoardClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default Ordersdpage;
