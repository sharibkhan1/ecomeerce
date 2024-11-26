"use client"
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import MainNav from '../main-nav';
import NavbarAction from '../navbaraction';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { ModeToggle } from '../mode-toggle';
import { LogoutButton } from '../auth/logout-button';
import { ExitIcon } from '@radix-ui/react-icons';
import { Category } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Settings2Icon } from 'lucide-react';

interface SidebarProps {
  categories: Category[]; // Replace `any` with the correct type for categories
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative ml-4">
      {/* Toggle button */}
      <Button size="icon" variant="outline"
        onClick={toggleSidebar}
        className="text-white  text-2xl focus:outline-none"
      >
        <FaBars />
      </Button>

      {/* Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeSidebar}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-64 dark:bg-black/80 bg-white shadow-lg p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            {/* Close button */}
            <Button
            size="icon"
              onClick={closeSidebar}
              className="text-white text-2xl dark:text-black self-end mb-4 focus:outline-none"
            >
              <FaTimes />
            </Button>

            {/* Main Navigation */}
            <MainNav data={categories} />
            <div className='mt-2' >
            <Separator/> 
            </div>
            {/* Navbar Actions */}
            <div className="mt-4">
              <NavbarAction />
            </div>
            <div className='mt-4' >
            <Separator/> 
            </div>
            <div className='dark:text-white mt-10'>
              <ModeToggle/>
            </div>
            <Button variant="brutal" onClick={()=>router.push("/settings")} className=' flex flex-row mt-5'>
              <Settings2Icon className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="destructive" className='dark:text-white flex flex-row mt-5'>
              <LogoutButton>
              <ExitIcon className="h-4 dark:text-white w-4 mr-2" />
              Logout
              </LogoutButton>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
