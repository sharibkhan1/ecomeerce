import db from '@/lib/db';
import Cont from '@/components/ui/cont';
import Image from 'next/image';
import OrderFormCustomer from '../components/forms';

interface CustomerOrdersPageProps {
  params: {
    userId: string;  // userId is passed from the URL as a parameter
  };
}
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
      userId:true,
      orderItems: {
        select: {
          id: true,
          orderId: true,
          productId: true,
          createdAt: true,
          updatedAt: true,
          color: true,
          size: true,
          Price:true,
          dilevery:true,
          quantity: true,
          status: true,
          username: true, // Ensure username is selected
          image: true,
        },
      },
    },
  });
  const ordersWithValidUsername = orders.map(order => ({
    ...order,
    createdAt: order.createdAt.toISOString(), // Convert Date to string
    orderItems: order.orderItems.map(item => ({
      ...item,
      image: item.image ?? undefined, // Convert null to undefined here
      username: item.username ?? undefined, // Convert null to undefined
      color: item.color ?? undefined, // Convert null to undefined here
      quantity: item.quantity ?? undefined, // Convert null to undefined here
      createdAt: item.createdAt.toISOString(), // Convert Date to string for orderItem
      updatedAt: item.updatedAt.toISOString(),
      dilevery: item.dilevery ?? null, // Ensure 'dilevery' is null if not available
      Price: item.Price ?? undefined, // Convert null to undefined here

    })),
  }));

  return ordersWithValidUsername;
}

export default async function CustomerOrdersPage({ params }: CustomerOrdersPageProps) {
  const { userId } = params;  // Get userId from the URL params
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
            <OrderFormCustomer key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
