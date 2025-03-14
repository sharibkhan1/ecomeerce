"use client"

import * as z from "zod"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal =()=>{
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try{
            setLoading(true);
            await axios.post('/api/stores', values);  // Removed the unused response variable
            toast.success("Store Created");
        }catch(e){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }
    return(
        <Modal title="Create Store" 
        description="Add a new Store" 
        isOpen={storeModal.isOpen}
         onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4 " >
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="E-comerce" {...field} ></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end " >
                            <Button disabled={loading} variant="outline" onClick={storeModal.onClose} >Cancel</Button>
                                <Button disabled={loading} type="submit" >Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>        
        </Modal>
    )
}