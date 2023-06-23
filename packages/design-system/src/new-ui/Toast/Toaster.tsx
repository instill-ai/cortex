"use client";

import { Icons } from "../Icons";
// ref: https://ui.shadcn.com/docs/components/toast

import { Toast, ToastProps } from "./Toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Toast.Provider>
      {toasts.map(function ({
        id,
        title,
        size,
        description,
        action,
        variant,
        ...props
      }) {
        const isAlert = variant?.includes("alert");

        return (
          <Toast.Core size={size} variant={variant} key={id} {...props}>
            {size === "large" ? (
              <div className="flex flex-col space-y-1 w-full">
                <div className="flex flex-row space-x-2 w-full">
                  {getToasterIcon(variant)}
                  <div className="flex-grow flex my-auto">
                    {title && <Toast.Title>{title}</Toast.Title>}
                  </div>
                  <Toast.Close />
                </div>
                <div className="flex flex-col w-full pl-8">
                  {description && (
                    <Toast.Description>{description}</Toast.Description>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-row w-full space-x-2">
                {getToasterIcon(variant)}
                <div className="flex-grow my-auto">
                  {title && <Toast.Title>{title}</Toast.Title>}
                </div>
                <Toast.Close />
              </div>
            )}
            {action}
          </Toast.Core>
        );
      })}
      <Toast.Viewport />
    </Toast.Provider>
  );
}

function getToasterIcon(variant: ToastProps["variant"]) {
  if (variant?.includes("success")) {
    return (
      <Icons.CheckCircle className="w-6 h-6 stroke-semantic-success-on-bg" />
    );
  }

  if (variant?.includes("warning")) {
    return (
      <Icons.AlertTriangle className="w-6 h-6 stroke-semantic-warning-on-bg" />
    );
  }

  if (variant?.includes("error")) {
    return (
      <Icons.AlertCircle className="w-6 h-6 stroke-semantic-error-on-bg" />
    );
  }

  return <Icons.InfoCircle className="w-6 h-6 stroke-semantic-accent-on-bg" />;
}
