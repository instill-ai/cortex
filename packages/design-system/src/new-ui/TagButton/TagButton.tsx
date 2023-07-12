import cn from "clsx";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const tagButtonVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-semantic-fg-primary hover:border hover:border-semantic-bg-line focus:border-semantic-bg-line dark:hover:border hover:border-sementic-bg-secondary-alt-primary dark:text-sementic-fg-on-default dark:hover:bg-sementic-bg-secondary-secondary",
      },
      size: {
        sm: "px-2 py-1 product-body-text-4-medium",
        md: "px-2.5 py-1 product-body-text-3-medium",
        lg: "px-3 py-1 product-body-text-3-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TagButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagButtonVariants> {}

const TagButton = React.forwardRef<HTMLDivElement, TagButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(tagButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TagButton.displayName = "TagButton";

export { TagButton, tagButtonVariants };
