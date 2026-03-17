import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#0f766e]/10 text-[#0f766e] border border-[#0f766e]/20",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-red-500/10 text-red-600 border border-red-500/20",
        outline: "border border-border text-foreground",
        gold: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
        success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
        hot: "bg-red-500 text-white",
        new: "bg-blue-500 text-white",
        eco: "bg-emerald-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
