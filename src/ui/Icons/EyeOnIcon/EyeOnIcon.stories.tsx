import { ComponentStory, ComponentMeta } from "@storybook/react";
import EyeOnIcon from "./EyeOnIcon";

export default {
  title: "Components/Ui/Icon/EyeOnIcon",
  component: EyeOnIcon,
} as ComponentMeta<typeof EyeOnIcon>;

const Template: ComponentStory<typeof EyeOnIcon> = (args) => (
  <EyeOnIcon {...args} />
);

export const Playground: ComponentStory<typeof EyeOnIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
