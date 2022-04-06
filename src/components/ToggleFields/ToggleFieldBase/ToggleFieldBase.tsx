import { FC, useState } from "react";
import cn from "clsx";
import { BasicInputFieldAttributes } from "../../../types/general";
import InputLabel from "../../InputLabel";

export type ToggleFieldBaseProps = Omit<
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
>;

const ToggleFieldBase: FC<ToggleFieldBaseProps> = ({
  id,
  disabled,
  disabledBgColor,
  readOnly,
  readOnlyBgColor,
  focusHighlight,
  required,
  onChangeInput,
  labelName,
}) => {
  const [answered, setAnswered] = useState(false);
  return (
    <label
      className={cn("flex flex-col cursor-pointer gap-y-2.5", focusHighlight)}
      htmlFor={id}
    >
      <InputLabel
        type="normal"
        answered={answered}
        required={required}
        htmlFor={id}
        fontStyle="font-normal text-sm leading-[18.2px]"
        activateStyle="top-0 translate-y-3"
        deActivateStyle="top-0 translate-y-[26px]"
      >
        {labelName}
      </InputLabel>
      <div className="flex flex-col relative">
        <input
          id={id}
          className={cn(
            "peer appearance-none cursor-pointer w-[90px] h-10 border border-intstillGrey15 checked:border-instillBlue30",
            focusHighlight
              ? "instill-input-highlight"
              : "instill-input-no-highlight"
          )}
          type="checkbox"
          role="switch"
          onChange={(event) => {
            onChangeInput(event.target.value);
            if (!answered) {
              setAnswered(true);
            }
          }}
        />
        <div className="absolute left-[5px] top-[5px] bg-instillGray30 w-[30px] h-[30px] origin-top-left transition peer-checked:translate-x-[50px] peer-checked:bg-instillBlue30" />
      </div>
    </label>
  );
};

export default ToggleFieldBase;
