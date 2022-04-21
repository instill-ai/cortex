import { FC } from "react";
import cn from "clsx";

export interface InputDescriptionBaseProps {
  /** Description of the input */
  description: string;

  /** TailwindCSS format - Description's font size
   * - e.g. text-base
   */
  descriptionFontSize: string;

  /** TailwindCSS format - Description's font family
   * - e.g. font-sans
   */
  descriptionFontFamily: string;

  /** TailwindCSS format - Description's text color
   * - e.g. text-instillGrey50
   */
  descriptionTextColor: string;

  /** TailwindCSS format - Description's line height
   * - e.g. leading-normal
   */
  descriptionLineHeight: string;

  /** TailwindCSS format - Description's font weight
   * - e.g. font-normal
   */
  descriptionFontWeight: string;
}

const InputDescriptionBase: FC<InputDescriptionBaseProps> = ({
  description,
  descriptionFontFamily,
  descriptionFontSize,
  descriptionFontWeight,
  descriptionLineHeight,
  descriptionTextColor,
}) => {
  return (
    <p
      className={cn(
        "w-full",
        descriptionFontFamily,
        descriptionFontSize,
        descriptionFontWeight,
        descriptionLineHeight,
        descriptionTextColor
      )}
    >
      {description}
    </p>
  );
};

export default InputDescriptionBase;
