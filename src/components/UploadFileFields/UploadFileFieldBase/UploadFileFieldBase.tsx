import { FC, useState } from "react";
import { BasicInputFieldAttributes } from "../../../types/general";
import cn from "clsx";
import InputLabel from "../../InputLabel";

export type UploadFileFieldBaseProps = Omit<
  BasicInputFieldAttributes,
  | "autoComplete"
  | "disabledBgColor"
  | "readOnlyBgColor"
  | "bgColor"
  | "borderRadius"
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

  /** TailwindCSS format
   * - e.g. rounded-tr-[1px]
   */
  borderRadiusTopRight: string;

  /** TailwindCSS format
   * - e.g. rounded-br-[1px]
   */
  borderRadiusBottomRight: string;

  /** TailwindCSS format
   * - e.g. rounded-tl-[1px]
   */
  borderRadiusTopLeft: string;

  /** TailwindCSS format
   * - e.g. rounded-bl-[1px]
   */
  borderRadiusBottomLeft: string;
};

const UploadFileFieldBase: FC<UploadFileFieldBaseProps> = ({
  id,
  labelName,
  inputLabelType,
  required,
  inputWidth,
  inputHeight,
  uploadButtonText,
  uploadButtonBgColor,
  uploadButtonTextColor,
  borderRadiusTopRight,
  borderRadiusBottomRight,
  borderRadiusTopLeft,
  borderRadiusBottomLeft,
  inputFontSize,
  inputFontWeight,
  inputLineHeight,
  inputTextColor,
  onChangeInput,
  error,
}) => {
  const [answered, setAnswered] = useState(false);
  const [file, setFile] = useState<string>("");
  return (
    <div className="relative flex flex-col gap-y-2.5 group">
      <InputLabel
        type={inputLabelType}
        answered={answered}
        required={required}
        htmlFor={`${id}-label`}
        fontStyle="font-normal text-sm leading-[18.2px]"
        activateStyle="top-0 translate-y-3"
        deActivateStyle="top-0 translate-y-[26px]"
      >
        {labelName}
      </InputLabel>
      <label
        className={cn(
          "flex flex-row border border-instillGray15 p-0 cursor-pointer",
          inputWidth,
          inputHeight,
          borderRadiusBottomLeft,
          borderRadiusBottomRight,
          borderRadiusTopLeft,
          borderRadiusTopRight
        )}
        htmlFor={id}
      >
        <div
          className={cn(
            "mr-auto pl-5",
            inputFontSize,
            inputLineHeight,
            inputFontWeight,
            inputTextColor,
            inputLabelType === "inset" ? "pt-[30px]" : "my-auto"
          )}
        >
          {file ? file.split("\\").slice(-1)[0] : ""}
        </div>
        <input
          className={cn(
            "opacity-0 overflow-hidden absolute z-10 cursor-pointer",
            inputHeight,
            inputWidth
          )}
          aria-label={`${id}-label`}
          id={id}
          type="file"
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
        />
        <div
          className={cn(
            "flex bg-instillGray50 h-full ml-auto px-5 group-hover:bg-instillGray30",
            answered ? "absolute top-0 right-0 z-10" : "",
            uploadButtonBgColor,
            uploadButtonTextColor,
            borderRadiusTopRight,
            borderRadiusBottomRight
          )}
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
