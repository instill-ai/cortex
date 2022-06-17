import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArtiVcIcon from "./ArtiVcIcon";

export default {
  title: "Components/Ui/Icon/ArtiVcIcon",
  component: ArtiVcIcon,
} as ComponentMeta<typeof ArtiVcIcon>;

const Template: ComponentStory<typeof ArtiVcIcon> = (args) => (
  <ArtiVcIcon {...args} />
);

export const Playground: ComponentStory<typeof ArtiVcIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
