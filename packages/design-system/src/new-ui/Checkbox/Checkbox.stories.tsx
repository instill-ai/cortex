import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/NewUi/Checkbox",
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => <Checkbox className="h-4 w-4" />,
};

export const WithCustomSize: Story = {
  render: () => <Checkbox className="h-10 w-10" />,
};
