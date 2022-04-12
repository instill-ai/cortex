import { FC } from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type FacebookIconProps = Omit<
  IconBaseProps,
  "viewBox" | "color" | "fill"
>;

const FacebookIcon: FC<FacebookIconProps> = (props) => {
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={props.width}
      height={props.height}
      position={props.position}
      fill="none"
    >
      <path
        d="M24.3 15C24.3 9.86376 20.1363 5.70001 15 5.70001C9.86375 5.70001 5.7 9.86376 5.7 15C5.7 19.6419 9.10087 23.4894 13.5469 24.187V17.6883H11.1856V15H13.5469V12.9511C13.5469 10.6203 14.9353 9.33283 17.0596 9.33283C18.0771 9.33283 19.1414 9.51447 19.1414 9.51447V11.8031H17.9687C16.8134 11.8031 16.4531 12.52 16.4531 13.2555V15H19.0324L18.6201 17.6883H16.4531V24.187C20.8991 23.4894 24.3 19.6419 24.3 15Z"
        fill="#1877F2"
      />
      <path
        d="M18.6201 17.6883L19.0324 15H16.4531V13.2555C16.4531 12.52 16.8134 11.8031 17.9687 11.8031H19.1414V9.51446C19.1414 9.51446 18.0771 9.33282 17.0596 9.33282C14.9353 9.33282 13.5469 10.6203 13.5469 12.9511V15H11.1856V17.6883H13.5469V24.187C14.0276 24.2624 14.5134 24.3001 15 24.3C15.4944 24.3 15.9796 24.2613 16.4531 24.187V17.6883H18.6201Z"
        fill="white"
      />
    </IconBase>
  );
};

export default FacebookIcon;
