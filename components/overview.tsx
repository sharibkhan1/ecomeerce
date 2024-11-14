"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface OverviewProps {
    data: any[];
};

export const Overview: React.FC<OverviewProps> = ({
    data
}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                {/* Add Cartesian Grid for the chart background grid */}
                <CartesianGrid strokeDasharray="3 3" />
                
                {/* Tooltip for interactivity, showing data on hover */}
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                
                {/* Add Legend to display labels for each data series */}
                <Legend />
                
                {/* X-Axis configuration */}
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                
                {/* Y-Axis configuration */}
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}  // Format the Y-axis values as currency
                    domain={['auto', 'auto']} // Adjusting domain for more control over the scaling
                    tickCount={6} // You can tweak this to change the number of ticks
                />
                
                {/* Bar chart with total as dataKey */}
                <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};
