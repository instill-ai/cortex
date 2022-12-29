import React from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type LinkedInIconProps = Omit<IconBaseProps, "viewBox" | "fill">;

const LinkedInIcon: React.FC<LinkedInIconProps> = (props) => {
  const { width, height, position, style, color } = props;
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={width}
      height={height}
      color={color}
      position={position}
      style={style}
    >
      <path d="M4 5.57594C4 4.70581 4.72327 4 5.61551 4H24.3845C25.2767 4 26 4.70581 26 5.57594V24.4241C26 25.2945 25.2767 26 24.3845 26L5.61551 26C4.72327 26 4 25.2945 4 24.4241V5.57594ZM10.7971 22.4163V12.482H7.49519V22.4163H10.7971ZM9.14615 11.1257C10.2976 11.1257 11.0143 10.3629 11.0143 9.40953C10.9928 8.43474 10.2976 7.69307 9.168 7.69307C8.0385 7.69307 7.3 8.43474 7.3 9.40953C7.3 10.3629 8.01653 11.1257 9.12463 11.1257H9.14615ZM15.8957 22.4163V16.8686C15.8957 16.5717 15.9171 16.2751 16.0043 16.0628C16.243 15.4696 16.7863 14.8552 17.6985 14.8552C18.8933 14.8552 19.3713 15.7662 19.3713 17.1017V22.4163H22.6729V16.7201C22.6729 13.6688 21.0439 12.2489 18.8715 12.2489C17.1199 12.2489 16.3346 13.2116 15.8958 13.8885V13.9228H15.8737C15.881 13.9114 15.8883 13.9 15.8958 13.8885V12.482H12.5938C12.6372 13.4142 12.5938 22.4163 12.5938 22.4163H15.8957Z" />
    </IconBase>
  );
};

export default LinkedInIcon;
