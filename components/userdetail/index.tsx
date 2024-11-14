"use client";

import { useEffect, useState, useTransition } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { updateUserDetails } from "@/actions/userupdate";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const UserDetail: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      mobileNo: "",
      address: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (data: { mobileNo: string; address: string }) => {
    try {
      // Call the server-side function to update user details
      const result = await updateUserDetails(data.mobileNo, data.address);

      if (result.error) {
        console.error(result.error);
        return;  // You can handle this error appropriately
      }

      // After the user is updated, call the onConfirm callback and close the modal
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title="Add your details" description="Please provide your mobile number and address." isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            // Handle the form submission and update user details
            await handleSubmit(data);
          })}
          className="space-y-6"
        >
          <div className="space-y-4 text-white">
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile No</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="+9181232133" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea disabled={loading} placeholder="Type your address here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Checkout
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
