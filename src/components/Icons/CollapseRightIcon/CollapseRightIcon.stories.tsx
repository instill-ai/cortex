import { ComponentStory, ComponentMeta } from "@storybook/react";
import CollapseRightIcon from "./CollapseRightIcon";

export default {
  title: "Components/Ui/Icon/CollapseRightIcon",
  component: CollapseRightIcon,
} as ComponentMeta<typeof CollapseRightIcon>;

const Template: ComponentStory<typeof CollapseRightIcon> = (args) => (
  <CollapseRightIcon {...args} />
);

export const Playground: ComponentStory<typeof CollapseRightIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
