import type { Meta, StoryObj } from "@storybook/react";
import { TableCell } from "./TableCell";
import { GitHubIcon } from "../../ui";

const meta: Meta<typeof TableCell> = {
  title: "Components/NewUi/TableCell",
};

export default meta;

type Story = StoryObj<typeof TableCell>;

export const Dafault: Story = {
  render: () => (
    <TableCell
      iconElement={null}
      primaryText="My first Model"
      secondaryText={null}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <TableCell
      iconElement={
        <GitHubIcon
          color="fill-semantic-fg-primary"
          height="h-4"
          position="my-auto"
          width="w-4"
        />
      }
      primaryText="My first Model"
      secondaryText={null}
    />
  ),
};

export const WithIconAndSecondaryText: Story = {
  render: () => (
    <TableCell
      iconElement={
        <GitHubIcon
          color="fill-semantic-fg-primary"
          height="h-4"
          position="my-auto"
          width="w-4"
        />
      }
      primaryText="My first Model"
      secondaryText="lraspp"
    />
  ),
};

export const WithSecondaryText: Story = {
  render: () => (
    <TableCell
      iconElement={null}
      primaryText="My first Model"
      secondaryText="lraspp"
    />
  ),
};

export const OnlySecondaryText: Story = {
  render: () => (
    <TableCell iconElement={null} primaryText={null} secondaryText="lraspp" />
  ),
};

export const OnlyIcon: Story = {
  render: () => (
    <TableCell
      iconElement={
        <GitHubIcon
          color="fill-semantic-fg-primary"
          height="h-4"
          position="my-auto"
          width="w-4"
        />
      }
      primaryText={null}
      secondaryText={null}
    />
  ),
};
