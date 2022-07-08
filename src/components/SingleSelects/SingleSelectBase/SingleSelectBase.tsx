import ReactSelect, { SingleValue, StylesConfig } from "react-select";
import React from "react";
import cn from "clsx";

import { BasicInputFieldAttributes, Nullable } from "../../../types/general";
import { XIcon } from "../../Icons";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import InputDescriptionBase from "../../InputDescriptions/InputDescriptionBase";
import { getElementPosition } from "../../../utils";

export type SingleSelectOption = {
  label: string;
  value: string | number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export type SingleSelectBaseProps = Omit<
  BasicInputFieldAttributes,
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

  /** Whether the autocomplete is clearalbe */
  isClearable: boolean;

  /** Determine select option dropdown direction */
  menuPlacement: Nullable<"top" | "bottom" | "auto">;

  value: Nullable<SingleSelectOption>;

  onChangeInput: (id: string, option: Nullable<SingleSelectOption>) => void;
};

const SelectBase: React.FC<SingleSelectBaseProps> = ({
  value,
  options,
  additionalMessageOnLabel,
  inputLabelType,
  label,
  required,
  id,
  instanceId,
  error,
  description,
  onChangeInput,
  disabled,
  readOnly,
  isClearable,
  labelFontFamily,
  labelFontSize,
  labelFontWeight,
  labelLineHeight,
  labelTextColor,
  labelActivateStyle,
  labelDeActivateStyle,
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
}) => {
  const [focus, setFocus] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);

  React.useEffect(() => {
    if (value && !answered) {
      setAnswered(true);
    }
  }, [value]);

  /**
   * We use these ref to calculate the width and height of the container
   * when there has very long error message which make label overflow.
   * - When component is mount we calculate the label width
   * - When error prop is changed we calculate the container height and compare it with original
   *   container height, is former is greater, we adapt new container height
   * - We use inputValuePaddingTop to control the position of the input value
   */

  // We create a wrapper on top of Select component to avoid error related to ref assignmemt
  // inside of react-select
  const inputRef = React.useRef<HTMLDivElement>(null);
  const selectRef = React.useRef<any>(null);
  const inputLabelRef = React.useRef<HTMLLabelElement>(null);
  const [inputLabelWidth, setInputLabelWidth] = React.useState<number | null>(
    null
  );
  const [containerHeight, setContainerHeight] = React.useState<number | null>(
    null
  );
  const [inputValuePaddingTop, setInputValuePaddingTop] = React.useState<
    number | null
  >(null);

  const [inputValuePaddingBottom, setInputValuePaddingBottom] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    if (!focus || !selectRef) return;
    selectRef.current.focus();
  }, [focus]);

  React.useEffect(() => {
    if (!inputRef.current || inputLabelType !== "inset") {
      return;
    }

    const mainContainerPosition = getElementPosition(inputRef.current);

    const inputLabelPaddingWidth = 20;
    const indicatorWidth = 20;

    const inputLabelWidth =
      mainContainerPosition.width - inputLabelPaddingWidth * 2 - indicatorWidth;

    setInputLabelWidth(inputLabelWidth);
  }, [inputRef, inputLabelType]);

  React.useEffect(() => {
    if (!label) {
      setInputValuePaddingTop(10);
      setInputValuePaddingBottom(10);
      return;
    }

    if (
      !error ||
      !inputRef ||
      !inputRef.current ||
      !inputLabelRef ||
      !inputLabelRef.current ||
      inputLabelType !== "inset"
    ) {
      setContainerHeight(70);
      setInputValuePaddingTop(24);
      setInputValuePaddingBottom(0);
      return;
    }

    const inputLabelPosition = getElementPosition(inputLabelRef.current);
    const mainContainerPosition = getElementPosition(inputRef.current);

    const inputLabelPaddingY = 20;
    const gapBetweenLabelAndValue = 10;
    const inputLineHeight = 28;

    const containerHeight =
      inputLabelPosition.height +
      inputLabelPaddingY * 2 +
      gapBetweenLabelAndValue +
      inputLineHeight;

    if (containerHeight > mainContainerPosition.height) {
      setContainerHeight(containerHeight);
      setInputValuePaddingTop(
        inputLabelPosition.height + inputLabelPaddingY + gapBetweenLabelAndValue
      );
      setInputValuePaddingBottom(0);
    } else {
      setContainerHeight(70);
      setInputValuePaddingTop(24);
      setInputValuePaddingBottom(0);
    }
  }, [error, inputLabelRef, inputLabelType, label]);

  const customStyles: StylesConfig<SingleSelectOption> = {
    valueContainer: (styles) => ({
      ...styles,
      paddingTop: inputValuePaddingTop ? inputValuePaddingTop : "",
      paddingRight: "20px",
      paddingLeft: "20px",
      paddingBottom: inputValuePaddingBottom ? inputValuePaddingBottom : "",
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
      height: containerHeight ? containerHeight : "",
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
      zIndex: "30",
    }),
    option: (styles, state) => ({
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

  return (
    <div className="flex flex-col">
      <div
        className={cn("flex flex-col gap-y-2.5 relative", {
          "mb-2.5": description,
        })}
      >
        <InputLabelBase
          ref={inputLabelRef}
          label={label}
          message={additionalMessageOnLabel}
          labelWidth={inputLabelWidth}
          answered={answered}
          focus={focus}
          setFocus={setFocus}
          required={required}
          htmlFor={id}
          type={inputLabelType}
          labelFontFamily={labelFontFamily}
          labelFontSize={labelFontSize}
          labelFontWeight={labelFontWeight}
          labelLineHeight={labelLineHeight}
          labelTextColor={labelTextColor}
          labelActivateStyle={labelActivateStyle}
          labelDeActivateStyle={labelDeActivateStyle}
          error={error}
          errorLabelFontFamily={errorLabelFontFamily}
          errorLabelFontSize={errorLabelFontSize}
          errorLabelFontWeight={errorLabelFontWeight}
          errorLabelLineHeight={errorLabelLineHeight}
          errorLabelTextColor={errorLabelTextColor}
        />
        <div ref={inputRef}>
          <ReactSelect
            id={id}
            value={value}
            ref={selectRef}
            instanceId={instanceId}
            openMenuOnFocus={true}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            menuPlacement={menuPlacement ? menuPlacement : "auto"}
            options={options}
            onChange={(selectedOption) => {
              onChangeInput(
                id,
                selectedOption as SingleValue<SingleSelectOption>
              );

              if (selectedOption) {
                setAnswered(true);
              } else {
                setAnswered(false);
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
                <div className="flex flex-row gap-x-3 px-[15px]">
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
