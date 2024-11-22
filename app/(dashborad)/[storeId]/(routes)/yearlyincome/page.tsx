"use client"
import { useState } from 'react';
import { getGraphRevenue } from '@/actions/get-graph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/overview';

interface YearlyGraphPageProps {
  params: { storeId: string }
}

const YearlyGraphPage: React.FC<YearlyGraphPageProps> = async ({ params }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const graphRevenue = await getGraphRevenue(params.storeId,year ); // Pass the selected year

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Monthly Revenue Graph for {year}
            </CardTitle>
            <select onChange={handleYearChange} value={year}>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              {/* Add more years if needed */}
            </select>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default YearlyGraphPage;
