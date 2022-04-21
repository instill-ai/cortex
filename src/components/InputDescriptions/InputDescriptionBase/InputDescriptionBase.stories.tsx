import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputDescriptionBase from "./InputDescriptionBase";

export default {
  title: "Components/Base/Input/InputDescriptionBase",
  component: InputDescriptionBase,
} as ComponentMeta<typeof InputDescriptionBase>;

const Template: ComponentStory<typeof InputDescriptionBase> = (args) => (
  <InputDescriptionBase {...args}>Playground label</InputDescriptionBase>
);

export const Playground: ComponentStory<typeof InputDescriptionBase> =
  Template.bind({});

Playground.args = {
  description: "this is description",
  marginTop: "mt-2.5",
  descriptionFontFamily: "font-mono",
  descriptionFontSize: "text-sm",
  descriptionLineHeight: "leading-[15.6px]",
  descriptionFontWeight: "font-normal",
  descriptionTextColor: "text-instillGrey50",
};
