"use server"
import db from '@/lib/db';

export const fetchUsers = async () => {
  return await db.user.findMany({
    where: {
      role: { not: 'MAINADMIN' },
    },
    select: {
      id: true,
      email: true,
      image: true,
      role: true,
    },
  });
};

export const updateUserRole = async (userId: string, newRole: 'USER' | 'ADMIN') => {
  return await db.user.update({
    where: { id: userId },
    data: { role: newRole},
  });
};
