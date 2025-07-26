
"use client";

import {
  PolarGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

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
  },
  ...Object.fromEntries(chartData.map((d, i) => [d.name, { label: d.name, color: `hsl(var(--chart-${i + 1}))` }]))
} satisfies ChartConfig

export function AttendanceChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Asistencia por Concejal</CardTitle>
        <CardDescription>Porcentaje de asistencia a las últimas sesiones</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
            innerRadius="30%"
            outerRadius="80%"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" />
            <RadialBar dataKey="attendance" background cornerRadius={10} />
            <PolarAngleAxis dataKey="name" tick={false} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Asistencia total: {totalAttendance.toFixed(1)}%
        </div>
        <div className="leading-none text-muted-foreground">
          Promedio de todos los concejales
        </div>
      </CardFooter>
    </Card>
  )
}
