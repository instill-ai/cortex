import cn from "clsx";
import * as React from "react";

const Root = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative flex flex-row space-x-2 rounded-sm border border-semantic-bg-line p-2 focus-within:border-semantic-accent-default focus-within:outline-semantic-accent-default focus-within:outline focus-within:outline-1 focus-within:ring-0 disabled-within:cursor-not-allowed disabled-within:bg-semantic-bg-secondary",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
Root.displayName = "InputContainer";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Core = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-transparent product-body-text-2-regular text-semantic-fg-primary focus-visible:outline-0 disabled:cursor-not-allowed focus-visible:ring-0 border-0 file:border-0 file:bg-transparent file:product-body-text-2-semibold placeholder:text-semantic-fg-primary/65",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Core.displayName = "InputCore";

const LeftIcon = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("flex", className)} ref={ref} {...props}>
      {children}
    </div>
  );
});
LeftIcon.displayName = "InputLeftIcon";

const RightIcon = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn("absolute right-0 top-1/2 -translate-y-1/2", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
RightIcon.displayName = "InputRightIcon";

export const Input = {
  Root,
  Core,
  LeftIcon,
  RightIcon,
};
