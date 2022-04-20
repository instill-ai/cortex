import { ComponentStory, ComponentMeta } from "@storybook/react";
import DarkBgSquareProgress from "./DarkBgSquareProgress";

export default {
  title: "Components/Ui/Common/DarkBgSquareProgress",
  component: DarkBgSquareProgress,
} as ComponentMeta<typeof DarkBgSquareProgress>;

const Template: ComponentStory<typeof DarkBgSquareProgress> = (args) => (
  <DarkBgSquareProgress {...args} />
);
export const Playground: ComponentStory<typeof DarkBgSquareProgress> =
  Template.bind({});

Playground.args = {};
