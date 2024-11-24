"use client";
import { decreaseQuantityApi, increaseQuantityApi, removeFromCartApi, updateCartCoun } from "@/actions/cartfuntion";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/IconButton";
import { useCartStore } from "@/hooks/cartstore";
import { Cross, MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CartItemProps {
    data: {
        id: string;
        name: string;
        quantity: number;
        color: string | null;  // Change here from string | undefined to string | null
        size: string |null;
        salesPrice: number | null;
        image?: string;
    };
    onRemove: (id: string) => void; // Add this prop to handle removal
    onUpdate: () => void; // Add this prop to trigger data update in the parent

}

const CartItem: React.FC<CartItemProps> = ({ data,onRemove,  onUpdate  }) => {
    const [quantity, setQuantity] = useState(data.quantity);
    const router = useRouter();
    const { setCartCount } = useCartStore(); // Get the setCartCount function from Zustand

    const handleRemove = async () => {
        const response = await removeFromCartApi(data.id);
        if (response.success) {
        // Optionally update the UI or notify the user
        toast.success("Item remove successfully")
        onRemove(data.id);  // Trigger the parent's state update to remove the item
        const newCartCount = await updateCartCoun();
        setCartCount(newCartCount);
        router.refresh(); // Refresh the page to update the cart

      } else {
        console.error(response.message);
      }
    };
  
    const handleIncrease = async () => {
      const response = await increaseQuantityApi(data.id);
      if (response.success) {
        
        setQuantity(prevQuantity => prevQuantity + 1);
        onUpdate(); // Re-fetch cart data after removal

        router.refresh(); // Refresh the page to update the cart
      } else {
        console.error(response.message);
        toast.error("Max number of item avaible ")
      }
    };
  
    const handleDecrease = async () => {
      const response = await decreaseQuantityApi(data.id);
      if (response.success) {
        setQuantity(prevQuantity => prevQuantity - 1);
        onUpdate(); // Re-fetch cart data after removal

        router.refresh(); // Refresh the page to update the cart
      } else {
        console.error(response.message);
        toast.error("Cannot decrease less than 1")
      }
    };

    return (
        <li className="flex mb-5 py-6 border-b dark:bg-black/50 dark:border-white/60 bg-white shadow-md rounded-lg hover:shadow-xl transition-all">
            <div className="relative h-32 w-32 rounded-md overflow-hidden md:h-48 md:w-48">
            {data.image && (
                    <Image
                        fill
                        src={data.image}
                        alt={data.name}
                        className="object-cover object-center"
                    />
                )}
            </div>
            <div className="relative ml-4 flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-5 top-0">
                    <IconButton onClick={handleRemove} icon={<Cross className="rotate-45" color="black" size={15} />} />
                </div>
                <div className="relative pr-9 dark:text-gray-200 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold dark:text-white text-black">
                            {data.name}
                        </p>
                    </div>
                    <div className="mt-1 flex text-sm">
                        {/* Displaying the selected color */}
                        {data.color && (
                            <p
                                className={`h-6 w-6 rounded-full cursor-pointer border ring-2 ring-offset-2 ring-black`}
                                style={{ backgroundColor: data.color }}
                            ></p>
                        )}
                        {/* Displaying the selected size */}
                        {data.size && (
                            <p className="text-gray-500 ml-4 mb-4 dark:text-gray-300 border-l border-gray-200 pl-4">
                                Size: {data.size}
                            </p>
                        )}
                    </div>
                    <Currency value={data.salesPrice ?? 0} />
                </div>
                <div className="flex dark:text-white gap-4 items-center mt-4">
                    <MinusCircle
                        className="hover:text-red-500 cursor-pointer"
                        onClick={handleDecrease}
                    />
                    <p className="text-body-bold">{quantity}</p>
                    <PlusCircle
                        className="hover:text-green-500 cursor-pointer"
                        onClick={handleIncrease}
                    />
                </div>
            </div>
        </li>
    );
};

export default CartItem;
