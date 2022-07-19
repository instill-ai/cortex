import { ComponentStory, ComponentMeta } from "@storybook/react";
import CollapseLeftIcon from "./CollapseLeftIcon";

export default {
  title: "Components/Ui/Icon/CollapseLeftIcon",
  component: CollapseLeftIcon,
} as ComponentMeta<typeof CollapseLeftIcon>;

const Template: ComponentStory<typeof CollapseLeftIcon> = (args) => (
  <CollapseLeftIcon {...args} />
);

export const Playground: ComponentStory<typeof CollapseLeftIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
