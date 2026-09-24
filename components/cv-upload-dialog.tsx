"use client"

import { useRef, useState, type DragEvent } from "react"
import { FileText, Loader2, UploadCloud, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MAX_SIZE_MB = 10

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function CvUploadDialog({
  open,
  onOpenChange,
  onUploaded,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploaded: (fileName: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)

  function reset() {
    setDragging(false)
    setError(null)
    setFile(null)
    setProcessing(false)
  }

  function validate(candidate: File): string | null {
    const isPdf =
      candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf")
    if (!isPdf) return "Chỉ chấp nhận tệp PDF."
    if (candidate.size > MAX_SIZE_MB * 1024 * 1024) return `Kích thước tối đa ${MAX_SIZE_MB}MB.`
    return null
  }

  function pickFile(candidate: File | undefined) {
    if (!candidate) return
    const message = validate(candidate)
    if (message) {
      setError(message)
      setFile(null)
      return
    }
    setError(null)
    setFile(candidate)
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    pickFile(e.dataTransfer.files?.[0])
  }

  function handleAnalyze() {
    if (!file) return
    setProcessing(true)
    // Simulate parsing/extracting the CV before revealing the dashboard.
    window.setTimeout(() => {
      onUploaded(file.name)
      reset()
      onOpenChange(false)
    }, 1400)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tải CV của bạn</DialogTitle>
          <DialogDescription>
            Tải lên CV dạng PDF để mở khóa các chỉ số, bảng và biểu đồ phân tích cá nhân hóa.
          </DialogDescription>
        </DialogHeader>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />

        {!file ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Kéo thả hoặc chọn tệp PDF"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                inputRef.current?.click()
              }
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
              dragging
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/30 hover:border-primary/60 hover:bg-muted/50",
            )}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UploadCloud className="size-6" aria-hidden="true" />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Kéo thả tệp vào đây hoặc <span className="text-primary">chọn từ máy</span>
              </p>
              <p className="text-xs text-muted-foreground">Chỉ hỗ trợ PDF · tối đa {MAX_SIZE_MB}MB</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
            {!processing && (
              <button
                type="button"
                onClick={() => reset()}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Xóa tệp đã chọn"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={processing}>
            Hủy
          </Button>
          <Button onClick={handleAnalyze} disabled={!file || processing}>
            {processing ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Đang phân tích...
              </>
            ) : (
              "Phân tích CV"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
