import React, { useState } from "react";
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
    checkedDotColor="peer-checked:bg-instillBlue50"
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
  checkedInputBorderColor: "checked:border-instillBlue50",
  checkedDotColor: "peer-checked:bg-instillBlue50",
  disabledDotColor: "disabled:bg-instillGray20",
  disabledCheckedDotColor: "disabled:peer-checked:bg-[#8DF5FF]",
  disabledCursor: "disabled:cursor-not-allowed",
  disabledInputBgColor: "disabled:bg-white",
  disabledInputBorderColor: "disabled:border-instillGray20",
  disabledInputBorderStyle: "disabled:border-dashed",
  disabledInputBorderWidth: "disabled:border",
  disabledCheckedInputBorderColor: "disabled:checked:border-instillGray20",
  readOnlyCursor: "read-only:cursor-auto",
  readOnlyInputBgColor: "read-only:bg-white",
  readOnlyInputBorderColor: "read-only:border-instillGray20",
  readOnlyInputBorderStyle: "read-only:border-solid",
  readOnlyInputBorderWidth: "read-only:border",
  readOnlyCheckedInputBorderColor: "read-only:checked:border-[#8DF5FF]",
  readOnlyCheckedDotColor: "read-only:peer-checked:bg-[#8DF5FF]",
  readOnlyDotColor: "read-only:bg-instillGray20",
};

export const Default: ComponentStory<typeof ToggleFieldBase> = () => {
  const [_, setChecked] = useState(false);

  const onChangeInput = (inputValue: any) => {
    setChecked(inputValue);
  };

  return (
    <ToggleFieldBase
      defaultChecked={true}
      id="toggle-field-base-playground"
      disabled={false}
      readOnly={false}
      onChangeInput={onChangeInput}
      required={true}
      labelName="toggle-field-base-playground"
      focusHighlight={true}
      inputBorderRadius=""
      inputBorderColor="border-instillGray20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
      dotColor="bg-instillGray30"
      checkedInputBorderColor="checked:border-instillBlue50"
      checkedDotColor="peer-checked:bg-instillBlue50"
      disabledDotColor="disabled:bg-instillGray20"
      disabledCheckedDotColor="disabled:peer-checked:bg-[#8DF5FF]"
      disabledCursor="disabled:cursor-not-allowed"
      disabledInputBgColor="disabled:bg-white"
      disabledInputBorderColor="disabled:border-instillGray20"
      disabledInputBorderStyle="disabled:border-dashed"
      disabledInputBorderWidth="disabled:border"
      disabledCheckedInputBorderColor="disabled:checked:border-instillGray20"
      readOnlyCursor="read-only:cursor-auto"
      readOnlyInputBgColor="read-only:bg-white"
      readOnlyInputBorderColor="read-only:border-instillGray20"
      readOnlyInputBorderStyle="read-only:border-solid"
      readOnlyInputBorderWidth="read-only:border"
      readOnlyCheckedInputBorderColor="read-only:checked:border-[#8DF5FF]"
      readOnlyCheckedDotColor="read-only:peer-checked:bg-[#8DF5FF]"
      readOnlyDotColor="readonly:bg-instillGray20"
    />
  );
};
