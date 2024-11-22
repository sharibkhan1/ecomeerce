"use client"

import { Product,ProductSmall  } from "@/lib/types"
import Image from "next/image";
import IconButton from "./IconButton";
import { FaExpand } from "react-icons/fa";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";

interface ProductCard{
    data:Product;
}

const ProductCard:React.FC<ProductCard>=({
    data
})=>{
    const cart = useCart();
    const router= useRouter();
    const previewModal = usePreviewModal();

    const onPreview:MouseEventHandler<HTMLButtonElement> = (event)=>{
        event.stopPropagation();
        const productSmall: ProductSmall = {
            id: data.id,
            category: data.category,
            name: data.name,
            price: data.price,
            isFeatured: data.isFeatured,
            size: data.size,
            color: data.color,
            size1: data.size1,
            color1: data.color1,
            size2: data.size2,
            color2: data.color2,
            size3: data.size3,
            color3: data.color3,
            salesPrice: data.salesPrice,
            images: data.images,
            stocks: data.stocks,
            dilevery: data.dilevery,
        };

        // Pass ProductSmall to the modal
        previewModal.onOpen(productSmall);
    };


    const handleClick = ()=>{
        router.push(`/product/${data?.id}`);
    }
    return(
        <div onClick={handleClick} className="bg-white dark:bg-primary-foreground group cursor-pointer rounded-xl dark:border-white/60 border p-3 space-y-4 " >
            <div className="aspect-square rounded-xl bg-gray-100 relative " >
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="image"
                    className="aspect-square object-cover rounded-md "
                />
                <div className="opacity-0   group-hover:opacity-100 transition absolute w-full px-6 bottom-5 " >
                    <div className="hidden md:flex gap-x-6 justify-center" >
                        <IconButton
                        onClick={onPreview}
                        icon={<FaExpand size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className="font-semibold dark:text-gray-100 text-lg " >
                    {data.name}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm " >
                    {data.category?.name}
                </p>
            </div>
            <div className="flex items-center justify-between " >
                <span className="text-red-400 line-through" >
                <Currency value={data?.price}/>
                </span>
                <span className="font-extrabold dark:text-gray-100 text-2xl" >
                <Currency value={data?.salesPrice}/>
                </span>
            </div>
        </div>
    )
}
export default ProductCard