import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import * as React from "react";
import { Button } from "../Button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Icons } from "../Icons";

const meta: Meta<typeof Dropdown> = {
  title: "Components/NewUi/Dropdown",
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Regular: Story = {
  render: () => (
    <Dropdown.Menu>
      <Dropdown.MenuTrigger className="flex flex-row gap-x-2">
        <span>Open</span>
        <Icons.ChevronDown className="my-auto h-4 w-4 stroke-semantic-fg-secondary" />
      </Dropdown.MenuTrigger>
      <Dropdown.MenuContent>
        <Dropdown.MenuItem>Profile</Dropdown.MenuItem>
        <Dropdown.MenuItem>Billing</Dropdown.MenuItem>
        <Dropdown.MenuItem>Team</Dropdown.MenuItem>
        <Dropdown.MenuItem>Subscription</Dropdown.MenuItem>
      </Dropdown.MenuContent>
    </Dropdown.Menu>
  ),
};

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <Dropdown.Menu>
      <Dropdown.MenuTrigger asChild>
        <Button variant="secondaryGrey">Open</Button>
      </Dropdown.MenuTrigger>
      <Dropdown.MenuContent className="w-56">
        <Dropdown.MenuLabel>Appearance</Dropdown.MenuLabel>
        <Dropdown.MenuSeparator />
        <Dropdown.MenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </Dropdown.MenuCheckboxItem>
        <Dropdown.MenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </Dropdown.MenuCheckboxItem>
        <Dropdown.MenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </Dropdown.MenuCheckboxItem>
      </Dropdown.MenuContent>
    </Dropdown.Menu>
  );
}
