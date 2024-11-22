import { getDailyOrderStatus, getDailyRevenue, getGraphRevenue, getYearOrderStatus } from '@/actions/get-graph'
import { getSalesCount } from '@/actions/get-sales-count'
import { getStockCount } from '@/actions/get-stock'
import { getTotalRevenue } from '@/actions/get-total-revenue'
import { Overview, Overviewarea, OverviewStacked } from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { formatter } from '@/lib/utils'
import { CreditCard, Package } from 'lucide-react'
import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'

interface DashboardPageProps {
  params: { storeId: string }
}


const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  // Fetch data
  const currentYear = new Date().getFullYear();
  const getMonthName = (monthNumber: number): string => {
    const monthNames = [
      "January", "February", "March", "April", "May", 
      "June", "July", "August", "September", "October", 
      "November", "December"
    ];
    return monthNames[monthNumber - 1] || ""; // aSubtract 1 because array is 0-indexed
  };
  
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);  // Get the graph data here
  const graphRevenueDdaily = await getDailyRevenue(params.storeId,currentYear);  // Get the graph data here
  const orderStatusData = await getDailyOrderStatus(params.storeId, currentYear); // Fetch order status data
  const graphOrder = await getYearOrderStatus(params.storeId);  // Get the graph data here

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 dark:bg-muted-foreground p-8 pt-6'>
        <Heading
          title="Dashboard"
          description="Overview of your store"
        />
        <Separator />
        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center  justify-between space-y-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <FaRupeeSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-2'>
              <CardTitle className='text-sm font-medium'>
                Orders
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                +{salesCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-2'>
              <CardTitle className='text-sm font-medium'>
                Product in Stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {stockCount}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>
              Monthly Revenue Graph
            </CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
          <div className="flex overflow-x-auto space-x-4">
      {graphRevenue.map((yearlyData, index) => (
        <div key={index} className="min-w-[100%]">
          <h3 className="text-lg font-bold mb-2">Year: {yearlyData.year}</h3>
          <Overview data={yearlyData.data} />
        </div>
      ))}
    </div>          </CardContent>
        </Card>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>
              Daily Revenue Graph
            </CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
          <div className="flex overflow-x-auto space-x-4">
      {graphRevenueDdaily.map((monthlyData, index) => (
        <div key={index} className="min-w-[100%]">
          <h3 className="text-lg font-bold mb-2">  {getMonthName(monthlyData.month)}</h3>
          <Overviewarea data={monthlyData.data} />
        </div>
      ))}
    </div>       
       </CardContent>
       <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>
              Monthly Order Graph
            </CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
          <div className="flex overflow-x-auto space-x-4">
      {graphOrder.map((yearlyData, index) => (
        <div key={index} className="min-w-[100%]">
          <h3 className="text-lg font-bold mb-2">Year: {yearlyData.year}</h3>
          <OverviewStacked data={yearlyData.data} />
        </div>
      ))}
    </div>          </CardContent>
        </Card>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Order Status Graph</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
          <div className="flex overflow-x-auto space-x-4">
          {orderStatusData.map((monthlyData, index) => (
        <div key={index} className="min-w-[100%]">
          <h3 className="text-lg font-bold mb-2">  {getMonthName(monthlyData.month)}</h3>
            <OverviewStacked data={monthlyData.data} />
          </div>
        ))}
        </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage;
