import Select, { ClearIndicatorProps, StylesConfig } from "react-select";
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { BasicInputFieldAttributes } from "../../../types/general";
import { XIcon } from "../../Icons";
import { BasicInputLabel } from "../../InputLabels";

export interface AutoCompleteWithIconOption {
  label: string;
  value: string | number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export type AutoCompleteWithIconProps = Omit<
  BasicInputFieldAttributes,
  | "placeholder"
  | "inputFontSize"
  | "inputLineHeight"
  | "inputFontWeight"
  | "inputTextColor"
  | "inputWidth"
  | "inputHeight"
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
> & {
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
  options: AutoCompleteWithIconOption[];

  /**
   * Default value of this autocomplete
   * - You have to put into the array with desired index like options[0]
   */
  defaultValue: AutoCompleteWithIconOption;

  /** Whether the autocomplete is clearalbe */
  isClearable: boolean;
};

const AutoCompleteWithIcon: FC<AutoCompleteWithIconProps> = ({
  defaultValue,
  options,
  inputLabelType,
  label,
  required,
  id,
  onChangeInput,
  disabled,
  readOnly,
  isClearable,
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
      cursor: state.isDisabled ? "not-allowed" : readOnly ? "auto" : "pointer",
      borderRadius: "1px",
      borderWidth: "1px",
      height: "70px",
      borderStyle: state.isDisabled ? "dashed" : "solid",
      backgroundColor: "#ffffff",
      borderColor: state.isDisabled
        ? "#E4E4E4"
        : state.isFocused
        ? "#40A8F5"
        : "#E4E4E4",
      boxShadow: state.isFocused
        ? "0px 0px 0px 3px rgba(64, 168, 245, 0.2)"
        : "none",
      ":hover": {
        borderColor: state.isFocused ? "#40A8F5" : "#E4E4E4",
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#1A1A1A",
      fontFamily: "sans-serif",
      fontWeight: "normal",
      lineHeight: "28px",
      fontSize: "16px",
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
      <BasicInputLabel
        label={label}
        answered={disabled ? true : readOnly ? true : answered}
        focus={focus}
        required={required}
        htmlFor={id}
        type={inputLabelType}
        onBlurHandler={() => {
          setFocus(false);
        }}
        onFocusHandler={() => {
          setFocus(true);
        }}
      />
      <Select
        id={id}
        isSearchable={!readOnly}
        menuIsOpen={readOnly ? false : undefined}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(event) => {
          onChangeInput(event);

          if (event) {
            setAnswered(true);
          } else {
            setAnswered(false);
          }
        }}
        isDisabled={disabled}
        defaultValue={defaultValue}
        options={options}
        components={{
          IndicatorSeparator: () => null,
          ClearIndicator: (props: ClearIndicatorProps) => {
            const {
              getStyles,
              innerProps: { ref, ...restInnerProps },
            } = props;

            return (
              <div
                {...restInnerProps}
                ref={ref}
                style={getStyles("clearIndicator", props) as CSSProperties}
              >
                <div style={{ padding: "0px 5px" }}>
                  <XIcon
                    position="m-auto"
                    width="w-5"
                    height="g-5"
                    color="text-instillGrey50"
                  />
                </div>
              </div>
            );
          },
        }}
        isClearable={isClearable}
        placeholder={focus ? "Search..." : null}
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

export default AutoCompleteWithIcon;
