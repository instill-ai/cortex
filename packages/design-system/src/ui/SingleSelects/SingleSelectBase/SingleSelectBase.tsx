import ReactSelect, {
  ActionMeta,
  SingleValue,
  StylesConfig,
} from "react-select";
import React from "react";
import cn from "clsx";

import { BasicInputProps, Nullable } from "../../../types/general";
import { XIcon } from "../../Icons";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import { InputDescriptionBase } from "../../InputDescriptions/InputDescriptionBase";

export type SingleSelectOption = {
  label: string;
  value: string | number;
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
  onChange?: (
    option: Nullable<SingleSelectOption>,
    meta: ActionMeta<SingleSelectOption>
  ) => void;

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
};

const SelectBase: React.FC<SingleSelectBaseProps> = (props) => {
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
    instanceId,
    error,
    description,
    onChange,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    isClearable,
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
    menuPlacement,
  } = props;

  const [focus, setFocus] = React.useState(false);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const selectRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!focus || !selectRef) return;
    selectRef.current.focus();
  }, [focus]);

  const customStyles: StylesConfig<SingleSelectOption> = React.useMemo(() => {
    return {
      valueContainer: (styles) => ({
        ...styles,
        paddingTop: "",
        paddingRight: "20px",
        paddingLeft: "20px",
        paddingBottom: "",
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
        cursor: state.isDisabled
          ? "not-allowed"
          : readOnly
          ? "auto"
          : "pointer",
        borderRadius: "1px",
        borderWidth: "1px",
        height: 44,
        borderStyle: state.isDisabled ? "dashed" : "solid",
        backgroundColor: "#ffffff",
        borderColor: error
          ? "#FF5353"
          : state.isDisabled
          ? "#E4E4E4"
          : state.isFocused
          ? "#40A8F5"
          : "#E4E4E4",
        boxShadow: state.isFocused
          ? "0px 0px 0px 3px rgba(64, 168, 245, 0.2)"
          : "none",
        ":hover": {
          borderColor: error
            ? "#FF5353"
            : state.isFocused
            ? "#40A8F5"
            : "#E4E4E4",
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
        backgroundColor: "#FFFFFF",
        zIndex: 9999,
      }),
      option: (styles) => ({
        ...styles,
        // backgroundColor: state.isFocused ? "#40A8F5" : "#FFFFFF",
        ":hover": {
          //backgroundColor: "#F4FBFF",
        },
      }),
      input: (styles) => ({
        ...styles,
        marginRight: "0px",
        marginLeft: "0px",
      }),
    };
  }, [error, readOnly]);

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
        <div>
          <ReactSelect
            id={id}
            value={value}
            ref={selectRef}
            instanceId={instanceId}
            onFocus={() => {
              if (onFocus) onFocus();
              setFocus(true);
            }}
            onBlur={() => {
              if (onBlur) onBlur();
              setFocus(false);
            }}
            menuPlacement={menuPlacement ? menuPlacement : "auto"}
            options={options}
            onChange={(selectedOption, meta) => {
              if (onChange) {
                onChange(
                  selectedOption as SingleValue<SingleSelectOption>,
                  meta
                );
              }
            }}
            isDisabled={disabled}
            components={{
              IndicatorSeparator: () => null,
              ClearIndicator: (props) => {
                const {
                  getStyles,
                  innerProps: { ref, ...restInnerProps },
                } = props;

                return (
                  <div
                    {...restInnerProps}
                    ref={ref}
                    style={
                      getStyles("clearIndicator", props) as React.CSSProperties
                    }
                  >
                    <div style={{ padding: "0px 5px" }}>
                      <XIcon
                        position="m-auto"
                        width="w-5"
                        height="h-5"
                        color="text-instillGrey50"
                      />
                    </div>
                  </div>
                );
              },
            }}
            isClearable={isClearable}
            placeholder={focus ? "Search..." : null}
            formatOptionLabel={(option: SingleSelectOption) => {
              return (
                <div
                  data-testid={`${id}-selected-option`}
                  className="flex flex-row gap-x-3 px-[15px]"
                >
                  {option.startIcon ? (
                    <div className="flex my-auto">{option.startIcon}</div>
                  ) : null}
                  <div className="my-auto instill-text-body">
                    {option.label}
                  </div>
                  {option.endIcon ? (
                    <div className="flex my-auto">{option.endIcon}</div>
                  ) : null}
                </div>
              );
            }}
            styles={customStyles}
          />
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

export default SelectBase;
