import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full border-b border-outline-variant bg-transparent px-0 py-2 text-base font-light text-on-surface placeholder:text-on-secondary-container focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error",
        className
      )}
      {...props}
    />
  )
}

export { Input }
