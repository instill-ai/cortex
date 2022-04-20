import { ComponentStory, ComponentMeta } from "@storybook/react";
import GrpcIcon from "./GrpcIcon";

export default {
  title: "Components/Ui/Icon/GrpcIcon",
  component: GrpcIcon,
} as ComponentMeta<typeof GrpcIcon>;

const Template: ComponentStory<typeof GrpcIcon> = (args) => (
  <GrpcIcon {...args} />
);

export const Playground: ComponentStory<typeof GrpcIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
