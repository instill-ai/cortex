import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icons } from "../Icons";

const meta: Meta<typeof Button> = {
  title: "Components/NewUi/Button",
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <Button variant="primary" size="lg">
      I am a button
    </Button>
  ),
};

export const SecondaryGrey: Story = {
  render: () => (
    <Button variant="secondaryGrey" size="lg">
      I am a button
    </Button>
  ),
};

export const SecondaryColour: Story = {
  render: () => (
    <Button variant="secondaryColour" size="lg">
      I am a button
    </Button>
  ),
};

export const Danger: Story = {
  render: () => (
    <Button variant="danger" size="lg">
      I am a button
    </Button>
  ),
};

export const TertiaryGrey: Story = {
  render: () => (
    <Button variant="tertiaryGrey" size="lg">
      I am a button
    </Button>
  ),
};

export const TertiaryColour: Story = {
  render: () => (
    <Button variant="tertiaryColour" size="lg">
      I am a button
    </Button>
  ),
};

export const TertiaryDanger: Story = {
  render: () => (
    <Button variant="tertiaryDanger" size="lg">
      I am a button
    </Button>
  ),
};

export const White: Story = {
  render: () => (
    <div className="bg-black p-10">
      <Button variant="white" size="lg">
        I am a button
      </Button>
    </div>
  ),
};

export const PrimaryWithIcon: Story = {
  render: () => (
    <Button className="gap-x-2" variant="primary" size="lg">
      I am a button
      <Icons.Play className="h-5 w-5 stroke-semantic-bg-primary" />
    </Button>
  ),
};

export const PrimaryWithAsChild: Story = {
  render: () => (
    <Button className="gap-x-2" variant="primary" size="lg" asChild>
      <a href="https://www.instill.tech/">Instill AI</a>
    </Button>
  ),
};
