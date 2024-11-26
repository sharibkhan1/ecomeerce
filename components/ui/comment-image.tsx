"use client"

import { useEffect, useState } from "react";
import { Button } from "./button";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { FcStackOfPhotos } from "react-icons/fc";

interface ImageUploadProps{
    disabled?: boolean;
    onChange:(value: string) =>void;
    onRemove:(value: string) =>void;
    value:string[]
}

const ImageUploadComment:React.FC<ImageUploadProps>=({
    disabled,onChange,onRemove,value
})=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    const onUpload = (result: CloudinaryUploadWidgetResults) => {
        // Check if the result.info is defined and if it has a secure_url
        if (result.info && typeof result.info !== "string" && result.info.secure_url) {
            onChange(result.info.secure_url);
        } else {
            console.error("Failed to get secure_url from Cloudinary upload result", result);
        }
    }

    if(!isMounted){
        return null;
    }

    return(
        <div>
            <div className="mb-4 flex items-center gap-4 " >
                {value.map((url)=>(
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden " >
                        <div className="z-10 absolute top-2 right-2 " >
                            <Button type="button" onClick={()=>onRemove(url)} variant="destructive" size="icon" >
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div> 
                        <Image
                            fill
                            className="object-cover"
                            alt="image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
                <CldUploadWidget  onSuccess ={onUpload} uploadPreset="gsohl1qu" >
                       {({open})=>{
                        const onClick=()=>{
                            open();
                        }
                        return(
                            <Button 
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}
                            >
                                <FcStackOfPhotos className="h-4 w-4 mr-2"/>
                                Upload Image
                            </Button>
                        )
                       }}
                </CldUploadWidget >
        </div>
    )
};
export default ImageUploadComment; 