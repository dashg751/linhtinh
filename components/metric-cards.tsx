import { ArrowUp } from "lucide-react"
import { Card } from "@/components/ui/card"

export function MetricCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Tổng số tin tuyển dụng (JD)</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight">1,240</span>
          <span className="flex items-center text-sm font-medium text-emerald-600">
            <ArrowUp className="size-3.5" aria-hidden="true" />
            12%
          </span>
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Mức lương trung bình</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight">28.5</span>
          <span className="text-sm font-medium text-muted-foreground">Triệu VNĐ</span>
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Kỹ năng cốt lõi (Top 1)</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-primary">Python</span>
          <span className="text-sm font-medium text-muted-foreground">chiếm 88%</span>
        </div>
      </Card>
    </div>
  )
}
