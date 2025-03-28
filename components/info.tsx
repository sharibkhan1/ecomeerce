"use client"
import { Product } from '@/lib/types';
import React, { MouseEventHandler, useState } from 'react';
import Currency from './ui/currency';
import { Button } from './ui/button';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'sonner';
import { addToCart } from '@/actions/ordercat';
import { useCartStore } from '@/hooks/cartstore';
import { updateCartCount } from '@/actions/cartfuntion';

interface InfoProps {
  data: Product;
}

const InfoPage: React.FC<InfoProps> = ({ data }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { setCartCount } = useCartStore(); // Get the setCartCount function from Zustand

  const AddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    if (!selectedColor || !selectedSize) {
      return toast.error("Please select both color and size.");
    }
    const firstImage = data.images[0]?.url;  // Assuming the first image URL is available

    const result = await addToCart({
      productId: data.id,
      color: selectedColor,
      size: selectedSize,
      name:data.name,
      quantity: 1, // Default to 1 for now
      price: data.salesPrice,
      image: firstImage || '',  // Assuming you have an imageUrl field in your data model
    });

    if (result?.success) {
      toast.success("Item added to cart");
      const newCartCount = await updateCartCount();
      setCartCount(newCartCount);  // Update the Zustand state with the new count

    } else {
      toast.error("product cannot be added");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold dark:text-gray-300 text-gray-900">{data.name}</h1>
      <h1 className="text-xl font-semibold dark:text-gray-300 text-gray-900">{data.category.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-xl line-through text-red-500">
          <Currency value={data?.price} />
        </p>
        <p className="text-4xl dark:text-gray-200 text-gray-700">
          <Currency value={data?.salesPrice} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        {/* Size Selection */}
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold dark:text-gray-300 text-black">Size:</h3>
          <div className="flex gap-x-3">
          {[data.size, data.size1, data.size2, data.size3]
  .filter((size) => size?.value !== 'n/a')
  .map((size) => (
    <span
      key={size?.value}
      onClick={() => setSelectedSize(size?.value)}
      className={`cursor-pointer mr-4 px-4 py-2 border rounded
        ${selectedSize === size?.value 
          ? 'bg-gray-800 dark:bg-gray-100 dark:text-gray-900 text-white border-gray-800'    // Selected: black background, white text, black border
          : 'bg-transparent dark:text-gray-100 dark: border-gray-500 text-gray-800'} // Non-selected: transparent background, black text, black border
      `}
    >
      {size?.value}
    </span>
  ))}

          </div>
        </div>

        {/* Color Selection */}
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold dark:text-gray-300 text-gray-800">Color:</h3>
          <div className="flex gap-x-2">
            {[data.color, data.color1, data.color2, data.color3]
              .filter((color) => color?.value !== '#00000000')
              .map((color) => (
                <div
                  key={color?.value}
                  onClick={() => setSelectedColor(color?.value)}
                  className={`h-6 w-6 rounded-full cursor-pointer border ${selectedColor === color?.value ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  style={{ backgroundColor: color?.value }}
                />
              ))}
          </div>
        </div>
        <div className='flex items-center gap-x-4 dark:text-gray-100 ' >
            <h3 className='font-semibold text-black dark:text-gray-300 ' >Stock:</h3>
            <div>
                {data?.stocks}
            </div>
        </div>
        <div className='flex items-start text-lg dark:text-gray-300  text-gray-700' >        <p
        className={`transition-all duration-300 ${
          isExpanded ? '' : 'line-clamp-5' // Apply line clamp when collapsed
        }`}
      >
        {data?.discription}</p>
    </div>
    <div className='flex items-end -mt-7 dark:text-gray-300 text-sm text-gray-700'>
  {data?.discription && data?.discription.split(' ').length > 25 && ( // Check if discription exists before using split
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="text-blue-500 hover:underline mt-2"
    >
      {isExpanded ? 'Show Less' : 'Show More'}
    </button>
  )}
</div>


        <div className='mt-6'>
    {data?.details?.length > 0 && (
        <>
            <table className='table-auto dark:text-gray-300 w-full'>
                <thead>
                    <tr>
                        <th className='text-left p-2 dark:text-gray-100'>Title</th>
                        <th className='text-left p-2 dark:text-gray-100'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.details.map((detail) => (
                        <tr key={detail.id}>
                            <td className='p-2 border-b'>{detail.title}</td>
                            <td className='p-2 border-b'>{detail.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )}
    {data?.details?.length === 0 && (
        <p className="text-center text-gray-500">No details available</p>
    )}
</div>

        {/* Add to Cart Button */}
        <div className="md:mt-10 mt-3 flex items-center gap-x-3">
          <Button variant="brutal" onClick={AddToCart} disabled={data.stocks === 0}  className={`flex p-7 items-center bg-yellow-300 hover:bg-yellow-200 gap-x-3${
            data.stocks === 0 ? 'bg-red-500  cursor-not-allowed': ''
          }`}>
            {data.stocks === 0 ? 'Out of Stock ' : 'Add To Cart'}
            <FaShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
