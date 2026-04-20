"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface OverviewUserChartProps {
  data: Array<{ _id: string; count: number }>;
}

// Date formatter for charts (e.g. "2026-04-13" -> "Apr 13")
const formatChartDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

export const OverviewUserChart = ({ data }: OverviewUserChartProps) => {
  if (!data || data.length === 0) return null;

  return (
    <Card className="rounded-[2px] border-outline bg-surface-container-lowest shadow-none">
      <CardHeader className="border-b border-outline/50 pb-5 pt-6 px-6 lg:px-8">
        <CardTitle className="font-display text-2xl tracking-wider capitalize">
          User Acquisition
        </CardTitle>
        <CardDescription className="text-primary font-mono text-xs uppercase tracking-widest font-bold mt-1">
          Trailing 7 Days
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 lg:p-8 pt-8">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c8352a" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#c8352a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2d2924"
                vertical={false}
              />
              <XAxis
                dataKey="_id"
                stroke="#9c8e7e"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={formatChartDate}
              />
              <YAxis
                stroke="#9c8e7e"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1b16",
                  borderColor: "#3d3832",
                  color: "#eee4d4",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
                itemStyle={{ color: "#c8352a", fontWeight: "bold" }}
                labelFormatter={(label) => formatChartDate(label as string)}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="New Users"
                stroke="#c8352a"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
