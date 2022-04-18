import React from "react";
import { BasicInputFieldAttributes } from "../../../types/general";
import cn from "clsx";
import { DocIcon } from "../../Icons";
import { BasicInputLabel } from "../../InputLabels";

export type UploadFileFieldBaseProps = Omit<
  BasicInputFieldAttributes,
  | "autoComplete"
  | "disabledBgColor"
  | "readOnlyBgColor"
  | "bgColor"
  | "inputBorderRadius"
  | "disabledInputBgColor"
  | "disabledInputBorderColor"
  | "disabledInputBorderStyle"
  | "disabledInputBorderWidth"
  | "disabledInputTextColor"
  | "readOnlyInputBgColor"
  | "readOnlyInputBorderColor"
  | "readOnlyInputBorderStyle"
  | "readOnlyInputBorderWidth"
  | "readOnlyInputTextColor"
  | "disabledCursor"
  | "readOnlyCursor"
  | "placeholderFontFamily"
  | "placeholderFontSize"
  | "placeholderFontWeight"
  | "placeholderLineHeight"
  | "placeholderTextColor"
> & {
  /** Text display on upload button */
  uploadButtonText: string;

  /** TailwindCSS format
   * - e.g. bg-instillGray50
   */
  uploadButtonBgColor: string;

  /** TailwindCSS format
   * - e.g. text-instillGray05
   */
  uploadButtonTextColor: string;

  /** TailwindCSS format - Input's top right border radius
   * - e.g. rounded-tr-[1px]
   */
  inputBorderRadiusTopRight: string;

  /** TailwindCSS format - Input's bottom right border radius
   * - e.g. rounded-br-[1px]
   */
  inputBorderRadiusBottomRight: string;

  /** TailwindCSS format - Input's top left border radius
   * - e.g. rounded-tl-[1px]
   */
  inputBorderRadiusTopLeft: string;

  /** TailwindCSS format - Input's bottom left border radius
   * - e.g. rounded-bl-[1px]
   */
  inputBorderRadiusBottomLeft: string;
};

const UploadFileFieldBase: React.FC<UploadFileFieldBaseProps> = ({
  id,
  labelName,
  inputLabelType,
  required,
  inputWidth,
  inputHeight,
  uploadButtonText,
  uploadButtonBgColor,
  uploadButtonTextColor,
  inputBorderRadiusTopRight,
  inputBorderRadiusBottomRight,
  inputBorderRadiusTopLeft,
  inputBorderRadiusBottomLeft,
  inputFontSize,
  inputFontWeight,
  inputLineHeight,
  inputTextColor,
  onChangeInput,
  disabled,
  readOnly,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
  error,
  focusHighlight,
}) => {
  const [answered, setAnswered] = React.useState(false);
  const [file, setFile] = React.useState<string>("");
  return (
    <div className="relative flex flex-col gap-y-2.5 group">
      <BasicInputLabel
        answered={disabled ? true : readOnly ? true : answered}
        required={required}
        htmlFor={id}
        type={inputLabelType}
      >
        {labelName}
      </BasicInputLabel>
      <label
        className={cn(
          "flex flex-row border border-instillGray15 p-0 cursor-pointer relative",
          inputWidth,
          inputHeight,
          inputBorderRadiusBottomLeft,
          inputBorderRadiusBottomRight,
          inputBorderRadiusTopLeft,
          inputBorderRadiusTopRight,
          disabled
            ? "instill-input-no-highlight border border-instillGray20 border-dashed"
            : readOnly
            ? "instill-input-no-highlight border border-instillGray20 border-solid"
            : focusHighlight
            ? cn(
                inputBorderWidth,
                inputBorderColor,
                inputBorderStyle,
                "instill-input-highlight"
              )
            : cn(
                inputBorderColor,
                inputBorderStyle,
                inputBorderWidth,
                "instill-input-no-highlight"
              )
        )}
        htmlFor={id}
      >
        <div
          className={cn(
            "flex flex-row mr-auto pl-5",
            inputLabelType === "inset" ? "pt-6" : "my-auto"
          )}
        >
          {file ? (
            <div className="flex gap-x-[5px]">
              <DocIcon
                width="w-5"
                height="h-5"
                position="my-auto"
                color={
                  disabled
                    ? "text-instillGray50"
                    : readOnly
                    ? "text-instillGray50"
                    : inputTextColor
                }
              />

              <p
                className={cn(
                  inputFontSize,
                  inputLineHeight,
                  inputFontWeight,
                  disabled
                    ? "text-instillGray50"
                    : readOnly
                    ? "text-instillGray50"
                    : inputTextColor,
                  "my-auto"
                )}
              >
                {file.split("\\").slice(-1)[0]}
              </p>
            </div>
          ) : null}
        </div>
        <input
          className={cn(
            "opacity-0 overflow-hidden absolute z-10",
            inputHeight,
            inputWidth,
            disabled
              ? "cursor-not-allowed"
              : readOnly
              ? "cursor-auto"
              : "cursor-pointer"
          )}
          aria-label={`${id}-label`}
          id={id}
          type="file"
          disabled={disabled}
          readOnly={readOnly}
          onChange={(event) => {
            const inputValue = event.target.value;
            const inputFile = event.target.files[0] || null;

            if (!inputValue) {
              setAnswered(false);
              return;
            }

            setAnswered(true);
            setFile(inputValue);

            if (inputFile) {
              onChangeInput(inputFile);
            }
          }}
          onClick={(event) => {
            if (readOnly) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }}
        />
        <div
          className={cn(
            "flex h-full ml-auto px-5",
            answered ? "absolute bottom-0 right-0 z-20" : "",
            uploadButtonBgColor,
            uploadButtonTextColor,
            inputBorderRadiusTopRight,
            inputBorderRadiusBottomRight,
            disabled
              ? "bg-instillGray20 cursor-not-allowed"
              : readOnly
              ? "bg-instillGray20 cursor-auto"
              : "bg-instillGray50 group-hover:bg-instillGray30 cursor-pointer"
          )}
          onClick={(event) => {
            if (readOnly || disabled) return;

            if (answered) {
              event.preventDefault();
              setFile(null);
              setAnswered(false);
              onChangeInput(null);
            }
          }}
        >
          <span className="m-auto">
            {answered ? "Delete" : uploadButtonText}
          </span>
        </div>
      </label>
    </div>
  );
};

export default UploadFileFieldBase;
