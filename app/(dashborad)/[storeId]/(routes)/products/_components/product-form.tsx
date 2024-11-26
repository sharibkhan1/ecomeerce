"use client"

import * as z from "zod";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Category, Color, Color1, Color2, Color3, Detail, Image, Product, Size, Size1, Size2, Size3 } from "@prisma/client"
import { TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/alert-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"
import ImageUploadmul from "@/components/ui/iamgeup";



    const formSchema = z.object({
        name:z.string().min(1),
        images: z.array(z.object({ url: z.string() })).nonempty("At least one image is required"),
        price:z.coerce.number().min(1),
        categoryId:z.string().min(1),
        colorId:z.string().min(1),
        sizeId:z.string().min(1),
     sizeId1: z.string().nullable().optional(), // Allow nullable and optional values
    colorId1: z.string().nullable().optional(),
    sizeId2: z.string().nullable().optional(),
    colorId2: z.string().nullable().optional(),
    sizeId3: z.string().nullable().optional(),
    colorId3: z.string().nullable().optional(),
        isFeatured:z.boolean().optional(),
        isArchived:z.boolean().optional(),
        dilevery:z.string().min(1),
        discription:z.string().min(10, "Description is required"),
        salesPrice:z.coerce.number().min(1),
        stocks:z.string().min(1),
        details: z.array(
            z.object({
                title: z.string().min(1, "Title is required"),
                description: z.string().min(5, "Description should be at least 5 characters long")
            })
        ).min(1, "At least one ingredient is required"),  
    });



type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps{
    initialData:Product&{
        images:Image[]
    }|null;
    categories:Category[];
    colors:Color[];
    sizes:Size[];
    details:Detail[];
    sizes1:Size1[];
    sizes2:Size2[];
    sizes3:Size3[];
    colors1:Color1[];
    colors2:Color2[];
    colors3:Color3[];
}
export const ProductForm:React.FC<ProductFormProps>=({
    initialData,categories,colors,sizes,sizes1, colors1, sizes2, colors2, sizes3, colors3
})=>{
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit products":"Create products"
    const description = initialData ? "Edit a products":"Add a new  products"
    const toastMessage = initialData ? "products updated":"products created "
    const action = initialData ? "Save changes":"Create"

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData ?{
            ...initialData,
            price:parseFloat(String(initialData?.price)),
            salesPrice:parseFloat(String(initialData?.salesPrice)),
            stocks:String(initialData?.stocks),
            sizeId1: initialData.sizeId1 ?? undefined,
            colorId1: initialData.colorId1 ?? undefined,
            sizeId2: initialData.sizeId2 ?? undefined,
            colorId2: initialData.colorId2 ?? undefined,
            sizeId3: initialData.sizeId3 ?? undefined,
            colorId3: initialData.colorId3 ?? undefined,
            dilevery: initialData.dilevery || '', // If it's null, set it to an empty string or undefined
        }:{
            name:"",
            dilevery:"",
            images:[],
            price:0,
            categoryId:'',
            colorId:'',
            sizeId:'',
            sizeId1: undefined, // Ensure undefined instead of null
            colorId1: undefined,
            sizeId2: undefined,
            colorId2: undefined,
            sizeId3: undefined,
            colorId3: undefined,
            isFeatured:false,
            isArchived:false,
            discription:'',
            salesPrice:0,
            stocks:"1",
            details: [
                { title: '', description: '' } // Provide an empty entry by default or adjust as needed
            ]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "details", // Field array name
      });
      
    const onSubmit = async(data: ProductFormValues)=>{
        try{
            setLoading(true);
            router.refresh();
            if(initialData){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`,data);
            }else{
                await axios.post(`/api/${params.storeId}/products`,data);
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("product deleted")
            router.refresh();

        }catch(e){
            toast.error("Something went wrong");
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full" >
                <FormField
                        control={form.control}
                        name="images"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                <ImageUploadmul
  value={field.value.map((image) => image.url)} // Current list of image URLs
  disabled={loading}
  onRemove={(url) => field.onChange(field.value.filter((current) => current.url !== url))}
  onChange={(updatedImages) =>
    field.onChange(updatedImages.map((url) => ({ url }))) // Keep original object structure
  }
/>

                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                <div className="grid grid-cols-3 gap-8 " >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="product name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dilevery"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>dilevery time</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="7 days" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salesPrice"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>SalesPrice</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discription"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Discription</FormLabel>
                                <FormControl>
                                    <Textarea  disabled={loading} placeholder="Type your discription here." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="stocks"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Stocks</FormLabel>
                                <FormControl>
                                    <Input type="number"  disabled={loading} placeholder="10" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} 
                                    value={field.value} defaultValue={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select a category"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category)=>(
                                            <SelectItem  
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
<FormField
                        control={form.control}
                        name="sizeId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} 
                                    value={field.value} defaultValue={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select a size"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sizes.map((size)=>(
                                            <SelectItem  
                                                key={size.id}
                                                value={size.id}
                                            >
                                                {size.value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                        <FormField control={form.control} name="sizeId1" render={({ field }) => (
                <FormItem>
                    <FormLabel>Size 2 (Optional)</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value ?? undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Size 2" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {sizes1.map((size) => (
                                <SelectItem key={size.id} value={size.id}>
                                    {size.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
<FormField control={form.control} name="sizeId2" render={({ field }) => (
                <FormItem>
                    <FormLabel>Size 3 (Optional)</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value ?? undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Size 3" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {sizes2.map((size) => (
                                <SelectItem key={size.id} value={size.id}>
                                    {size.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
              <FormField control={form.control} name="sizeId3" render={({ field }) => (
                <FormItem>
                    <FormLabel>Size 4 (Optional)</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value ?? undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Size 4" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {sizes3.map((size) => (
                                <SelectItem key={size.id} value={size.id}>
                                    {size.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
                    <FormField
                        control={form.control}
                        name="colorId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} 
                                    value={field.value} defaultValue={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select a color"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {colors.map((color)=>(
                                            <SelectItem  
                                                key={color.id}
                                                value={color.id}
                                            >
                                                {color.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                

            {/* Color1 Field (Optional) */}
            <FormField control={form.control} name="colorId1" render={({ field }) => (
                <FormItem>
                    <FormLabel>Color 2 (Optional)</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value ?? undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Color 2" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {colors1.map((color) => (
                                <SelectItem key={color.id} value={color.id}>
                                    {color.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
            

            {/* Color1 Field (Optional) */}
            <FormField control={form.control} name="colorId2" render={({ field }) => (
                <FormItem>
                    <FormLabel>Color 3 (Optional)</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value ?? undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Color 3" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {colors2.map((color) => (
                                <SelectItem key={color.id} value={color.id}>
                                    {color.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
          

            {/* Color1 Field (Optional) */}
            <FormField control={form.control} name="colorId3" render={({ field }) => (
                <FormItem>
                    <FormLabel>Color 4 (Optional)</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value ?? undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Color 4" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {colors3.map((color) => (
                                <SelectItem key={color.id} value={color.id}>
                                    {color.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
                                        <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({field})=>(
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 " >
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        //
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none" >
                                    <FormLabel>
                                        Featured
                                    </FormLabel>
                                    <FormDescription className="text-black">
                                        This product will appear on the home page
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                                        <FormField
                        control={form.control}
                        name="isArchived"
                        render={({field})=>(
                            <FormItem className="flex flex-row dark:text-black items-start space-x-3 space-y-0 rounded-md border p-4 " >
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        //
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1  leading-none" >
                                    <FormLabel>
                                        Archived
                                    </FormLabel>
                                    <FormDescription className="text-black">
                                        This product will appear not appear anywhere in store
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                    <div>
                  <FormLabel>details</FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center mb-3 space-x-4">
                      <FormField
                        control={form.control}
                        name={`details.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="product detail Title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`details.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="product detail Description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => append({ title: '', description: '' })}>Add Details</Button>
                </div>

                </div>
                <Button  variant="stretch" disabled={loading} className="ml-auto" type="submit" >
                    {action}
                </Button>
            </form>
        </Form>
        </>
    )
}