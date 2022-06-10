import { ComponentStory, ComponentMeta } from "@storybook/react";
import WhiteBgSquareProgress from "./WhiteBgSquareProgress";

export default {
  title: "Components/Ui/Common/WhiteBgSquareProgress",
  component: WhiteBgSquareProgress,
} as ComponentMeta<typeof WhiteBgSquareProgress>;

const Template: ComponentStory<typeof WhiteBgSquareProgress> = (args) => (
  <WhiteBgSquareProgress {...args} blockSize={48} />
);
export const Playground: ComponentStory<typeof WhiteBgSquareProgress> =
  Template.bind({});

Playground.args = {
  isLoading: true,
};
