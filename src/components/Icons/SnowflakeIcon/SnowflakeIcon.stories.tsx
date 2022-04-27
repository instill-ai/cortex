import { ComponentStory, ComponentMeta } from "@storybook/react";
import SnowflakeIcon from "./SnowflakeIcon";

export default {
  title: "Components/Ui/Icon/SnowflakeIcon",
  component: SnowflakeIcon,
} as ComponentMeta<typeof SnowflakeIcon>;

const Template: ComponentStory<typeof SnowflakeIcon> = (args) => (
  <SnowflakeIcon {...args} />
);

export const Playground: ComponentStory<typeof SnowflakeIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
