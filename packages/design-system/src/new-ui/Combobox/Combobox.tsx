"use client";

import * as React from "react";
import cn from "clsx";
import { Button } from "../Button";
import { Command } from "../Command";
import { Popover } from "../Popover";
import { Icons } from "../Icons";
import { SingleSelectOption } from "../../ui";
import { Nullable } from "../../types/general";

type ComboboxProps = {
  items: SingleSelectOption[];
  placeholder: Nullable<string>;
  notFoundPlaceholder: Nullable<string>;
  buttonLabel: Nullable<string>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export function Combobox({
  items,
  placeholder,
  notFoundPlaceholder,
  buttonLabel,
  value,
  setValue,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="secondaryGrey"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : buttonLabel}

          <Icons.ChevronSelectorVertical className="ml-2 h-4 w-4 stroke-slate-500" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[300px] !rounded-sm !p-0">
        <Command.Root>
          <Command.Input placeholder={placeholder || ""} />
          <Command.Empty>{notFoundPlaceholder || ""}</Command.Empty>
          <Command.Group>
            {items.map((item) => (
              <Command.Item
                key={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : item.value);
                  setOpen(false);
                }}
              >
                <Icons.Check
                  className={cn(
                    "mr-2 h-4 w-4 stroke-slate-500",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />

                {item.startIcon}

                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
}
