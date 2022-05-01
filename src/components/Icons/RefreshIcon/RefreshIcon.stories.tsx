import { ComponentStory, ComponentMeta } from "@storybook/react";
import RefreshIcon from "./RefreshIcon";

export default {
  title: "Components/Ui/Icon/RefreshIcon",
  component: RefreshIcon,
} as ComponentMeta<typeof RefreshIcon>;

const Template: ComponentStory<typeof RefreshIcon> = (args) => (
  <RefreshIcon {...args} />
);

export const Playground: ComponentStory<typeof RefreshIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
