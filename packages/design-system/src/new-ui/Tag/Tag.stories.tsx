import { Tag } from "./Tag";
import { Icons } from "../Icons";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tag> = {
  title: "Components/NewUi/Tag",
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Dafault: Story = {
  render: () => <Tag>Label</Tag>,
};

export const LightBlue: Story = {
  render: () => (
    <Tag variant="lightBlue" size="sm" className="">
      Label
    </Tag>
  ),
};

export const BorderBlue: Story = {
  render: () => (
    <Tag variant="borderBlue" size="sm" className="">
      Label
    </Tag>
  ),
};

export const DarkBlue: Story = {
  render: () => (
    <Tag variant="darkBlue" size="sm" className="">
      Label
    </Tag>
  ),
};

export const LightRed: Story = {
  render: () => (
    <Tag variant="lightRed" size="sm" className="">
      Label
    </Tag>
  ),
};

export const LightYellow: Story = {
  render: () => (
    <Tag variant="lightYellow" size="md" className="">
      Label
    </Tag>
  ),
};

export const LightGreen: Story = {
  render: () => (
    <Tag variant="lightGreen" size="md" className="">
      Label
    </Tag>
  ),
};
export const LightPurple: Story = {
  render: () => (
    <Tag variant="lightPurple" size="md" className="">
      Label
    </Tag>
  ),
};
export const DarkRed: Story = {
  render: () => (
    <Tag variant="darkRed" size="md" className="">
      Label
    </Tag>
  ),
};
export const DarkYellow: Story = {
  render: () => (
    <Tag variant="darkYellow" size="md" className="">
      Label
    </Tag>
  ),
};
export const DarkPurple: Story = {
  render: () => (
    <Tag variant="darkPurple" size="md" className="">
      Label
    </Tag>
  ),
};
export const BorderRed: Story = {
  render: () => (
    <Tag variant="borderRed" size="md" className="">
      Label
    </Tag>
  ),
};
export const BorderYellow: Story = {
  render: () => (
    <Tag variant="borderYellow" size="md" className="">
      Label
    </Tag>
  ),
};
export const BorderGreen: Story = {
  render: () => (
    <Tag variant="borderGreen" size="md" className="">
      Label
    </Tag>
  ),
};
export const BorderPurple: Story = {
  render: () => (
    <Tag variant="borderPurple" size="md" className="">
      Label
    </Tag>
  ),
};
export const LightNeutral: Story = {
  render: () => (
    <Tag variant="lightNeutral" size="md" className="">
      Label
    </Tag>
  ),
};
export const arkNeutral: Story = {
  render: () => (
    <Tag variant="darkNeutral" size="md" className="">
      Label
    </Tag>
  ),
};

export const WithIconSmall: Story = {
  render: () => (
    <Tag className="gap-x-2" variant="darkNeutral" size="md">
      <Icons.Play className="h-5 w-5 stroke-semantic-bg-primary" />
      Label
    </Tag>
  ),
};
