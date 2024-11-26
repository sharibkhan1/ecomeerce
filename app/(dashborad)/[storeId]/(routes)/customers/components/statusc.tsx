"use client";

import { fetchUsers } from '@/actions/usehelper';
import React, { useState, useEffect } from 'react';
import NextImage from "next/image";
import Heading from '@/components/ui/heading';
import { useRouter } from 'next/navigation';
import { OrderStatus } from '@prisma/client';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  email: string | null;
  image: string | null;
  orderedCount: { status: OrderStatus }[]; // Array of order items
  canceledCount: { status: OrderStatus }[]; 
}

const ManageUsersStatus: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading title="Customers" description="Manage customers" />
      </div>
      <input
        type="text"
        placeholder="Search by email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-full dark:bg-black/80 dark:text-white p-2 border border-gray-300"
      />
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div className="flex items-center space-x-4">
              {user.image && (
                <NextImage
                  src={user.image}
                  height={40}
                  width={40}
                  alt="User Image"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <span>{user.email || 'No email available'}</span>
                <div className="text-sm bg-black/90 rounded-lg flex items-center justify-center text-gray-500">
                  <span className="text-green-500 mr-3 dark:text-green-300">
                    {user.orderedCount.length} Ordered
                  </span>
                  {' / '}
                  <span className="text-red-500 ml-3 ">
                    {user.canceledCount.length} Canceled
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="stretch"
              onClick={() => router.push(`customers/${user.id}`)}
              className="px-4 py-2 text-sm text-black bg-yellow-400 rounded hover:bg-yellow-100"
            >
              Details
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsersStatus;
