import { ComponentStory, ComponentMeta } from "@storybook/react";
import PlusIcon from "./PlusIcon";

export default {
  title: "Components/Ui/Icon/PlusIcon",
  component: PlusIcon,
} as ComponentMeta<typeof PlusIcon>;

const Template: ComponentStory<typeof PlusIcon> = (args) => (
  <PlusIcon {...args} />
);

export const Playground: ComponentStory<typeof PlusIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
