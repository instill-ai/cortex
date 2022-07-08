import { ComponentStory, ComponentMeta } from "@storybook/react";
import { basicProgressMessageBoxConfig } from "../BasicProgressMessageBox";
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
  width: "w-[300px]",
  message: "Testing connection...",
  ...basicProgressMessageBoxConfig,
};
