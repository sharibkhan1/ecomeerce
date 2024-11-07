"use client"

import { Product } from "@/lib/types"
import Image from "next/image";
import IconButton from "./IconButton";
import { FaExpand, FaShoppingBag } from "react-icons/fa";
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
        previewModal.onOpen(data);
    }

    const AddToCart:MouseEventHandler<HTMLButtonElement> = (event)=>{
        event.stopPropagation();
        cart.addItem(data);
    }

    const handleClick = ()=>{
        router.push(`/product/${data?.id}`);
    }
    return(
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 " >
            <div className="aspect-square rounded-xl bg-gray-100 relative " >
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="image"
                    className="aspect-square object-cover rounded-md "
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 " >
                    <div className="flex gap-x-6 justify-center" >
                        <IconButton
                        onClick={onPreview}
                        icon={<FaExpand size={20} className="text-gray-600" />}
                        />
                         <IconButton
                        onClick={AddToCart}
                        icon={<FaShoppingBag size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className="font-semibold text-lg " >
                    {data.name}
                </p>
                <p className="text-gray-500 text-sm " >
                    {data.category?.name}
                </p>
            </div>
            <div className="flex items-center justify-between " >
                <Currency value={data?.price}/>
            </div>
        </div>
    )
}
export default ProductCard