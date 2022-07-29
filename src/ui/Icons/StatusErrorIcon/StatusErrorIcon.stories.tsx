import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatusErrorIcon from "./StatusErrorIcon";

export default {
  title: "Components/Ui/Icon/StatusErrorIcon",
  component: StatusErrorIcon,
} as ComponentMeta<typeof StatusErrorIcon>;

const Template: ComponentStory<typeof StatusErrorIcon> = (args) => (
  <StatusErrorIcon {...args} />
);

export const Playground: ComponentStory<typeof StatusErrorIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
