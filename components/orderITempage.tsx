import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getOrderItems } from '@/actions/getorder'

interface OrderItem {
  orderCount: number;
  canceledCount: number;
  color: string | null;
  createdAt: Date;
  size: string | null;
  productname: string | null;
}

interface GroupedOrderItem {
  orderCount: number;
  canceledCount: number;
  productname: string | null;
  color: string | null;
  size: string | null;
  orderMonths?: Record<string, number>;
  mostOrderedMonth: string;
}

const OrderItemListPage: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  useEffect(() => {
    // Fetch order item data when the component mounts
    const fetchData = async () => {
      const items = await getOrderItems()
      setOrderItems(items)
    }

    fetchData()
  }, [])

  // Function to group the items based on productname, color, size, and createdAt
  const groupOrderItems = (items: OrderItem[]): GroupedOrderItem[] => {
    const groupedItems: Record<string, GroupedOrderItem> = {}

    items.forEach(item => {
      const key = `${item.productname}-${item.color}-${item.size}`

      // If the item group already exists, update the counts
      if (groupedItems[key]) {
        groupedItems[key].orderCount += item.orderCount
        groupedItems[key].canceledCount += item.canceledCount

        // Track orders by month for determining the most ordered month
        const orderMonth = new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })
        if (!groupedItems[key].orderMonths) {
          groupedItems[key].orderMonths = {} // Initialize if not yet set
        }

        groupedItems[key].orderMonths[orderMonth] = (groupedItems[key].orderMonths[orderMonth] || 0) + item.orderCount
      } else {
        // Initialize a new group
        groupedItems[key] = { 
          orderCount: item.orderCount,
          canceledCount: item.canceledCount,
          productname: item.productname,
          color: item.color,
          size: item.size,
          orderMonths: {
            [new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })]: item.orderCount,
          },
          mostOrderedMonth: '', // Placeholder for the most ordered month
        }
      }
    })

    // After grouping, determine the most frequent month for each group
    Object.values(groupedItems).forEach(item => {
      const mostOrderedMonth = Object.entries(item.orderMonths || {})
        .reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])
      item.mostOrderedMonth = mostOrderedMonth[0]
      delete item.orderMonths // Clean up the orderMonths data
    })

    return Object.values(groupedItems)
  }

  // Group the order items
  const groupedOrderItems = groupOrderItems(orderItems)

  return (
    <div className="space-y-4 p-8">
      <Card>
        <CardHeader>
          <CardTitle>Order Items Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Most ordered</th>
                  <th className="px-4 py-2">Color</th>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2">Ordered</th>
                  <th className="px-4 py-2">Canceled</th>
                </tr>
              </thead>
              <tbody>
                {groupedOrderItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{item.productname}</td>
                    <td className="px-4 py-2">{item.mostOrderedMonth}</td> {/* Display most ordered month */}
                    <td className="px-2 py-2" style={{ backgroundColor: item.color ?? 'transparent' }}></td>
                    <td className="px-4 py-2">{item.size}</td>
                    <td className="px-4 py-2">{item.orderCount}</td>
                    <td className="px-4 py-2">{item.canceledCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderItemListPage
