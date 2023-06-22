import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

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
