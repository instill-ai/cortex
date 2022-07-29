import { ComponentStory, ComponentMeta } from "@storybook/react";
import IdIcon from "./IdIcon";

export default {
  title: "Components/Ui/Icon/IdIcon",
  component: IdIcon,
} as ComponentMeta<typeof IdIcon>;

const Template: ComponentStory<typeof IdIcon> = (args) => <IdIcon {...args} />;

export const Playground: ComponentStory<typeof IdIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
