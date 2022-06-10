import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProgressMessageBoxBase from "./ProgressMessageBoxBase";

export default {
  title: "Components/Base/Common/ProgressMessageBoxBase",
  component: ProgressMessageBoxBase,
} as ComponentMeta<typeof ProgressMessageBoxBase>;

const Template: ComponentStory<typeof ProgressMessageBoxBase> = (args) => (
  <ProgressMessageBoxBase {...args}>
    Testing connection...
  </ProgressMessageBoxBase>
);
export const Playground: ComponentStory<typeof ProgressMessageBoxBase> =
  Template.bind({});

Playground.args = {
  status: "progressing",
  width: "w-[300px]",
  errorIconColor: "fill-instillRed",
  errorIconWidth: "w-7",
  errorIconHeight: "h-7",
  successIconColor: "fill-instillGreen",
  successIconWidth: "w-7",
  successIconHeight: "h-7",
  progressBlockSize: 28,
  iconPosition: "mx-auto mb-auto",
  indicatorColumnWidth: "w-12",
  indicatorColumnBottomLeftBorderRadius: "rounded-bl-[1px]",
  indicatorColumnTopLeftBorderRadius: "rounded-tl-[1px]",
  messageColumnBgColor: "bg-white",
  messageColumnBottomRightBorderRadius: "rounded-br-[1px]",
  messageColumnTopRightBorderRadius: "rounded-tr-[1px]",
  boxBorderRadius: "rounded-[1px]",
};
