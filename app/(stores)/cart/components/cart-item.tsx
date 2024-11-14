"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/IconButton";
import useCart from "@/hooks/use-cart";
import { Product } from "@/lib/types";
import { Cross, MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
    data: Product & { quantity: number; color?: { value: string }; size?: { value: string } };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.id);
    };

    return (
        <li className="flex py-6 border-b bg-white shadow-md rounded-lg hover:shadow-xl transition-all">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-5 top-0">
                    <IconButton onClick={onRemove} icon={<Cross className="rotate-45" color="black" size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black">
                            {data.name}
                        </p>
                    </div>
                    <div className="mt-1 flex text-sm">
                        {/* Displaying the selected color */}
                        {data.color && (
                            <p
                                className={`h-6 w-6 rounded-full cursor-pointer border ring-2 ring-offset-2 ring-black`}
                                style={{ backgroundColor: data.color.value }}
                            ></p>
                        )}
                        {/* Displaying the selected size */}
                        {data.size && (
                            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                                Size: {data.size.value}
                            </p>
                        )}
                    </div>
                    <Currency value={data.salesPrice} />
                </div>
                <div className="flex gap-4 items-center mt-4">
                    <MinusCircle
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => cart.decreaseQuantity(data.id)}
                    />
                    <p className="text-body-bold">{data.quantity}</p>
                    <PlusCircle
                        className="hover:text-green-500 cursor-pointer"
                        onClick={() => cart.increaseQuantity(data.id)}
                    />
                </div>
            </div>
        </li>
    );
};

export default CartItem;
