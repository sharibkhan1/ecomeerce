"use client"

import * as z from "zod";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Billboard } from "@prisma/client"
import { TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/alert-modal";
import ImageUpload from "@/components/ui/iamge-ypload";



const formSchema = z.object({
    label:z.string(),
    imageUrl:z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps{
    initialData:Billboard|null;
}
export const BillboardForm:React.FC<BillboardFormProps>=({
    initialData
})=>{
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [, startTransition] = useTransition(); // Transition state

    const title = initialData ? "Edit billboard":"Create billboard"
    const description = initialData ? "Edit a billboard":"Add a new  billboard"
    const toastMessage = initialData ? "billboard updated":"billboard created "
    const action = initialData ? "Save changes":"Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData ||{
            label:"",
            imageUrl:"",
        }
    });

    const onSubmit = async(data: BillboardFormValues)=>{
        startTransition(async () => {
            setLoading(true);
        try{
            if(initialData){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data);
            }else{
                await axios.post(`/api/${params.storeId}/billboards`,data);
            }
            toast.success(toastMessage)
            router.refresh();
            router.push(`/${params.storeId}/billboards`)
            router.refresh();
        }catch(e){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    });
    }

    const onDelete = async()=>{
        startTransition(async () => {
            setLoading(true);
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            toast.success("Billboard deleted")
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
        }catch(e){
            toast.error("Make sure to remove all categories using this billboard first");
        }finally{
            setLoading(false);
            setOpen(false);
        }
    });
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 dark:text-white w-full" >
                <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] :[]}
                                        disabled={loading}
                                        onChange={(url)=>field.onChange(url)}
                                        onRemove={()=>field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                <div className="grid grid-cols-3 gap-8 " >
                    <FormField
                        control={form.control}
                        name="label"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboardlabel" {...field} />
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