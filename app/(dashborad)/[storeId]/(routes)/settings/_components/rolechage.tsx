"use client";

import { fetchUsers, updateUserRole } from '@/actions/usehelper';
import React, { useState, useEffect } from 'react';
import NextImage from "next/image";
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  email: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN' | 'MAINADMIN';
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editedRoles, setEditedRoles] = useState<{ [key: string]: 'USER' | 'ADMIN' }>({});
  const [loading, setLoading] = useState(false); // Loading state for fetch and update

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true); // Start loading while fetching users
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Stop loading after fetching is done
      }
    };

    getUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: 'USER' | 'ADMIN') => {
    setEditedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleSubmit = async (userId: string) => {
    const newRole = editedRoles[userId];
    if (!newRole) return;

    setLoading(true); // Set loading state to true while submitting the role update
    try {
      await updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setLoading(false); // Reset loading state after the update is done
      setEditedRoles((prev) => {
        const updatedRoles = { ...prev };
        delete updatedRoles[userId];
        return updatedRoles;
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search by email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-full dark:bg-black/80 dark:text-white p-2 border border-gray-300 "
      />
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li key={user.id} className="flex items-center justify-between p-4 border rounded">
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
              <span>{user.email || 'No email available'}</span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={editedRoles[user.id] || user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')}
                className="p-2 border dark:bg-black/80 dark:text-white border-gray-300 rounded" disabled={loading}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {editedRoles[user.id] && editedRoles[user.id] !== user.role && (
                <Button 
                  variant="brutal"
                  onClick={() => handleSubmit(user.id)}
                  className="px-4 py-2 text-black dark:shadow-black bg-yellow-300 rounded"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Submit'}
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
