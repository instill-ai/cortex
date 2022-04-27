import { ComponentStory, ComponentMeta } from "@storybook/react";
import SquareProgressBase from "./SquareProgressBase";

export default {
  title: "Components/Base/Common/SquareProgressBase",
  component: SquareProgressBase,
} as ComponentMeta<typeof SquareProgressBase>;

const Template: ComponentStory<typeof SquareProgressBase> = (args) => (
  <SquareProgressBase
    {...args}
    bgColor="bg-white"
    cubeColor="bg-instillBlue50"
  />
);
export const Playground: ComponentStory<typeof SquareProgressBase> =
  Template.bind({});

Playground.args = {};
