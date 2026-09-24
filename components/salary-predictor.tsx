"use client"

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Wallet, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { FilterSelect } from "@/components/filter-select"
import { cn } from "@/lib/utils"

const roleBase: Record<string, number> = {
  "Data Scientist": 28.5,
  "Data Engineer": 30,
  "Data Analyst": 22,
  "ML Engineer": 34,
}

const levelMultiplier: Record<string, number> = {
  Junior: 0.7,
  Middle: 1,
  Senior: 1.55,
}

const regionMultiplier: Record<string, number> = {
  "Toàn quốc": 1,
  "Hà Nội": 1.05,
  "TP. Hồ Chí Minh": 1.12,
  "Đà Nẵng": 0.9,
}

const bonusSkills = ["Cloud (AWS/GCP)", "Deep Learning", "Big Data (Spark)", "MLOps"]

const roleOptions = Object.keys(roleBase)
const levelOptions = Object.keys(levelMultiplier)
const regionOptions = Object.keys(regionMultiplier)

export function SalaryPredictor() {
  const [role, setRole] = useState(roleOptions[0])
  const [level, setLevel] = useState("Middle")
  const [region, setRegion] = useState(regionOptions[0])
  const [years, setYears] = useState(3)
  const [skills, setSkills] = useState<Set<string>>(new Set())

  const toggleSkill = (s: string) => {
    setSkills((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  }

  const { predicted, low, high, byLevel } = useMemo(() => {
    const base = roleBase[role]
    const experienceFactor = 1 + Math.min(years, 12) * 0.03
    const skillBonus = 1 + skills.size * 0.06
    const compute = (lvl: string) =>
      Math.round(base * levelMultiplier[lvl] * regionMultiplier[region] * experienceFactor * skillBonus * 10) / 10

    const predicted = compute(level)
    return {
      predicted,
      low: Math.round(predicted * 0.85 * 10) / 10,
      high: Math.round(predicted * 1.2 * 10) / 10,
      byLevel: levelOptions.map((lvl) => ({ level: lvl, salary: compute(lvl) })),
    }
  }, [role, level, region, years, skills])

  const chartConfig = {
    salary: { label: "Lương (Triệu VNĐ)", color: "var(--chart-1)" },
  } satisfies ChartConfig

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Dự đoán Mức lương</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ước tính mức lương theo vị trí, cấp bậc, khu vực, kinh nghiệm và kỹ năng của bạn.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Thông tin của bạn</CardTitle>
            <CardDescription>Điều chỉnh để cập nhật dự đoán ngay lập tức.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Field label="Vị trí">
              <FilterSelect label="Vị trí" options={roleOptions} value={role} onChange={setRole} />
            </Field>
            <Field label="Cấp bậc">
              <FilterSelect label="Cấp bậc" options={levelOptions} value={level} onChange={setLevel} />
            </Field>
            <Field label="Khu vực">
              <FilterSelect label="Khu vực" options={regionOptions} value={region} onChange={setRegion} />
            </Field>
            <Field label={`Số năm kinh nghiệm: ${years}`}>
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
                aria-label="Số năm kinh nghiệm"
              />
            </Field>
            <Field label="Kỹ năng nổi bật">
              <div className="flex flex-wrap gap-2">
                {bonusSkills.map((s) => {
                  const active = skills.has(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent",
                      )}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </Field>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Wallet className="size-4 text-primary" aria-hidden="true" />
                Mức lương dự đoán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary">{predicted}</span>
                <span className="pb-1.5 text-lg font-semibold text-muted-foreground">Triệu VNĐ / tháng</span>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-muted-foreground">
                  Thấp: {low}
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-muted-foreground">
                  Cao: {high}
                </span>
              </div>
              <p className="mt-4 flex items-start gap-1.5 text-sm text-muted-foreground">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                Thêm mỗi kỹ năng nổi bật giúp tăng ~6% mức lương ước tính. Bạn đang chọn {skills.size} kỹ năng.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">So sánh theo cấp bậc</CardTitle>
              <CardDescription>Cùng vị trí, khu vực và kỹ năng bạn đã chọn.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[240px] w-full">
                <BarChart accessibilityLayer data={byLevel} margin={{ top: 24, right: 12, left: 4 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="level" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="salary" fill="var(--color-salary)" radius={[6, 6, 0, 0]} maxBarSize={72}>
                    <LabelList dataKey="salary" position="top" className="fill-foreground text-xs font-medium" />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </div>
  )
}
