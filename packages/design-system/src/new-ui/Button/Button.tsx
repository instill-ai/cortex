import cn from "clsx";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-semantic-accent-default text-semantic-fg-on-default hover:bg-semantic-accent-hover focus-visible:ring-semantic-accent-hover disabled:bg-semantic-bg-secondary disabled:text-semantic-fg-disabled",
        danger:
          "bg-semantic-error-default text-semantic-fg-on-default hover:bg-semantic-error-hover focus-visible:ring-semantic-error-hover disabled:bg-semantic-bg-secondary disabled:text-semantic-fg-disabled",
        secondaryColour:
          "bg-semantic-accent-bg text-semantic-accent-hover hover:bg-semantic-accent-bg-alt hover:text-accent-pressed focus-visible:ring-[#91B5FD] disabled:bg-semantic-bg-secondary disabled:text-semantic-fg-disabled",
        secondaryGrey:
          "bg-semantic-bg-primary text-semantic-fg-primary border border-semantic-bg-line hover:bg-semantic-bg-secondary hover:border-semantic-bg-secondary-secondary focus-visible:border-semantic-bg-secondary-secondary focus-visible:ring-semantic-bg-secondary-secondary disabled:bg-semantic-bg-secondary disabled:text-semantic-fg-disabled",
        tertiaryGrey:
          "bg-transparent text-semantic-fg-secondary hover:bg-semantic-bg-base-bg disabled:text-semantic-fg-disabled",
        tertiaryColour: "bg-transparent text-semantic-accent-default",
      },
      size: {
        sm: "h-9 px-3 product-button-button-3",
        md: "h-10 py-2 px-4 product-button-button-2",
        lg: "px-3 py-[9px] product-button-button-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
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
        className={cn(buttonVariants({ variant, size, className }, " "))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };