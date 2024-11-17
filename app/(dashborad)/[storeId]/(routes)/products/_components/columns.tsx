import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  color: string
  color1:string
  color2:string
  color3:string
  size1:string,
  size2:string,
  size3:string,
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
  discription: string
  salesPrice: string
  stocks: string
  dilevery:string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "dilevery",
    header: ({ column }) => {
      return (
        <Button
          className="text-black p-2 rounded-md" // Ensures text is visible with padding
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dilevery Day
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let deliveryText = row.original.dilevery;
  
      // Check if "day" or "days" is already in the delivery value
      if (!deliveryText.toLowerCase().includes("days")) {
        // If not, add "day" to the end
        deliveryText += " days";
      }
  
      return (
        <div className="">
          {deliveryText} {/* Display delivery text with appended "day" if necessary */}
        </div>
      );
    }
  }
  ,
  {
    accessorKey: "stocks",
    header: ({ column }) => {
      return (
        <Button
          className="text-black p-2 rounded-md" // Ensures text is visible with padding
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stocks
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stocks = Number(row.original.stocks);
      let stockBgColor = 'transparent'; // default

      if (stocks === 0) {
        stockBgColor = 'bg-red-200'; // Red for out of stock
      } else if (stocks < 10) {
        stockBgColor = 'bg-yellow-200'; // Yellow for low stock
      }

      return (
        <div className={`p-2 text-center rounded ${stockBgColor}`}>
          {stocks}
        </div>
      );
    }
  },
  {
    accessorKey: "size", // or another key like "size1", "size2", "size3"
    header: "Size",
    cell: ({ row }) => {
      const { size, size1, size2, size3 } = row.original;
  
      // Collect all available size values, filter out null, undefined, and "N/A" values
      const sizes = [size, size1, size2, size3].filter(value => value && value !== "n/a");
  
      // If no valid sizes are found, fall back to the main size if it's not "N/A"
      const displayedSizes = sizes.length > 0 ? sizes : (size !== "N/A" ? [size] : []);
  
      return (
        <div className="flex items-center gap-x-2">
          {displayedSizes.map((size, index) => (
            <div key={index} className="p-1 rounded border">
              {size} {/* Display each size */}
            </div>
          ))}
        </div>
      );
    },
  },
  
  
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const { color, color1, color2, color3 } = row.original;
  
      // Collect all color values, filtering out "N/A" values
      const colors = [color, color1, color2, color3].filter(value => value && value !== "#00000000");
  
      return (
        <div className="flex items-center gap-x-1">
          {colors.map((color, index) => (
            <div
              key={index}
              className="h-5 w-5 rounded-full border"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      );
    },
  },
  
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "salesPrice",
    header: ({ column }) => {
      return (
        <Button
          className="text-black p-2 rounded-md" // Ensures text is visible with padding
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          salesPrice
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="text-black p-2 rounded-md" // Ensures text is visible with padding
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
