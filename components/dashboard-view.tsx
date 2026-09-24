import { MetricCards } from "@/components/metric-cards"
import { SkillsBarChart } from "@/components/skills-bar-chart"
import { LevelDonutChart } from "@/components/level-donut-chart"
import { FilterSelect } from "@/components/filter-select"

const roleOptions = ["Data Scientist", "Data Engineer", "Data Analyst", "ML Engineer"]
const regionOptions = ["Toàn quốc", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"]

export function DashboardView() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Tổng quan Thị trường</h1>
        <div className="flex items-center gap-3">
          <FilterSelect label="Vị trí" options={roleOptions} />
          <FilterSelect label="Khu vực" options={regionOptions} />
        </div>
      </div>

      <div className="mt-8">
        <MetricCards />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SkillsBarChart />
        </div>
        <div>
          <LevelDonutChart />
        </div>
      </div>
    </>
  )
}
