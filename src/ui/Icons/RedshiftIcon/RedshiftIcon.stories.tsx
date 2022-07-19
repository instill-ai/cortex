import { ComponentStory, ComponentMeta } from "@storybook/react";
import RedShiftIcon from "./RedShiftIcon";

export default {
  title: "Components/Ui/Icon/RedShiftIcon",
  component: RedShiftIcon,
} as ComponentMeta<typeof RedShiftIcon>;

const Template: ComponentStory<typeof RedShiftIcon> = (args) => (
  <RedShiftIcon {...args} />
);

export const Playground: ComponentStory<typeof RedShiftIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
