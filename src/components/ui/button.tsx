import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: "default" | "outline" | "ghost" | "link" | "lingua-red" | "lingua-blue" | "lingua-outline"
      size?: "default" | "sm" | "lg" | "icon"
    }
    
    const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
      ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
          <button
            ref={ref}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
              {
                "bg-lingua-blue text-white shadow-sm hover:bg-lingua-blue/90": variant === "default" || variant === "lingua-blue",
                "bg-lingua-red text-white shadow-sm hover:bg-lingua-red/90": variant === "lingua-red",
                "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900": variant === "outline",
                "border border-white/40 bg-transparent text-white hover:bg-white hover:text-lingua-blue": variant === "lingua-outline",
                "hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
                "text-gray-900 underline-offset-4 hover:underline": variant === "link",
                "h-10 px-6 py-2": size === "default",
            "h-8 rounded-full px-4 text-xs": size === "sm",
            "h-12 rounded-full px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
