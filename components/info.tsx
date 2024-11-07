"use client"
import { Product } from '@/lib/types'
import React from 'react'
import Currency from './ui/currency';
import { Button } from './ui/button';
import { FaShoppingCart } from 'react-icons/fa';

interface InfoProps{
    data:Product;
}

const InfoPage:React.FC<InfoProps> = ({data}) => {
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-900 ' >{data.name}</h1>
        <div className='mt-3 flex items-end justify-between ' >
            <p className='text-2xl line-through text-red-500  '>
                <Currency value={data?.price} />
            </p>
            <p className='text-2xl text-gray-900 '>
                <Currency value={data?.salesPrice} />
            </p>
        </div>
        <hr className='my-4' />
        <div className='flex flex-col gap-y-6' >
        <div className='flex items-center gap-x-4 ' >
            <h3 className='font-semibold text-black ' >Size:</h3>
            <div>
                {data?.size?.name}
            </div>
        </div>
        <div className='flex items-center gap-x-4' >
            <h3 className='font-semibold text-black ' >Color:</h3>
            <div className='h-6 w-6 rounded-full border border-gray-600 '
            style={{backgroundColor:data?.color?.value}} >
            </div>
        </div>
        <div className='flex items-center gap-x-4 ' >
            <h3 className='font-semibold text-black ' >Stock:</h3>
            <div>
                {data?.stocks}
            </div>
        </div>
        <div className='flex items-start text-xl  text-gray-700' >
            <p>{data?.discription}</p>
        </div>
        <div className='mt-6'>
    {data?.details?.length > 0 && (
        <>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='text-left p-2'>Title</th>
                        <th className='text-left p-2'>Description</th>
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

        <div className='mt-10 flex items-center gap-x-3 ' >
            <Button className='flex items-center gap-x-3 ' >
                Add To Cart
                <FaShoppingCart/>
            </Button>
        </div>
        </div>
    </div>
  )
}

export default InfoPage