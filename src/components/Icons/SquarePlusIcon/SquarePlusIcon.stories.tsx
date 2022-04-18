import { ComponentStory, ComponentMeta } from "@storybook/react";
import SquarePlusIcon from "./SquarePlusIcon";

export default {
  title: "Components/Ui/Icon/SquarePlusIcon",
  component: SquarePlusIcon,
} as ComponentMeta<typeof SquarePlusIcon>;

const Template: ComponentStory<typeof SquarePlusIcon> = (args) => (
  <SquarePlusIcon {...args} />
);

export const Playground: ComponentStory<typeof SquarePlusIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
