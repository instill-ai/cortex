import { ComponentStory, ComponentMeta } from "@storybook/react";
import AirbyteIcon from "./AirbyteIcon";

export default {
  title: "Components/Ui/Icon/AirbyteIcon",
  component: AirbyteIcon,
} as ComponentMeta<typeof AirbyteIcon>;

const Template: ComponentStory<typeof AirbyteIcon> = (args) => (
  <AirbyteIcon {...args} />
);

export const Playground: ComponentStory<typeof AirbyteIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
