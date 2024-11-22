"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps{
    title:string;
    description:string;
    isOpen: boolean;
    onClose:()=>void;
    children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps>=({
    title,description,isOpen,onClose,children
})=>{
    const onChange = (open:boolean)=>{
        if(!open){
            onClose();
        }
    };

    return(
        <Dialog  open={isOpen} onOpenChange={onChange} >
            <DialogContent className="bg-white dark:bg-black/80">
                <DialogHeader className="text-black dark:text-white" >
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="text-black dark:text-white" >
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}