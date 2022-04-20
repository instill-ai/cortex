import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoadingStatusBlockBase from "./LoadingStatusBlockBase";

export default {
  title: "Components/Base/Common/LoadingStatusBlockBase",
  component: LoadingStatusBlockBase,
} as ComponentMeta<typeof LoadingStatusBlockBase>;

const Template: ComponentStory<typeof LoadingStatusBlockBase> = (args) => (
  <LoadingStatusBlockBase
    {...args}
    bgColor="bg-white"
    cubeColor="bg-instillBlue50"
  />
);
export const Playground: ComponentStory<typeof LoadingStatusBlockBase> =
  Template.bind({});

Playground.args = {};
