import cn from "clsx";
import * as Select from "@radix-ui/react-select";
import * as React from "react";
import { CheckIcon } from "../../Icons";
import { SingleSelectOption } from "./SingleSelectBase";

export type SelectItemProps = SingleSelectOption & { width: string };

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, value, startIcon, endIcon, width, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          "relative flex w-full flex-row data-[highlighted]:bg-instillGrey05 data-[highlighted]:ring-0 data-[highlighted]:border-0 data-[highlighted]:outline-none pl-5 pr-12 py-2",
          width
        )}
        value={value}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemIndicator className="w-6 absolute top-1/2 -translate-y-1/2 right-5">
          <CheckIcon
            width="w-4"
            height="h-4"
            color="fill-instillGrey50"
            position="my-auto"
          />
        </Select.ItemIndicator>
        <div className="flex flex-row">
          {startIcon ? (
            <Select.ItemIndicator>{startIcon}</Select.ItemIndicator>
          ) : null}
          <Select.ItemText>{label}</Select.ItemText>
          {endIcon ? (
            <Select.ItemIndicator>{endIcon}</Select.ItemIndicator>
          ) : null}
        </div>
      </Select.Item>
    );
  }
);
