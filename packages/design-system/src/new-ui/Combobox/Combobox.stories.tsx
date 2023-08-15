import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox";
import { SingleSelectOption } from "../../ui";
import { Icons } from "../Icons";

const meta: Meta<typeof Combobox> = {
  title: "Components/NewUi/Combobox",
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const items: SingleSelectOption[] = [
  {
    value: "Convert Audio to text",
    label: "Convert Audio to text",
    startIcon: (
      <Icons.Recording02 className="mr-2 h-4 w-4 stroke-semantic-fg-secondary" />
    ),
  },
  {
    value: "Generate-text-by-LLM",
    label: "Generate text by LLM",
    startIcon: (
      <Icons.Recording02 className="mr-2 h-4 w-4 stroke-semantic-fg-secondary" />
    ),
  },
  {
    value: "Generate-Web3-assets",
    label: "Generate Web3 assets",
    startIcon: (
      <Icons.Recording02 className="mr-2 h-4 w-4 stroke-semantic-fg-secondary" />
    ),
  },
  {
    value: "Generate-Images",
    label: "Generate Images",
    startIcon: (
      <Icons.Recording02 className="mr-2 h-4 w-4 stroke-semantic-fg-secondary" />
    ),
  },
];

export const Default: Story = {
  render: () => (
    <Combobox
      items={items}
      placeholder="Search"
      notFoundPlaceholder="No Item Found"
      buttonLabel="Select"
    />
  ),
};
