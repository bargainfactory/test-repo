import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shine",
  {
    variants: {
      variant: {
        default:
          "bg-[#0f766e] text-white hover:bg-[#0d6b64] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal-500/20",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-[#0f766e] text-[#0f766e] bg-transparent hover:bg-[#0f766e]/10 hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.98]",
        link: "text-[#0f766e] underline-offset-4 hover:underline",
        gold: "bg-gradient-to-r from-[#d97706] to-[#fbbf24] text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20",
        glass: "glass text-foreground hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
