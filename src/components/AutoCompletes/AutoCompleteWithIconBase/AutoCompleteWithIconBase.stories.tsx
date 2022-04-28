import { ComponentStory, ComponentMeta } from "@storybook/react";
import AutoCompleteWithIconBase, {
  AutoCompleteWithIconOption,
} from "./AutoCompleteWithIconBase";
import { GrpcIcon, HttpIcon, MongoDbIcon, SnowflakeIcon } from "../../Icons";

export default {
  title: "Components/Ui/Base/AutoCompleteWithIconBase",
  component: AutoCompleteWithIconBase,
} as ComponentMeta<typeof AutoCompleteWithIconBase>;

const Template: ComponentStory<typeof AutoCompleteWithIconBase> = (args) => {
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
    <AutoCompleteWithIconBase
      {...args}
      onChangeInput={onChangeInputHandler}
      options={options}
    />
  );
};

export const Playground: ComponentStory<typeof AutoCompleteWithIconBase> =
  Template.bind({});

Playground.args = {
  error:
    "You want to use the g (global) modifier to find all matches. Since the brackets are included in the match result you don't need to use a capturing group and I used negation instead to eliminate the amount of backtracking",
  defaultValue: null,
  disabled: false,
  readOnly: false,
  required: false,
  isClearable: true,
  description: "this is a description for auth complete with Icon",
  label: "autocomplete-with-icon",
  inputLabelType: "inset",
  id: "autocomplete-with-icon",
  labelFontSize: "text-sm",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "leading-[18.2px]",
  labelFontFamily: "font-sans",
  labelActivateStyle: "top-1/2 -translate-y-[120%]",
  labelDeActivateStyle: "top-1/2 -translate-y-1/2",
  descriptionFontFamily: "font-mono",
  descriptionFontSize: "text-xs",
  descriptionLineHeight: "leading-[15.6px]",
  descriptionFontWeight: "font-normal",
  descriptionTextColor: "text-instillGrey50",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-sm",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "leading-[18.2px]",
  errorLabelTextColor: "text-instillRed",
};
