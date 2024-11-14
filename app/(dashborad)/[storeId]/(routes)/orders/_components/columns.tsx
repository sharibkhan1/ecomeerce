"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { format, addDays, intervalToDuration, formatDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  status: string;
  orderState: string;
  itemDetails:{
    name:string;
    color:string;
    size:string;
    quantity:string;
  }[];
  dileve:{
    dilevery:string;
  }[];
  statu:{
    status:string;
  }[];
  orderStat:{
    orderState:string;
  }[];
  itemsSummary: {
    name: string;
    price: string;
    status: string;
    orderState: string;
  }[]; // Array of each item’s details
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "itemDetails",
    header: "Item Details",
    cell: ({ row }) => (
      <div>
        {row.original.itemDetails.map((item, index) => (
          <div key={index}>
            <p><strong>Product:</strong> {item.name}</p>
            <p><strong>Status:</strong> {item.color}</p>
            <p><strong>Order State:</strong> {item.size}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "itemsSummary",
    header: ({ column }) => {
      return (
        <Button
          className=" text-black p-2 rounded-md" // Ensures text is visible with padding
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.original.dileve.map((item, index) => (
          <div key={index}>
            <p><strong></strong> {item.dilevery}</p>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "statu",
    header: ({ column }) => {
      return (
        <Button
          className=" text-black p-2 rounded-md" // Ensures text is visible with padding
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.original.statu.map((item, index) => (
          <div key={index}>
            <p><strong></strong> {item.status}</p>
            <hr className="my-2" />
          </div>
        ))}
        
      </div>
    ),
  },
  {
    accessorKey: "orderStat",
    header: ({ column }) => {
      return (
        <Button
          className=" text-black p-2 rounded-md" // Ensures text is visible with padding
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          orderStats
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.original.orderStat.map((item, index) => (
          <div key={index}>
            <p><strong></strong> {item.orderState}</p>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

