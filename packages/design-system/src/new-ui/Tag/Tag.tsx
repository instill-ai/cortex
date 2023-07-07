import cn from "clsx";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva("inline-flex items-center rounded-md font-medium", {
  variants: {
    variant: {
      default:
        "text-semantic-fg-primary border border-semantic-bg-line hover:bg-semantic-bg-base-bg",
      lightBlue: "bg-semantic-accent-bg text-semantic-accent-default",
      borderBlue:
        "text-semantic-accent-hover border border-semantic-accent-default hover:bg-semantic-accent-bg",
      darkBlue: "bg-semantic-accent-default text-semantic-fg-on-default",
      lightRed: "bg-semantic-error-bg text-semantic-error-default",
      lightYellow: "bg-semantic-warning-bg text-semantic-warning-default",
      lightGreen: "bg-semantic-success-bg text-semantic-success-default",
      lightPurple: "bg-semantic-secondary-bg text-semantic-secondary-default",
      darkRed: "bg-semantic-error-default text-semantic-fg-on-default",
      darkYellow: "bg-semantic-warning-default text-semantic-fg-on-default",
      darkGreen: "bg-semantic-success-default text-semantic-fg-on-default",
      darkPurple: "bg-semantic-secondary-default text-semantic-fg-on-default",
      borderRed:
        "border border-semantic-error-default text-semantic-error-default hover:bg-semantic-error-bg",
      borderYellow:
        "border border-semantic-warning-default text-semantic-warning-default hover:bg-semantic-warning-bg",
      borderGreen:
        "border border-semantic-success-default text-semantic-success-default hover:bg-semantic-success-bg",
      borderPurple:
        "border border-semantic-secondary-default text-semantic-secondary-default hover:bg-semantic-secondary-bg",
      lightNeutral: "bg-semantic-bg-secondary text-semantic-fg-secondary",
      darkNeutral:
        "bg-semantic-bg-secondary-alt-primary text-semantic-fg-on-default",
    },
    size: {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-1 text-base",
      lg: "px-5 py-1 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(tagVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
