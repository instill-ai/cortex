import { ComponentStory, ComponentMeta } from "@storybook/react";
import MySqlIcon from "./MySqlIcon";

export default {
  title: "Components/Ui/Icon/MySqlIcon",
  component: MySqlIcon,
} as ComponentMeta<typeof MySqlIcon>;

const Template: ComponentStory<typeof MySqlIcon> = (args) => (
  <MySqlIcon {...args} />
);

export const Playground: ComponentStory<typeof MySqlIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
