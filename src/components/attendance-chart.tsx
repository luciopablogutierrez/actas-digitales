"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { councilMembers } from "@/lib/data";

const chartData = councilMembers.map(member => ({
  name: member.name.split(' ').slice(0,2).join(' '),
  attendance: (member.attendance.filter(a => a.present).length / member.attendance.length) * 100,
  fill: "var(--color-attendance)",
}));

const chartConfig = {
  attendance: {
    label: "Asistencia",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            cursor={{ fill: "hsl(var(--card))" }}
            content={<ChartTooltipContent 
              formatter={(value) => typeof value === 'number' ? `${value.toFixed(0)}%` : `${value}`}
              hideLabel 
            />}
          />
          <Bar 
            dataKey="attendance" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
