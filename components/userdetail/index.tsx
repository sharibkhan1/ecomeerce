"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getUserDetails, updateUserDetails } from "@/actions/userupdate";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const UserDetail: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [defaults, setDefaults] = useState<{ phoneno: string; address: string }>({
    phoneno: "+91",
    address: "",
  });



  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      phoneno: defaults.phoneno,
      address: defaults.address,
    },
  });
  useEffect(() => {
    if (isOpen) {
      const fetchUserDetails = async () => {
        try {
          const userDetails = await getUserDetails();
          if (userDetails) {
            setDefaults({
              phoneno: userDetails.phoneno || "+91",
              address: userDetails.address || "",
            });
            // Update form values dynamically
            form.reset({
              phoneno: userDetails.phoneno || "+91",
              address: userDetails.address || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    }
  }, [isOpen, form]);
  // Handle form submission
  const handleSubmit = async (data: { phoneno: string; address: string }) => {
    try {
      const result = await updateUserDetails(data.phoneno, data.address);

      if (result.error) {
        console.error(result.error);
        return; // Handle this error appropriately
      }

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
          <div className="space-y-4 dark:text-white text-black">
            <FormField
              control={form.control}
              name="phoneno"
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
                  <Textarea
                      disabled={loading}
                      placeholder="Type your address here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Place Order
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
