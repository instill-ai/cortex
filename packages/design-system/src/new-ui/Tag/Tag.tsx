import cn from "clsx";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva("inline-flex items-center rounded-md font-medium", {
  variants: {
    variant: {
      default: "bg-slate-50 text-gray-800 border border-slate-200 ",
      lightBlue: "bg-blue-50 text-blue-700",
      borderBlue: "bg-blue-50 text-blue-700 border border-blue-700",
      darkBlue: "bg-blue-600 text-white",
      lightRed: "bg-red-50 text-rose-700",
      lightYellow: "bg-orange-50 text-yellow-800",
      lightGreen: "bg-emerald-50 text-teal-700",
      lightPurple: "bg-purple-50 text-violet-700",
      darkRed: "bg-rose-600 text-white",
      darkYellow: "bg-amber-700 text-white",
      darkGreen: "bg-emerald-600 text-white",
      darkPurple: "bg-violet-500 text-white",
      borderRed: "border border-rose-700 text-rose-700",
      borderYellow: "border border-yellow-800 text-yellow-800",
      borderGreen: "border border-teal-700 text-teal-700",
      borderPurple: "border border-violet-700 text-violet-700",
      lightNeutral: "bg-slate-100 text-gray-800 text-opacity-80",
      darkNeutral: "bg-zinc-700 text-white",
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
