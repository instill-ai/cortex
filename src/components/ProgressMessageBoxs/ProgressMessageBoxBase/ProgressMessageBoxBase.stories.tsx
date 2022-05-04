import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProgressMessageBoxBase from "./ProgressMessageBoxBase";

export default {
  title: "Components/Base/Common/ProgressMessageBoxBase",
  component: ProgressMessageBoxBase,
} as ComponentMeta<typeof ProgressMessageBoxBase>;

const Template: ComponentStory<typeof ProgressMessageBoxBase> = (args) => (
  <ProgressMessageBoxBase {...args} />
);
export const Playground: ComponentStory<typeof ProgressMessageBoxBase> =
  Template.bind({});

Playground.args = {
  status: "progressing",
  message: "Testing connection",
  width: "w-[300px]",
  errorIconColor: "fill-instillRed",
  errorIconWidth: "w-7",
  errorIconHeight: "h-7",
  successIconColor: "fill-instillGreen",
  successIconWidth: "w-7",
  successIconHeight: "h-7",
  progressBlockSize: 28,
  IconPosition: "mx-auto mb-auto",
  IndicatorColumnBgColor: "bg-instillGrey50",
  messageColumnBgColor: "bg-white",
};
