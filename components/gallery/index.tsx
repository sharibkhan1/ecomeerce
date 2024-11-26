"use client";

import { useState } from "react";
import { Image as ImageType } from "@/lib/types";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    return (
        <>
            {/* Main Gallery */}
            <TabGroup as="div" className="flex flex-col-reverse">
                <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                    <TabList className="grid grid-cols-4 gap-6">
                        {images.map((image) => (
                            <GalleryTab key={image.id} image={image} />
                        ))}
                    </TabList>
                </div>

                <TabPanels className="aspect-square w-full">
                    {images.map((image) => (
                        <TabPanel key={image.id}>
                            <div
                                className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden cursor-pointer"
                                onClick={() => {
                                    setIsZoomed(true);
                                    setZoomedImage(image.url);
                                }}
                            >
                                <Image
                                    fill
                                    src={image.url}
                                    alt="Selected image"
                                    className="object-cover object-center"
                                />
                            </div>
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>

            {/* Zoomed Image Modal */}
            <AnimatePresence>
                {isZoomed && zoomedImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-75 md:bg-opacity-50"
                        onClick={() => {
                            setIsZoomed(false);
                            setZoomedImage(null);
                        }}
                    >
                        <motion.div className="relative md:w-3/4 h-screen  w-[20rem] md:h-3/4  overflow-hidden">
                            <Image
                                src={zoomedImage}
                                alt="Zoomed Image"
                                fill
                                className="object-contain rounded-2xl shadow-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
