"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { skill: "Python", demand: 88 },
  { skill: "SQL", demand: 76 },
  { skill: "Machine Learning", demand: 64 },
  { skill: "Pandas", demand: 58 },
  { skill: "TensorFlow", demand: 45 },
  { skill: "Tableau", demand: 39 },
  { skill: "Spark", demand: 31 },
]

const chartConfig = {
  demand: {
    label: "Tỷ lệ xuất hiện (%)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function SkillsBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Top Kỹ Năng được yêu cầu</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ left: 4, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="skill"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={70}
              className="text-xs"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="demand" fill="var(--color-demand)" radius={[6, 6, 0, 0]} maxBarSize={56} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
