import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatusOnIcon from "./StatusOnIcon";

export default {
  title: "Components/Ui/Icon/StatusOnIcon",
  component: StatusOnIcon,
} as ComponentMeta<typeof StatusOnIcon>;

const Template: ComponentStory<typeof StatusOnIcon> = (args) => (
  <StatusOnIcon {...args} />
);

export const Playground: ComponentStory<typeof StatusOnIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
