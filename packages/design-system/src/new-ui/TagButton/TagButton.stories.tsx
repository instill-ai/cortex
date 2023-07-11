import { TagButton } from "./TagButton";
import { Icons } from "../Icons";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TagButton> = {
  title: "Components/NewUi/TagButton",
};

export default meta;

type Story = StoryObj<typeof TagButton>;

export const Dafault: Story = {
  render: () => <TagButton variant="default">Label</TagButton>,
};
