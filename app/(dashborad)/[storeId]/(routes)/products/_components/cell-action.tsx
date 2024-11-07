"use client"

import React, { useState } from 'react'
import { ProductColumn } from './columns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CopyIcon ,DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
import { FaEdit } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import { AlertModal } from '@/components/alert-modal';

interface CellActionProps{
    data:ProductColumn;
}

const CellAction:React.FC<CellActionProps> = ({data}) => {

    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);

    const params= useParams();
    const router = useRouter();

    const onDelete = async()=>{
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${data.id}`);
            router.refresh();
            toast.success("product deleted")
        }catch(e){
            toast.error("something went wrong");
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }
    
    const onCopy=(id:string)=>{
        navigator.clipboard.writeText(id);
        toast.success("copied")
    }
  return (
    <>
    <AlertModal
    isOpen={open} 
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}    
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild >
            <Button variant="ghost" className='h-8 w-8 p-0' >
                <span className='sr-only' >
                    Open menu
                </span>
                <DotsHorizontalIcon className='h-4 w-4 ' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' >
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>onCopy(data.id)} >
                <CopyIcon className='mr-2 h-4 w-4'/>
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/products/${data.id}`)} >
                <FaEdit className='mr-2 h-4 w-4'/>
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpen(true)} >
                <TrashIcon className='mr-2 h-4 w-4'/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction