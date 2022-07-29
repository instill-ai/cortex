import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatusOffIcon from "./StatusOffIcon";

export default {
  title: "Components/Ui/Icon/StatusOffIcon",
  component: StatusOffIcon,
} as ComponentMeta<typeof StatusOffIcon>;

const Template: ComponentStory<typeof StatusOffIcon> = (args) => (
  <StatusOffIcon {...args} />
);

export const Playground: ComponentStory<typeof StatusOffIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
