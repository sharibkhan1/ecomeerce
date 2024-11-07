import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  color: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
  discription: string
  salesPrice: string
  stocks: string
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
    accessorKey: "stocks",
    header: "Stocks",
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
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell:({row})=>( 
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div 
          className="h-6 w-6 rounded-full border" 
          style={{ backgroundColor: row.original.color }}
        />  
      </div>
    )
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "salesPrice",
    header: "SalesPrice",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
