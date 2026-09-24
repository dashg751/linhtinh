"use client"

import { useState } from "react"
import { Navbar, type NavItem } from "@/components/navbar"
import { DashboardView } from "@/components/dashboard-view"
import { SkillGapAnalyzer } from "@/components/skill-gap-analyzer"
import { SalaryPredictor } from "@/components/salary-predictor"
import { CvUploadDialog } from "@/components/cv-upload-dialog"
import { CvGate } from "@/components/cv-gate"

export function AppShell() {
  const [active, setActive] = useState<NavItem>("Dashboard")
  const [cvName, setCvName] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        active={active}
        onChange={setActive}
        cvName={cvName}
        onUploadClick={() => setDialogOpen(true)}
      />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!cvName ? (
          <CvGate onUploadClick={() => setDialogOpen(true)} />
        ) : (
          <>
            {active === "Dashboard" && <DashboardView />}
            {active === "Skill Gap Analyzer" && <SkillGapAnalyzer />}
            {active === "Salary Predictor" && <SalaryPredictor />}
          </>
        )}
      </main>

      <CvUploadDialog open={dialogOpen} onOpenChange={setDialogOpen} onUploaded={setCvName} />
    </div>
  )
}
