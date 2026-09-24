"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { level: "junior", value: 42, fill: "var(--color-junior)" },
  { level: "middle", value: 38, fill: "var(--color-middle)" },
  { level: "senior", value: 20, fill: "var(--color-senior)" },
]

const chartConfig = {
  value: { label: "Tỷ lệ (%)" },
  junior: { label: "Junior", color: "var(--chart-3)" },
  middle: { label: "Middle", color: "var(--chart-2)" },
  senior: { label: "Senior", color: "var(--chart-1)" },
} satisfies ChartConfig

export function LevelDonutChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Biểu đồ cấp bậc</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[320px] w-full">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="level" hideLabel />} />
            <Pie data={data} dataKey="value" nameKey="level" innerRadius={70} strokeWidth={4} />
            <ChartLegend content={<ChartLegendContent nameKey="level" />} className="mt-2" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
