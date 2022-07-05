import React from "react";
import InputDescriptionBase, {
  InputDescriptionBaseProps,
} from "../InputDescriptionBase";

export type BasicInputDescriptionProps = Omit<
  InputDescriptionBaseProps,
  BasicInputDescriptionOmitProps
>;

export type BasicInputDescriptionConfig = Pick<
  InputDescriptionBaseProps,
  BasicInputDescriptionOmitProps
>;

export type BasicInputDescriptionOmitProps =
  | "descriptionFontFamily"
  | "descriptionFontSize"
  | "descriptionLineHeight"
  | "descriptionFontWeight"
  | "descriptionTextColor"
  | "descriptionLinkTextColor"
  | "descriptionLinkTextDecoration"
  | "descriptionWidth";

export const basicInputDescriptionConfig: BasicInputDescriptionConfig = {
  descriptionWidth: "w-full",
  descriptionFontFamily: "font-mono",
  descriptionFontSize: "text-xs",
  descriptionLineHeight: "leading-[15.6px]",
  descriptionFontWeight: "font-normal",
  descriptionTextColor: "text-instillGrey50",
  descriptionLinkTextColor: "text-instillBlue50",
  descriptionLinkTextDecoration: "underline",
};

const BasicInputDescription: React.FC<BasicInputDescriptionProps> = (props) => {
  return (
    <InputDescriptionBase
      description={props.description}
      {...basicInputDescriptionConfig}
    />
  );
};

export default BasicInputDescription;
