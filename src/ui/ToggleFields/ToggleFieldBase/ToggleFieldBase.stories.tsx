import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { basicInputDescriptionConfig } from "../../InputDescriptions";
import ToggleFieldBase from "./ToggleFieldBase";

export default {
  title: "Components/Base/Input/ToggleFieldBase",
  component: ToggleFieldBase,
} as ComponentMeta<typeof ToggleFieldBase>;

const Template: ComponentStory<typeof ToggleFieldBase> = (args) => {
  const [checked, setChecked] = useState(false);
  return (
    <ToggleFieldBase
      {...args}
      value={checked}
      onChangeInput={(_, value) => {
        setChecked(value);
      }}
    />
  );
};
export const Playground: ComponentStory<typeof ToggleFieldBase> = Template.bind(
  {}
);

Playground.args = {
  required: true,
  focusHighlight: true,
  onChangeInput: () => undefined,
  id: "toggle-field-base-playground",
  description: "this is a description for toggle field base",

  label: "toggle-field-base-playground",
  additionalMessageOnLabel: null,
  labelFontSize: "text-sm",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "leading-[18.2px]",
  labelFontFamily: "font-sans",
  labelActivateStyle: "",
  labelDeActivateStyle: "",

  inputBgColor: "bg-white",
  inputBorderRadius: "",
  inputBorderColor: "border-instillGrey20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
  inputFocusBorderColor: "border-instillBlue50",
  inputFocusShadow: "instill-input-focus-shadow",
  inputShadow: null,

  dotColor: "bg-instillGrey30",
  checkedInputBorderColor: "border-instillBlue50",
  checkedDotColor: "bg-instillBlue50",

  disabled: true,
  disabledDotColor: "bg-instillGrey20",
  disabledCheckedDotColor: "bg-[#8DF5FF]",
  disabledCursor: "cursor-not-allowed",
  disabledInputBgColor: "bg-white",
  disabledInputBorderColor: "border-instillGrey20",
  disabledInputBorderStyle: "border-dashed",
  disabledInputBorderWidth: "border",
  disabledCheckedInputBorderColor: "border-instillGrey20",

  readOnly: false,
  readOnlyCursor: "cursor-auto",
  readOnlyInputBgColor: "bg-white",
  readOnlyInputBorderColor: "border-instillGrey20",
  readOnlyInputBorderStyle: "border-solid",
  readOnlyInputBorderWidth: "border",
  readOnlyCheckedInputBorderColor: "border-[#8DF5FF]",
  readOnlyCheckedDotColor: "bg-[#8DF5FF]",
  readOnlyDotColor: "bg-instillGrey20",

  error: "",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-sm",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "leading-[18.2px]",
  errorLabelTextColor: "text-instillRed",

  ...basicInputDescriptionConfig,
};
