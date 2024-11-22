"use client";
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import React from 'react';
import "@uploadthing/react/styles.css";
import Image from 'next/image';
import { UploadDropzone } from "@/lib/uplaodthing";
import { Button } from './ui/button';

interface FileUploadProps {
    onChange: (url?: string) => void;
    onRemove: (url: string) => void;
    value: string[];
    endpoint: "serverImage";
}

const FileUpload = ({ onChange, onRemove, value, endpoint }: FileUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="uploaded image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <UploadDropzone
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    console.log(error);
                }}
                endpoint={"imageUploader"} 
            />
        </div>
    );
};

export default FileUpload;
