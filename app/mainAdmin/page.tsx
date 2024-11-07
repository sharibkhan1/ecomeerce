"use client"
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useEffect } from "react";

export default function Home() {
  const router = useRouter(); // Initialize the router
  const onOpen= useStoreModal((state)=>state.onOpen);
  const isOpen = useStoreModal((state)=> state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[isOpen,onOpen]);

  const handleSignIn = () => {
    router.push('/auth/login'); // Navigate to /auth/login
  };
  return null;
}
