"use client";
import React, { useState } from "react";
import { getGraphRevenue } from "@/actions/get-graph"; // Import the server-side function to get graph data
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FaCalendarAlt } from "react-icons/fa";
import { Overview } from "@/components/overview";

interface YearlyRevenueGraphProps {
  storeId: string;
}

const YearlyRevenueGraph: React.FC<YearlyRevenueGraphProps> = ({ storeId }) => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Default to current year
  const [graphData, setGraphData] = useState<any[]>([]); // Store graph data for the selected year
  const [loading, setLoading] = useState<boolean>(false);

  const handleYearChange = async (year: string) => {
    const yearNum = parseInt(year, 10);
    setSelectedYear(yearNum);
    setLoading(true);
    try {
      // Fetch the revenue data for the selected year
      const data = await getGraphRevenue(storeId, yearNum);
      setGraphData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="col-span-4">
        <CardTitle>Monthly Revenue for {selectedYear}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Select onValueChange={handleYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {[2022, 2023, 2024, 2025].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FaCalendarAlt className="text-muted-foreground" />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {/* Render the graph here */}
            <Overview data={graphData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default YearlyRevenueGraph;
