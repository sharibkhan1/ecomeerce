"use server"
import db from '@/lib/db';

export const fetchUsers = async () => {
  const users = await db.user.findMany({
    where: {
      role: { not: 'MAINADMIN' },
    },
    select: {
      id: true,
      email: true,
      image: true,
      role: true,
      orders:{
        where: {
          isPaid: true, // Include only paid orders
        },
        select:{
          orderItems:{
            select:{
              status:true,
            }
          }
        }
      }
    },
  });
  return users.map((user)=>{
    const orderItems = user.orders.flatMap((order)=>order.orderItems);
    const orderedCount = orderItems.filter((item)=> item.status === "Ordered");
    const canceledCount = orderItems.filter((item)=> item.status === "Cancel");
    return {
      id: user.id,
      email: user.email,
      image: user.image,
      orderedCount, // Ensure this is a number
      canceledCount,
    };
  })
};

export const updateUserRole = async (userId: string, newRole: 'USER' | 'ADMIN') => {
  return await db.user.update({
    where: { id: userId },
    data: { role: newRole},
  });
};
