import type { Meta, StoryObj } from "@storybook/react";
import { IconWithBackground } from "./IconWithBackground";
import { GitHubIcon } from "../../ui";
import { Icons } from "../Icons";

const meta: Meta<typeof IconWithBackground> = {
  title: "Components/NewUi/IconWithBackground",
};

export default meta;

type Story = StoryObj<typeof IconWithBackground>;

export const GitHubIconWithBackground: Story = {
  render: () => (
    <IconWithBackground
      iconElement={
        <GitHubIcon
          color="fill-semantic-fg-primary"
          height="h-4"
          position="my-auto"
          width="w-4"
        />
      }
      className="bg-semantic-bg-secondary"
    />
  ),
};

export const FileWithBackground: Story = {
  render: () => (
    <IconWithBackground
      iconElement={
        <Icons.File04 className="h-4 w-4 stroke-semantic-accent-default" />
      }
      className="bg-semantic-accent-bg-alt"
    />
  ),
};
