import React from "react";
import cn from "clsx";
import TextWithHtml from "../../TextWithHtml";

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

  /**
   * TailwindCSS format - Description's width
   * - e.g. w-full
   */
  descriptionWidth: string;

  /**
   * TailwindCSS format - Description can have html <a> tag, this imply the color of the <a>
   * - e.g. text-blue
   */
  descriptionLinkTextColor: string;

  /**
   * TailwindCSS format - Description can have html <a> tag, this imply the text decoration of the <a>
   * - e.g. underline
   */
  descriptionLinkTextDecoration: string;
}

const InputDescriptionBase: React.FC<InputDescriptionBaseProps> = ({
  description,
  descriptionWidth,
  descriptionFontFamily,
  descriptionFontSize,
  descriptionFontWeight,
  descriptionLineHeight,
  descriptionTextColor,
  descriptionLinkTextColor,
  descriptionLinkTextDecoration,
}) => {
  return (
    <TextWithHtml
      text={description}
      width={descriptionWidth}
      fontFamily={descriptionFontFamily}
      fontSize={descriptionFontSize}
      fontWeight={descriptionFontWeight}
      lineHeight={descriptionLineHeight}
      textColor={descriptionTextColor}
      linkFontFamily={descriptionFontFamily}
      linkFontSize={descriptionFontSize}
      linkFontWeight={descriptionFontWeight}
      linkLineHeight={descriptionLineHeight}
      linkTextColor={descriptionLinkTextColor}
      linkTextDecoration={descriptionLinkTextDecoration}
    />
  );
};

export default InputDescriptionBase;
