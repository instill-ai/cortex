import { ComponentStory, ComponentMeta } from "@storybook/react";
import FacebookIcon from "./FacebookIcon";

export default {
  title: "Components/Ui/Icon/FacebookIcon",
  component: FacebookIcon,
} as ComponentMeta<typeof FacebookIcon>;

const Template: ComponentStory<typeof FacebookIcon> = (args) => (
  <FacebookIcon {...args} />
);

export const Playground: ComponentStory<typeof FacebookIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
  color: "fill-instillGrey70",
};
