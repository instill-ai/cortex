import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ActionMeta } from "react-select";
import { Nullable } from "../../../types/general";
import { GrpcIcon, HttpIcon, MongoDbIcon, SnowflakeIcon } from "../../Icons";
import { SingleSelectOption } from "../SingleSelectBase";
import BasicSingleSelect from "./BasicSingleSelect";

export default {
  title: "Components/Ui/Input/BasicSingleSelect",
  component: BasicSingleSelect,
} as ComponentMeta<typeof BasicSingleSelect>;

const Template: ComponentStory<typeof BasicSingleSelect> = (args) => {
  const options: SingleSelectOption[] = [
    {
      value: "grpc",
      label: "gRPC",
      startIcon: (
        <GrpcIcon
          color="text-instillGrey95"
          width="w-[30px]"
          height="h-[30px]"
          position="m-auto"
        />
      ),
    },
    {
      value: "http",
      label: "HTTP",
      startIcon: (
        <HttpIcon
          color="text-instillGrey95"
          width="w-[30px]"
          height="h-[30px]"
          position="m-auto"
        />
      ),
    },
    {
      value: "snowflake",
      label: "Snowflake",
      startIcon: (
        <SnowflakeIcon width="w-[30px]" height="h-[30px]" position="m-auto" />
      ),
    },
    {
      value: "mongodb",
      label: "MongoDB",
      startIcon: (
        <MongoDbIcon width="w-[30px]" height="h-[30px]" position="m-auto" />
      ),
    },
  ];

  const onChange = (
    option: Nullable<SingleSelectOption>,
    meta: ActionMeta<SingleSelectOption>
  ) => {
    console.log(option, meta);
  };

  return (
    <BasicSingleSelect
      {...args}
      id="autocomplete-with-icon"
      instanceId="autocomplete-with-icon"
      onChange={onChange}
      options={options}
      label="autocomplete-with-icon"
    />
  );
};

export const Playground: ComponentStory<typeof BasicSingleSelect> =
  Template.bind({});

Playground.args = {
  disabled: false,
  readOnly: false,
  required: false,
};
