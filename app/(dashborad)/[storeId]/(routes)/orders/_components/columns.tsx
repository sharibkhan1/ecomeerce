"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

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
  statuss: string; // Now it's just an array of status values

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
    header: "Order Details",
    cell: ({ row }) => (
      <div>
        {row.original.itemDetails.map((item, index) => (
          <div key={index}>
            <p><strong>Product:</strong> {item.name}</p>
            <p>
  <strong>Color:</strong> 
  {item.color ? (
    <>
      <span
        style={{ backgroundColor: item.color }}
        className="w-6 h-6 inline-block rounded-full border border-gray-300"
        title={item.color} // Tooltip for accessibility
      ></span>
    </>
  ) : (
    <span>N/A</span>
  )}
</p>
            <p><strong>Size:</strong> {item.size}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "itemsSummary",
    header:"Time Remaining",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       className=" text-black p-2 rounded-md" // Ensures text is visible with padding
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Time Remaining
    //       <ArrowUpDown className="h-4 w-4 ml-2" />
    //     </Button>
    //   );
    // },
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
    accessorKey: "statuss",
    header: "Status",
    cell: ({ row }) => {
      const statussArray = row.original.statuss.split(', '); // Split the joined string back into an array
  
      return (
        <div>
          {statussArray.map((status, index) => {
            const stockBgColor =
              status === "Ordered"
                ? "bg-green-200"
                : status === "Cancel"
                ? "bg-red-200"
                : "bg-gray-300";
  
            return (
              <div key={index} className={`p-2 text-center rounded ${stockBgColor}`}>
                <p>
                  <strong>{status}</strong>
                </p>
                <hr className="my-2" />
              </div>
            );
          })}
        </div>
      );
    },
  }
  ,
  {
    accessorKey: "orderStat",
    header:"orderStauts",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       className=" text-black p-2 rounded-md" // Ensures text is visible with padding
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       orderStauts
    //       <ArrowUpDown className="h-4 w-4 ml-2" />
    //     </Button>
    //   );
    // },
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

