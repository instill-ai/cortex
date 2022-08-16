import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToggleIcon from "./ToggleIcon";

export default {
  title: "Components/Ui/Icon/ToggleIcon",
  component: ToggleIcon,
} as ComponentMeta<typeof ToggleIcon>;

const Template: ComponentStory<typeof ToggleIcon> = (args) => (
  <ToggleIcon {...args} />
);

export const Playground: ComponentStory<typeof ToggleIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
