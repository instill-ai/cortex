import React from "react";
import cn from "clsx";

import { BasicInputProps, Nullable } from "../../../types/general";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import { InputDescriptionBase } from "../../InputDescriptions/InputDescriptionBase";
import * as Select from "@radix-ui/react-select";
import { SelectItem } from "./SelectItem";

export type SingleSelectOption = {
  label: string;
  value: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export type SingleSelectBaseProps = Omit<
  BasicInputProps,
  | "placeholder"
  | "inputFontSize"
  | "inputLineHeight"
  | "inputFontWeight"
  | "inputTextColor"
  | "inputWidth"
  | "inputHeight"
  | "inputBgColor"
  | "autoComplete"
  | "disabledBgColor"
  | "readOnlyBgColor"
  | "bgColor"
  | "borderRadius"
  | "focusHighlight"
  | "disabledCursor"
  | "disabledInputBgColor"
  | "disabledInputBorderColor"
  | "disabledInputBorderStyle"
  | "disabledInputBorderWidth"
  | "disabledInputTextColor"
  | "readOnlyCursor"
  | "readOnlyInputBgColor"
  | "readOnlyInputBorderColor"
  | "readOnlyInputBorderStyle"
  | "readOnlyInputBorderWidth"
  | "readOnlyInputTextColor"
  | "inputBorderColor"
  | "inputBorderRadius"
  | "inputBorderStyle"
  | "inputBorderWidth"
  | "placeholderFontFamily"
  | "placeholderFontSize"
  | "placeholderFontWeight"
  | "placeholderLineHeight"
  | "placeholderTextColor"
  | "errorInputBgColor"
  | "errorInputBorderColor"
  | "errorInputBorderStyle"
  | "errorInputBorderWidth"
  | "errorInputTextColor"
  | "onChangeInput"
> & {
  /** Set this field to prevend SSR warning */
  instanceId: string;
  /**
   * Options
   * - label: Option's displayed label name
   * - value: Option's store selected value
   * - startIcon: Icon you want to put in fron of label
   * - endIcon: Icon you want to put behind the label
   * - e.g.
   ```js
   [
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
   ]
   ```
   */
  options: SingleSelectOption[];

  /**
   * Default value of this autocomplete
   * - You have to put into the array with desired index like options[0]
   */
  // defaultValue: Nullable<SingleSelectOption>;

  /**
   * Whether the autocomplete is clearalbe
   * @default false
   */
  isClearable: boolean;

  /**
   * Determine select option dropdown direction
   * @default "auto"
   */
  menuPlacement: Nullable<"top" | "bottom" | "auto">;

  value: Nullable<SingleSelectOption>;

  /**
   * The design system use actionMeta to provide additional info about the selection behavior.
   * You could access these info inside the onChnage.
   */
  onChange?: (option: Nullable<SingleSelectOption>) => void;

  required?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;

  /**
   * Event when select is focused
   */
  onFocus: Nullable<() => void>;

  /**
   * Event when select is blur
   */
  onBlur: Nullable<() => void>;

  width: string;
  placeholder: Nullable<string>;
};

export const SingleSelectBase: React.FC<SingleSelectBaseProps> = (props) => {
  const {
    value,
    options,
    additionalMessageOnLabel,
    messageFontFamily,
    messageFontSize,
    messageFontWeight,
    messageLineHeight,
    messageTextColor,
    inputLabelType,
    label,
    required,
    id,
    error,
    description,
    onChange,
    labelFontFamily,
    labelFontSize,
    labelFontWeight,
    labelLineHeight,
    labelTextColor,
    descriptionWidth,
    descriptionFontFamily,
    descriptionFontSize,
    descriptionFontWeight,
    descriptionLineHeight,
    descriptionTextColor,
    descriptionLinkTextColor,
    descriptionLinkTextDecoration,
    errorLabelFontFamily,
    errorLabelFontSize,
    errorLabelFontWeight,
    errorLabelLineHeight,
    errorLabelTextColor,
    width,
    placeholder,
  } = props;

  const [focus, setFocus] = React.useState(false);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const selectRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (!focus || !selectRef) return;
    selectRef.current.focus();
  }, [focus]);

  return (
    <div className="flex flex-col">
      <div
        className={cn("flex flex-col relative", {
          "mb-2.5": description,
        })}
      >
        <div className={label ? "mb-2.5" : ""}>
          <InputLabelBase
            label={label}
            message={additionalMessageOnLabel}
            required={required}
            htmlFor={id}
            type={inputLabelType}
            labelFontFamily={labelFontFamily}
            labelFontSize={labelFontSize}
            labelFontWeight={labelFontWeight}
            labelLineHeight={labelLineHeight}
            labelTextColor={labelTextColor}
            error={error}
            errorLabelFontFamily={errorLabelFontFamily}
            errorLabelFontSize={errorLabelFontSize}
            errorLabelFontWeight={errorLabelFontWeight}
            errorLabelLineHeight={errorLabelLineHeight}
            errorLabelTextColor={errorLabelTextColor}
            messageFontFamily={messageFontFamily}
            messageFontSize={messageFontSize}
            messageFontWeight={messageFontWeight}
            messageLineHeight={messageLineHeight}
            messageTextColor={messageTextColor}
          />
        </div>
        <div className="w-full">
          <Select.Root
            value={value?.value}
            onValueChange={(value) => {
              const selectedOption =
                options.find((option) => option.value === value) || null;
              if (onChange) onChange(selectedOption);
            }}
          >
            <Select.Trigger
              className={cn(
                "w-full px-4 py-2 text-left border border-instillGrey70 flex flex-row focus:outline-instillGrey90 focus:outline",
                width
              )}
              aria-label="Food"
            >
              <Select.Value placeholder={placeholder} />
              <Select.Icon className="SelectIcon ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className={cn(
                  "w-full border border-instillGrey70 py-5 bg-white min-w-[inherit]",
                  width
                )}
                position="popper"
                sideOffset={12}
              >
                <Select.Viewport>
                  {options.map((option) => (
                    <SelectItem width={width} {...option} />
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      <InputDescriptionBase
        description={description}
        descriptionWidth={descriptionWidth}
        descriptionFontFamily={descriptionFontFamily}
        descriptionFontSize={descriptionFontSize}
        descriptionFontWeight={descriptionFontWeight}
        descriptionLineHeight={descriptionLineHeight}
        descriptionTextColor={descriptionTextColor}
        descriptionLinkTextColor={descriptionLinkTextColor}
        descriptionLinkTextDecoration={descriptionLinkTextDecoration}
      />
    </div>
  );
};
