import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToggleFieldBase from "./ToggleFieldBase";

export default {
  title: "Components/Base/Input/ToggleFieldBase",
  component: ToggleFieldBase,
} as ComponentMeta<typeof ToggleFieldBase>;

const Template: ComponentStory<typeof ToggleFieldBase> = (args) => (
  <ToggleFieldBase
    {...args}
    dotColor="bg-instillGray30"
    checkedDotColor="bg-instillBlue50"
  />
);
export const Playground: ComponentStory<typeof ToggleFieldBase> = Template.bind(
  {}
);

Playground.args = {
  id: "toggle-field-base-playground",
  defaultChecked: false,
  disabled: false,
  readOnly: false,
  required: true,
  labelName: "toggle-field-base-playground",
  focusHighlight: true,
  inputBorderRadius: "",
  inputBorderColor: "border-instillGray20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
  dotColor: "bg-instillGray30",
  checkedInputBorderColor: "border-instillBlue50",
  checkedDotColor: "bg-instillBlue50",
  disabledDotColor: "bg-instillGray20",
  disabledCheckedDotColor: "bg-[#8DF5FF]",
  disabledCursor: "cursor-not-allowed",
  disabledInputBgColor: "bg-white",
  disabledInputBorderColor: "border-instillGray20",
  disabledInputBorderStyle: "border-dashed",
  disabledInputBorderWidth: "border",
  disabledCheckedInputBorderColor: "border-instillGray20",
  readOnlyCursor: "cursor-auto",
  readOnlyInputBgColor: "bg-white",
  readOnlyInputBorderColor: "border-instillGray20",
  readOnlyInputBorderStyle: "border-solid",
  readOnlyInputBorderWidth: "border",
  readOnlyCheckedInputBorderColor: "border-[#8DF5FF]",
  readOnlyCheckedDotColor: "bg-[#8DF5FF]",
  readOnlyDotColor: "bg-instillGray20",
};
