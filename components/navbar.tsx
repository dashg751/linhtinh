"use client"

import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const navItems = ["Dashboard", "Skill Gap Analyzer", "Salary Predictor"] as const

export type NavItem = (typeof navItems)[number]

export function Navbar({
  active,
  onChange,
}: {
  active: NavItem
  onChange: (item: NavItem) => void
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

        <Button className="shrink-0 font-semibold">Tải CV Ngay</Button>
      </nav>
    </header>
  )
}
