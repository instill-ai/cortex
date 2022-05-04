import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicProgressMessageBox from "./BasicProgressMessageBox";

export default {
  title: "Components/Ui/Common/BasicProgressMessageBox",
  component: BasicProgressMessageBox,
} as ComponentMeta<typeof BasicProgressMessageBox>;

const Template: ComponentStory<typeof BasicProgressMessageBox> = (args) => (
  <BasicProgressMessageBox {...args}>
    Testing connection...
  </BasicProgressMessageBox>
);
export const Playground: ComponentStory<typeof BasicProgressMessageBox> =
  Template.bind({});

Playground.args = {
  status: "progressing",
  width: "w-[300px]",
  IndicatorColumnBgColor: "bg-instillBlue10",
};
