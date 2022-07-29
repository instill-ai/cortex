import { ComponentStory, ComponentMeta } from "@storybook/react";
import HttpIcon from "./HttpIcon";

export default {
  title: "Components/Ui/Icon/HttpIcon",
  component: HttpIcon,
} as ComponentMeta<typeof HttpIcon>;

const Template: ComponentStory<typeof HttpIcon> = (args) => (
  <HttpIcon {...args} />
);

export const Playground: ComponentStory<typeof HttpIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
