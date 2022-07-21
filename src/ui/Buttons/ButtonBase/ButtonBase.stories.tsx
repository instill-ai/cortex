import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonBase from "./ButtonBase";

export default {
  title: "Components/Base/Button/ButtonBase",
  component: ButtonBase,
} as ComponentMeta<typeof ButtonBase>;

const Template: ComponentStory<typeof ButtonBase> = (args) => (
  <ButtonBase {...args}>Button</ButtonBase>
);
export const Playground: ComponentStory<typeof ButtonBase> = Template.bind({});

Playground.args = {
  bgColor: "bg-instillBlue50",
  hoveredBgColor: "hover:bg-instillBlue80",
  textColor: "text-instillGrey05",
  hoveredTextColor: "hover:text-instillBlue10",
  disabledBgColor: "bg-instillGrey15",
  disabledTextColor: "text-instillGrey50",
  padding: "px-5 py-2.5",
  borderRadius: "rounded-[1px]",
};
