import { FC } from "react";
import InputDescriptionBase, {
  InputDescriptionBaseProps,
} from "../InputDescriptionBase";

export type BasicInputDescriptionProps = Omit<
  InputDescriptionBaseProps,
  | "descriptionFontFamily"
  | "descriptionFontSize"
  | "descriptionLineHeight"
  | "descriptionFontWeight"
  | "descriptionTextColor"
>;

const BasicInputDescription: FC<BasicInputDescriptionProps> = (props) => {
  return (
    <InputDescriptionBase
      description={props.description}
      descriptionFontFamily="font-mono"
      descriptionFontSize="text-xs"
      descriptionLineHeight="leading-[15.6px]"
      descriptionFontWeight="font-normal"
      descriptionTextColor="text-instillGrey50"
    />
  );
};

export default BasicInputDescription;
