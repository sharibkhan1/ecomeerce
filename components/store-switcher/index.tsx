// "use client"
// import React, { useState } from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Store } from '@prisma/client';
// import { useStoreModal } from '@/hooks/use-store-modal';
// import { useParams, useRouter } from 'next/navigation';
// import { Button } from '../ui/button';
// import { cn } from '@/lib/utils';
// import { CheckIcon, ChevronUpIcon, TableIcon } from '@radix-ui/react-icons';
// import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
// import { FaStore } from 'react-icons/fa';

// type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

// interface StoreSwitcherProps extends PopoverTriggerProps{
//     items: Store[];
// }

// const StoreSwitcher = ({className,items=[]}:StoreSwitcherProps) => {
//   const storeModal = useStoreModal();
//   const params = useParams();
//   const router = useRouter();

//   const formattedItems = items.map((item)=>({
//     label:item.name,
//     value: item.id
//   }));

//   const currentStore=  formattedItems.find((item)=>item.value === params.storeId);

//   const [open, setOpen]= useState(false);
//   const onStoreSelect = (store:{value:string,label:string})=>{
//     setOpen(false);
//     router.push(`/${store.value}`);
//   }

//     return (
//     <Popover open={open} onOpenChange={setOpen} >
//         <PopoverTrigger asChild >
//             <Button
//                 variant="outline"
//                 size="sm"
//                 role="combobox"
//                 aria-expanded={open}
//                 aria-label='Select a store'
//                 className={cn("w-[200px] justify-between",className)}
//             >
//                 <TableIcon className="mr-2 h-4 w-4 " />
//                 {currentStore?.label}
//                 <ChevronUpIcon className='ml-auto h-4 w-4 shrink-0 opacity-50 ' />
//             </Button>
//         </PopoverTrigger>
//         <PopoverContent className='w-[200px] p-0 ' >
//             <Command>
//                 <CommandList>
//                     {/* <CommandInput placeholder='Seacrh store...' /> */}
//                     <CommandEmpty>No store found</CommandEmpty>
//                     <CommandGroup heading="Store" >
//                         {formattedItems.map((store)=>(
//                             <CommandItem key={store.value} onSelect={()=>onStoreSelect(store)} 
//                                 className='text-sm'
//                             >
//                                 <FaStore className='mr-2 h-4 w-4' />
//                                 {store.label}
//                                 <CheckIcon
//                                 className={cn(
//                                     "ml-auto h-4 w-4 ",
//                                     currentStore?.value === store.value
//                                     ?"opacity-100":"opacity-0"
//                                 )}
//                                 />
//                             </CommandItem>
//                         ))}
//                     </CommandGroup>
//                 </CommandList> 
//                 {/* <CommandSeparator/>
//                 <CommandList>
//                         <CommandGroup>
//                             <CommandItem onSelect={()=>{
//                                 setOpen(false);
//                                 storeModal.onOpen();
//                             }} >
//                                 <PlusCircledIcon className='h-5 w-5 mr-2' />
//                             </CommandItem>
//                         </CommandGroup>
//                 </CommandList>  */}
//             </Command>
//         </PopoverContent>
//     </Popover>
//   )
// }

// export default StoreSwitcher