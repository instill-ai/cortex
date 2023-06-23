"use client";
// ref: https://ui.shadcn.com/docs/components/toast

import { Icons } from "../Icons";
import { Toast, ToastProps } from "./Toast";
import { ToasterToast, useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map(function ({
        id,
        title,
        size,
        description,
        action,
        icon,
        variant,
        ...props
      }) {
        const isAlert = variant?.includes("alert");

        if (variant === "notification-icon" && !icon) {
          throw new Error(
            "Toaster: variant `notification-icon` requires `icon` prop"
          );
        }

        if (isAlert) {
          return (
            <Toast.Core size={size} variant={variant} key={id} {...props}>
              {size === "large" ? (
                <div className="flex flex-col space-y-1 w-full">
                  <div className="flex flex-row space-x-2 w-full">
                    {getToasterIcon(variant, icon)}
                    <div className="flex-grow flex my-auto">
                      {title && <Toast.Title>{title}</Toast.Title>}
                    </div>
                    <Toast.Close />
                  </div>
                  <div className="flex flex-col w-full pl-8 space-y-4">
                    {description && (
                      <Toast.Description>{description}</Toast.Description>
                    )}
                    {action}
                  </div>
                </div>
              ) : (
                <div className="flex flex-row w-full space-x-2">
                  {getToasterIcon(variant, icon)}
                  <div className="flex-grow my-auto">
                    {title && <Toast.Title>{title}</Toast.Title>}
                  </div>
                  <Toast.Close />
                </div>
              )}
            </Toast.Core>
          );
        }

        return (
          <Toast.Core size={size} variant={variant} key={id} {...props}>
            {size === "large" ? (
              <div className="flex flex-row space-x-4 w-full">
                {getToasterIcon(variant, icon)}
                <div className="flex flex-col flex-grow">
                  <div className="flex flex-col space-y-1 mb-4">
                    {title && <Toast.Title>{title}</Toast.Title>}
                    {description && (
                      <Toast.Description>{description}</Toast.Description>
                    )}
                  </div>
                  {action}
                </div>
                <div className="mb-auto">
                  <Toast.Close />
                </div>
              </div>
            ) : (
              <div className="flex flex-row w-full space-x-2">
                {getToasterIcon(variant, icon)}
                <div className="flex-grow my-auto">
                  {title && <Toast.Title>{title}</Toast.Title>}
                </div>
                <Toast.Close />
              </div>
            )}
          </Toast.Core>
        );
      })}
      <Toast.Viewport />
    </Toast.Provider>
  );
}

function getToasterIcon(
  variant: ToastProps["variant"],
  icon?: ToasterToast["icon"]
) {
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

  if (variant?.includes("icon")) {
    return (
      <div className="w-10 h-10 flex rounded-sm border border-semantic-bg-line justify-center items-center">
        {icon}
      </div>
    );
  }

  return <Icons.InfoCircle className="w-6 h-6 stroke-semantic-accent-on-bg" />;
}
