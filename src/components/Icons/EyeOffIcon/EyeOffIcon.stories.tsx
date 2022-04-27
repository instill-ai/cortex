import { ComponentStory, ComponentMeta } from "@storybook/react";
import EyeOffIcon from "./EyeOffIcon";

export default {
  title: "Components/Ui/Icon/EyeOffIcon",
  component: EyeOffIcon,
} as ComponentMeta<typeof EyeOffIcon>;

const Template: ComponentStory<typeof EyeOffIcon> = (args) => (
  <EyeOffIcon {...args} />
);

export const Playground: ComponentStory<typeof EyeOffIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
