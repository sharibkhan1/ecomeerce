import { currentUserId } from '@/lib/auth';
import db from '@/lib/db';
import OrderForm from './form';
import Cont from '@/components/ui/cont';
import Image from 'next/image';

async function fetchUserOrders(userId: string) {
  const orders = await db.order.findMany({
    where: {
      userId: userId,
      isPaid: true, // Only fetch orders where isPaid is true
    },
    orderBy: {
      createdAt: 'desc', // Sort by createdAt in descending order
    },
    select: {
      id: true,
      phone: true,
      address: true,
      createdAt: true,
      orderItems: 
        true
    },
  });
  return orders;
}

export default async function OrdersPage() {
  const userId = await currentUserId();
  if (!userId) {
    return (
      <div>
        <h1>You must be logged in to view your orders.</h1>
      </div>
    );
  }

  const orders = await fetchUserOrders(userId);

  return (
    <div className='dark:bg-black/90'>
      {orders.length === 0 ? (
        <Cont>
          <div className='h-screen w-auto flex flex-col items-center justify-center' >
          <Image
          src="/cart.png"
          alt="iamge"
          loading='lazy'
          sizes="30"
          className='md:h-[30rem] md:w-[30rem]'
          width={150}
          height={150}
          />
          <p className='font-semibold dark:text-white text-gray-800 text-[2rem]' >NO ORDER PLACED</p>
          </div>
        </Cont>
      ) : (
        <div>
          {orders.map(order => (
            // @ts-ignore
            <OrderForm key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
