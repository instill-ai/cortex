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

export const WithText: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" className="h-4 w-4" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-semantic-fg-primary">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
};
