"use client"

import { CheckCircle2, UploadCloud, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const navItems = ["Dashboard", "Skill Gap Analyzer", "Salary Predictor"] as const

export type NavItem = (typeof navItems)[number]

export function Navbar({
  active,
  onChange,
  cvName,
  onUploadClick,
}: {
  active: NavItem
  onChange: (item: NavItem) => void
  cvName: string | null
  onUploadClick: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Zap className="size-6 fill-primary text-primary" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight text-primary">TechSkill Radar</span>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-current={active === item ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors",
                  active === item ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item}
                {active === item && (
                  <span className="absolute -bottom-[1.35rem] left-0 h-0.5 w-full rounded-full bg-primary" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          {cvName && (
            <span className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground sm:flex">
              <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
              <span className="max-w-[10rem] truncate">{cvName}</span>
            </span>
          )}
          <Button className="font-semibold" onClick={onUploadClick}>
            <UploadCloud className="size-4" aria-hidden="true" />
            {cvName ? "Tải CV khác" : "Tải CV Ngay"}
          </Button>
        </div>
      </nav>
    </header>
  )
}
