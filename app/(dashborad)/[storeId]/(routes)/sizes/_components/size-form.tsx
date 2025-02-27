"use client"

import * as z from "zod";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Size } from "@prisma/client"
import { TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/alert-modal";

const formSchema = z.object({
    name:z.string().min(1),
    value:z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps{
    initialData:Size|null;
}
export const SizeForm:React.FC<BillboardFormProps>=({
    initialData
})=>{
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit size":"Create size"
    const description = initialData ? "Edit a size":"Add a new  size"
    const toastMessage = initialData ? "size updated":"size created "
    const action = initialData ? "Save changes":"Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData ||{
            name:"",
            value:"",
        }
    });

    const onSubmit = async(data: BillboardFormValues)=>{
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data);
            }else{
                await axios.post(`/api/${params.storeId}/sizes`,data);
            }
            router.refresh();
            toast.success(toastMessage)
        }catch(e){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    const onDelete = async()=>{
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            router.refresh();
            toast.success("size deleted")
        }catch(e){
            toast.error("Make sure to remove all products using this size first");
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

    return(
        <>
        <AlertModal
            isOpen={open}
            onClose={()=>setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
        <div className="flex items-center justify-between " >
            <Heading
                title={title}
                description={description}
            />
            {initialData &&(

                <Button 
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={()=>setOpen(true)}
                >
                <TrashIcon className="h-4 w-4" />
            </Button>
            )}
        </div>
        <Separator/>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full dark:text-white" >
                <div className="grid grid-cols-3 gap-8 " >
                <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size value" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button variant="stretch" disabled={loading} className="ml-auto" type="submit" >
                    {action}
                </Button>
            </form>
        </Form>
        </>
    )
}