"use client"

import { useState } from "react"
import { Navbar, type NavItem } from "@/components/navbar"
import { DashboardView } from "@/components/dashboard-view"
import { SkillGapAnalyzer } from "@/components/skill-gap-analyzer"
import { SalaryPredictor } from "@/components/salary-predictor"

export function AppShell() {
  const [active, setActive] = useState<NavItem>("Dashboard")

  return (
    <div className="min-h-screen bg-background">
      <Navbar active={active} onChange={setActive} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {active === "Dashboard" && <DashboardView />}
        {active === "Skill Gap Analyzer" && <SkillGapAnalyzer />}
        {active === "Salary Predictor" && <SalaryPredictor />}
      </main>
    </div>
  )
}
