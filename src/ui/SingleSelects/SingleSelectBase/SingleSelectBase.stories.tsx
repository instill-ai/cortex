import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import SingleSelectBase from ".";
import { SingleSelectOption } from "./SingleSelectBase";
import { basicInputDescriptionConfig } from "../../InputDescriptions";
import { Nullable } from "../../../types/general";
import { basicSingleSelectConfig } from "../BasicSingleSelect";

export default {
  title: "Components/Base/SingleSelectBase",
  component: SingleSelectBase,
} as ComponentMeta<typeof SingleSelectBase>;

const Template: ComponentStory<typeof SingleSelectBase> = (args) => {
  const optionsWithoutIcon: SingleSelectOption[] = [
    {
      value: "grpc",
      label: "gRPC",
    },
    {
      value: "http",
      label: "HTTP",
    },
    {
      value: "snowflake",
      label: "Snowflake",
    },
    {
      value: "mongodb",
      label: "MongoDB",
    },
  ];

  const onChange = (option: Nullable<SingleSelectOption>) => {
    setValue(option);
  };

  const [value, setValue] = useState<SingleSelectOption | null>(null);

  return (
    <SingleSelectBase
      {...args}
      onChange={onChange}
      options={optionsWithoutIcon}
      value={value}
    />
  );
};

export const Playground: ComponentStory<typeof SingleSelectBase> =
  Template.bind({});

Playground.args = {
  disabled: false,
  readOnly: false,
  required: false,
  isClearable: true,
  additionalMessageOnLabel: null,
  description: "this is a description for auth complete with Icon",
  label: "Single select playground",
  id: "single-select-with-icon",
  ...basicSingleSelectConfig,
  ...basicInputDescriptionConfig,
};
