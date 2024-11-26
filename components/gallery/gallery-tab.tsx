import { Image as ImageType } from "@/lib/types"
import { cn } from "@/lib/utils";
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface GalleryPros{
    image:ImageType;
}

const GalleryTab:React.FC<GalleryPros>=({
    image
})=>{
    return(
        <Tab className="relative flex aspect-square cursor-pointer items-center justify-center
        rounded-md dark:bg-black bg-white " >
            {({selected})=>(
                <div>
                    <span className="absolute h-full w-full aspect-square inset-0
                    overflow-hidden rounded-md " >
                        <Image
                        fill
                        src={image.url}
                        alt=""
                        className="object-cover object-center "
                        />
                    </span>
                    <span
                    className={cn(
                        "absolute inset-0 rounded-md ring-2 ring-offset-2 ",
                        selected ? "ring-black  dark:ring-white" : "ring-transparent"
                    )}
                    />
                </div>
            )}
        </Tab>

    )}
export default GalleryTab