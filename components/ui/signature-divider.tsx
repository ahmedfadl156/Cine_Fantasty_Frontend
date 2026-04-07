import * as React from "react"
import { cn } from "@/lib/utils"

interface SignatureDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

function SignatureDivider({ label, className, ...props }: SignatureDividerProps) {
  if (!label) {
    return (
      <div
        className={cn(
          "flex items-center gap-4",
          className
        )}
        {...props}
      >
        <div className="h-px flex-1 bg-outline-variant opacity-20" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        className
      )}
      {...props}
    >
      <div className="h-px flex-1 bg-outline-variant opacity-20" />
      <span className="text-xs text-on-secondary-container font-mono whitespace-nowrap">
        {label}
      </span>
      <div className="h-px flex-1 bg-outline-variant opacity-20" />
    </div>
  )
}

export { SignatureDivider }
