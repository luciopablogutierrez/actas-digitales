
"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"
import { councilMembers } from "@/lib/data"

const chartData = councilMembers.map(member => ({
  name: member.name,
  attendance: (member.attendance.filter(a => a.present).length / member.attendance.length) * 100,
  fill: `hsl(var(--chart-${councilMembers.indexOf(member) + 1}))`,
}))

const totalAttendance = chartData.reduce((acc, curr) => acc + curr.attendance, 0) / chartData.length;

const chartConfig = {
  attendance: {
    label: "Asistencia",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function AttendanceChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Asistencia por Concejal</CardTitle>
        <CardDescription>Porcentaje de asistencia a las últimas sesiones</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10 }}>
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-xs"
              width={110}
            />
            <XAxis dataKey="attendance" type="number" hide />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                formatter={(value) => `${(value as number).toFixed(1)}%`}
                />}
              />
            <Bar dataKey="attendance" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-sm items-start">
        <div className="flex items-center gap-2 font-medium leading-none">
          Asistencia total promedio: {totalAttendance.toFixed(1)}%
        </div>
      </CardFooter>
    </Card>
  )
}
