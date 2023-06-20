import cn from "clsx";
import * as React from "react";

const Root = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn("flex group flex-col space-y-1", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
Root.displayName = "InputRoot";

const FieldContainer = React.forwardRef<
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
FieldContainer.displayName = "InputFieldContainer";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Field = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-transparent focus-visible:outline-0 disabled:cursor-not-allowed focus-visible:ring-0 border-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-semantic-fg-primary/65",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Field.displayName = "InputField";

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

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>(({ className, children, ...props }, ref) => {
  return (
    <label
      className={cn(
        "flex product-body-text-2-semibold text-semantic-fg-primary",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  );
});

const Description = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, children, ...props }, ref) => {
  return (
    <p
      className={cn(
        "flex product-body-text-3-regular text-semantic-fg-primary text-opacity-10",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  );
});

export const Input = {
  Root,
  FieldContainer,
  Field,
  LeftIcon,
  RightIcon,
  Label,
  Description,
};
