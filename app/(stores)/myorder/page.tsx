import { currentUserId } from '@/lib/auth';
import db from '@/lib/db';
import OrderForm from './form';

async function fetchUserOrders(userId: string) {
  const orders = await db.order.findMany({
    where: {
      userId: userId,
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
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div>
          {orders.map(order => (
            <OrderForm key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
