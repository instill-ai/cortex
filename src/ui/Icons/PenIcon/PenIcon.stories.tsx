import { ComponentStory, ComponentMeta } from "@storybook/react";
import PenIcon from "./PenIcon";

export default {
  title: "Components/Ui/Icon/PenIcon",
  component: PenIcon,
} as ComponentMeta<typeof PenIcon>;

const Template: ComponentStory<typeof PenIcon> = (args) => (
  <PenIcon {...args} />
);

export const Playground: ComponentStory<typeof PenIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
