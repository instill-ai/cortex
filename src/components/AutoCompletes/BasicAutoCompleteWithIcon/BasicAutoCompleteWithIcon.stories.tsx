import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GrpcIcon, HttpIcon, MongoDbIcon, SnowflakeIcon } from "../../Icons";
import { AutoCompleteWithIconOption } from "../AutoCompleteWithIconBase";
import BasicAutoCompleteWithIcon from "./BasicAutoCompleteWithIcon";

export default {
  title: "Components/Ui/Input/BasicAutoCompleteWithIcon",
  component: BasicAutoCompleteWithIcon,
} as ComponentMeta<typeof BasicAutoCompleteWithIcon>;

const Template: ComponentStory<typeof BasicAutoCompleteWithIcon> = (args) => {
  const options: AutoCompleteWithIconOption[] = [
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

  const onChangeInputHandler = (inputValue: any) => {
    console.log(inputValue);
  };

  return (
    <BasicAutoCompleteWithIcon
      {...args}
      onChangeInput={onChangeInputHandler}
      options={options}
    />
  );
};

export const Playground: ComponentStory<typeof BasicAutoCompleteWithIcon> =
  Template.bind({});

Playground.args = {
  error:
    "You want to use the g (global) modifier to find all matches. Since the brackets are included in the match result you don't need to use a capturing group and I used negation instead to eliminate the amount of backtracking",
  defaultValue: null,
  disabled: false,
  readOnly: false,
  required: false,
  description: "this is a description for auth complete with Icon",
  label: "autocomplete-with-icon",
  id: "autocomplete-with-icon",
};
