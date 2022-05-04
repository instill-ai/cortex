import { FC } from "react";
import ProgressMessageBoxBase, {
  ProgressMessageBoxBaseProps,
} from "../ProgressMessageBoxBase";

export type BasicProgressMessageBoxProps = Omit<
  ProgressMessageBoxBaseProps,
  | "errorIconColor"
  | "errorIconWidth"
  | "errorIconHeight"
  | "successIconColor"
  | "successIconWidth"
  | "successIconHeight"
  | "IconPosition"
  | "IndicatorColumnWidth"
  | "messageColumnBgColor"
  | "progressBlockSize"
>;

const BasicProgressMessageBox: FC<BasicProgressMessageBoxProps> = (props) => {
  return (
    <ProgressMessageBoxBase
      status={props.status}
      width={props.width}
      IndicatorColumnBgColor={props.IndicatorColumnBgColor}
      errorIconColor="fill-instillRed"
      errorIconWidth="w-7"
      errorIconHeight="h-7"
      successIconColor="fill-instillGreen"
      successIconWidth="w-7"
      successIconHeight="h-7"
      IconPosition="mx-auto mb-auto"
      IndicatorColumnWidth="w-12"
      messageColumnBgColor="bg-white"
      progressBlockSize={28}
    >
      {props.children}
    </ProgressMessageBoxBase>
  );
};

export default BasicProgressMessageBox;
