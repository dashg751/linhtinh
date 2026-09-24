"use client"

import { BarChart3, FileText, Sparkles, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"

const perks = [
  { icon: BarChart3, title: "Chỉ số thị trường", desc: "Tin tuyển dụng, lương và kỹ năng hot" },
  { icon: Sparkles, title: "Phân tích khoảng cách", desc: "Đối chiếu kỹ năng của bạn với thị trường" },
  { icon: FileText, title: "Dự đoán mức lương", desc: "Ước tính lương dựa trên hồ sơ của bạn" },
]

export function CvGate({ onUploadClick }: { onUploadClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <UploadCloud className="size-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-balance">
        Tải CV để mở khóa bảng phân tích
      </h1>
      <p className="mt-3 max-w-md text-pretty text-muted-foreground">
        Các chỉ số, bảng và biểu đồ sẽ hiển thị sau khi bạn tải lên CV dạng PDF. Chúng tôi sẽ phân
        tích hồ sơ của bạn so với dữ liệu thị trường.
      </p>

      <Button size="lg" className="mt-8 font-semibold" onClick={onUploadClick}>
        <UploadCloud className="size-4" aria-hidden="true" />
        Tải CV lên (PDF)
      </Button>

      <ul className="mt-12 grid w-full max-w-2xl gap-4 sm:grid-cols-3">
        {perks.map((perk) => (
          <li
            key={perk.title}
            className="rounded-xl border border-border bg-card p-5 text-left"
          >
            <perk.icon className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-foreground">{perk.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{perk.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
