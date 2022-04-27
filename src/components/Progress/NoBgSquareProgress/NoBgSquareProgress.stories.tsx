import { ComponentStory, ComponentMeta } from "@storybook/react";
import NoBgSquareProgress from "./NoBgSquareProgress";

export default {
  title: "Components/Ui/Common/NoBgSquareProgress",
  component: NoBgSquareProgress,
} as ComponentMeta<typeof NoBgSquareProgress>;

const Template: ComponentStory<typeof NoBgSquareProgress> = (args) => (
  <NoBgSquareProgress {...args} />
);
export const Playground: ComponentStory<typeof NoBgSquareProgress> =
  Template.bind({});

Playground.args = {};
