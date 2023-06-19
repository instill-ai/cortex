"use client";

import cn from "clsx";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:data-[state=unchecked]:ring-semantic-fg-primary focus-visible:data-[state=checked]:ring-semantic-accent-hover disabled:cursor-not-allowed disabled:!bg-semantic-fg-disabled data-[state=checked]:bg-semantic-accent-default hover:data-[state=checked]:bg-semantic-accent-hover hover:data-[state=unchecked]:bg-semantic-fg-primary data-[state=unchecked]:bg-semantic-info-secondary-text-on-bg",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[15px] bg-semantic-bg-primary w-[15px] rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[3px]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
