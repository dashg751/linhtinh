"use client"

import { useMemo, useState } from "react"
import { Check, TrendingUp, Target, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilterSelect } from "@/components/filter-select"
import { cn } from "@/lib/utils"

type Skill = { name: string; demand: number; category: string }

const roleSkills: Record<string, Skill[]> = {
  "Data Scientist": [
    { name: "Python", demand: 88, category: "Ngôn ngữ" },
    { name: "SQL", demand: 76, category: "Dữ liệu" },
    { name: "Machine Learning", demand: 64, category: "AI/ML" },
    { name: "Pandas", demand: 58, category: "Thư viện" },
    { name: "TensorFlow", demand: 45, category: "AI/ML" },
    { name: "Statistics", demand: 52, category: "Nền tảng" },
    { name: "Tableau", demand: 39, category: "Trực quan hóa" },
    { name: "Spark", demand: 31, category: "Big Data" },
  ],
  "Data Engineer": [
    { name: "Python", demand: 82, category: "Ngôn ngữ" },
    { name: "SQL", demand: 90, category: "Dữ liệu" },
    { name: "Spark", demand: 68, category: "Big Data" },
    { name: "Airflow", demand: 55, category: "Orchestration" },
    { name: "Kafka", demand: 48, category: "Streaming" },
    { name: "AWS", demand: 62, category: "Cloud" },
    { name: "Docker", demand: 51, category: "DevOps" },
    { name: "dbt", demand: 34, category: "Transform" },
  ],
  "Data Analyst": [
    { name: "SQL", demand: 92, category: "Dữ liệu" },
    { name: "Excel", demand: 70, category: "Công cụ" },
    { name: "Power BI", demand: 66, category: "Trực quan hóa" },
    { name: "Tableau", demand: 58, category: "Trực quan hóa" },
    { name: "Python", demand: 54, category: "Ngôn ngữ" },
    { name: "Statistics", demand: 47, category: "Nền tảng" },
    { name: "Google Analytics", demand: 33, category: "Marketing" },
  ],
}

const roleOptions = Object.keys(roleSkills)

export function SkillGapAnalyzer() {
  const [role, setRole] = useState(roleOptions[0])
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const skills = roleSkills[role]

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const { readiness, missing } = useMemo(() => {
    const totalWeight = skills.reduce((sum, s) => sum + s.demand, 0)
    const haveWeight = skills.filter((s) => selected.has(s.name)).reduce((sum, s) => sum + s.demand, 0)
    const missing = skills.filter((s) => !selected.has(s.name)).sort((a, b) => b.demand - a.demand)
    return {
      readiness: totalWeight === 0 ? 0 : Math.round((haveWeight / totalWeight) * 100),
      missing,
    }
  }, [skills, selected])

  const readinessLabel = readiness >= 80 ? "Sẵn sàng ứng tuyển" : readiness >= 50 ? "Cần bổ sung thêm" : "Còn khoảng cách lớn"

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Phân tích Khoảng cách Kỹ năng</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Chọn những kỹ năng bạn đã có để xem mức độ sẵn sàng cho vị trí mục tiêu.
          </p>
        </div>
        <FilterSelect
          label="Vị trí mục tiêu"
          options={roleOptions}
          value={role}
          onChange={(v) => {
            setRole(v)
            setSelected(new Set())
          }}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Target className="size-4 text-primary" aria-hidden="true" />
              Kỹ năng yêu cầu cho {role}
            </CardTitle>
            <CardDescription>Nhấp để đánh dấu các kỹ năng bạn đã thành thạo.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const active = selected.has(skill.name)
              return (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => toggle(skill.name)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-full border",
                      active ? "border-primary-foreground" : "border-muted-foreground/40",
                    )}
                  >
                    {active && <Check className="size-3" aria-hidden="true" />}
                  </span>
                  {skill.name}
                  <span className={cn("text-xs", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {skill.demand}%
                  </span>
                </button>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Mức độ sẵn sàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold text-primary">{readiness}</span>
              <span className="pb-1.5 text-lg font-semibold text-muted-foreground">%</span>
            </div>
            <div
              className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={readiness}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${readiness}%` }} />
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-medium">
              <TrendingUp className="size-4 text-primary" aria-hidden="true" />
              {readinessLabel}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Bạn đã có {selected.size}/{skills.length} kỹ năng cần thiết.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <BookOpen className="size-4 text-primary" aria-hidden="true" />
            Kỹ năng cần bổ sung (ưu tiên theo nhu cầu thị trường)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {missing.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Tuyệt vời! Bạn đã đáp ứng toàn bộ kỹ năng cho vị trí này.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {missing.map((skill) => (
                <li key={skill.name} className="flex items-center gap-4">
                  <div className="w-40 shrink-0">
                    <p className="text-sm font-medium">{skill.name}</p>
                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary/70" style={{ width: `${skill.demand}%` }} />
                  </div>
                  <span className="w-10 shrink-0 text-right text-sm font-semibold tabular-nums">{skill.demand}%</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button className="font-semibold">Xem lộ trình học tập</Button>
      </div>
    </>
  )
}
