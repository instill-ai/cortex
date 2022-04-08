import Select, { StylesConfig } from "react-select";
import { FC, ReactNode, useEffect, useState } from "react";
import InputLabel from "../../InputLabel";
import { BasicInputFieldAttributes } from "../../../types/general";

export interface AutoCompleteWithIconOption {
  label: string;
  value: string | number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export type AutoCompleteWithIconProps = Omit<
  BasicInputFieldAttributes,
  | "valid"
  | "placeholder"
  | "fontSize"
  | "lineHeight"
  | "fontWeight"
  | "textColor"
  | "inputWidth"
  | "inputHeight"
  | "autoComplete"
  | "disabledBgColor"
  | "readOnlyBgColor"
  | "bgColor"
  | "borderRadius"
  | "focusHighlight"
> & {
  /**
   * Options
   * - label: Option's displayed label name
   * - value: Option's store selected value
   * - startIcon: Icon you want to put in fron of label
   * - endIcon: Icon you want to put behind the label
   */
  options: AutoCompleteWithIconOption[];

  /**
   * Default value of this autocomplete
   * - You have to put into the array with desired index like options[0]
   */
  defaultValue: AutoCompleteWithIconOption;

  /**
   * Whether the autocomplete is disabled or not
   */
  disabled: boolean;
};

export const AutoCompleteWithIcon: FC<AutoCompleteWithIconProps> = ({
  defaultValue,
  options,
  disabled,
  inputLabelType,
  labelName,
  required,
  id,
  onChangeInput,
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (defaultValue && !answered) {
      setAnswered(true);
    }
  }, [defaultValue]);

  const customStyles: StylesConfig = {
    valueContainer: (styles) => ({
      ...styles,
      paddingTop: "24px",
      paddingRight: "20px",
      paddingLeft: "20px",
    }),
    singleValue: (styles) => ({
      ...styles,
      marginRight: "0px",
      // Because the formatOptionLabel have px-[15px], which is not the correct padding inside
      // the selected input, we have to give extra minus marginLeft
      marginLeft: "-8px",
    }),
    control: (styles, state) => ({
      ...styles,
      borderRadius: "1px",
      borderWidth: "1px",
      height: "70px",
      borderColor: state.isFocused ? "#40A8F5" : "#E4E4E4",
      boxShadow: state.isFocused
        ? "0px 0px 0px 3px rgba(64, 168, 245, 0.2)"
        : "none",
      ":hover": {
        borderColor: state.isFocused ? "#40A8F5" : "#E4E4E4",
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: "1px",
      marginTop: "0",
      paddingTop: "10px",
      paddingBottom: "10px",
    }),
    option: (styles) => ({
      ...styles,
      ":hover": {
        backgroundColor: "",
      },
    }),
    input: (styles) => ({
      ...styles,
      marginRight: "0px",
      marginLeft: "0px",
    }),
  };

  return (
    <div className="flex flex-col gap-y-2.5 relative">
      <InputLabel
        answered={answered}
        focus={focus}
        required={required}
        htmlFor={id}
        fontStyle="font-normal text-sm leading-[18.2px]"
        activateStyle="top-1/2 -translate-y-[120%]"
        deActivateStyle="top-1/2 -translate-y-1/2"
        type={inputLabelType}
      >
        {labelName}
      </InputLabel>
      <Select
        id={id}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(event) => {
          onChangeInput(event);
        }}
        isDisabled={disabled}
        defaultValue={defaultValue}
        options={options}
        components={{
          IndicatorSeparator: () => null,
        }}
        formatOptionLabel={(option: AutoCompleteWithIconOption) => {
          return (
            <div className="flex flex-row gap-x-3 px-[15px]">
              <div className="flex my-auto w-[30px] h-[30px]">
                {option.startIcon}
              </div>
              <div className="my-auto instill-text-body">{option.label}</div>
              <div className="flex my-auto w-[30px] h-[30px]">
                {option.endIcon}
              </div>
            </div>
          );
        }}
        styles={customStyles}
      />
    </div>
  );
};
