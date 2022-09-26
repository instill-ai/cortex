import React from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type GitHubIconProps = Omit<IconBaseProps, "viewBox" | "fill">;

const GitHubIcon: React.FC<GitHubIconProps> = (props) => {
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={props.width}
      height={props.height}
      color={props.color}
      position={props.position}
      style={props.style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 4C8.9225 4 4 8.8176 4 14.7656C4 19.5294 7.14875 23.553 11.5212 24.9794C12.0712 25.0736 12.2775 24.7507 12.2775 24.4681C12.2775 24.2124 12.2638 23.3646 12.2638 22.463C9.5 22.9609 8.785 21.8036 8.565 21.198C8.44125 20.8885 7.905 19.9331 7.4375 19.6774C7.0525 19.4755 6.5025 18.9776 7.42375 18.9642C8.29 18.9507 8.90875 19.7447 9.115 20.0676C10.105 21.6959 11.6863 21.2384 12.3188 20.9558C12.415 20.256 12.7037 19.785 13.02 19.5159C10.5725 19.2468 8.015 18.3182 8.015 14.2004C8.015 13.0296 8.44125 12.0607 9.1425 11.3071C9.0325 11.038 8.6475 9.93453 9.2525 8.45426C9.2525 8.45426 10.1737 8.17166 12.2775 9.55773C13.1575 9.31551 14.0925 9.19439 15.0275 9.19439C15.9625 9.19439 16.8975 9.31551 17.7775 9.55773C19.8813 8.15821 20.8025 8.45426 20.8025 8.45426C21.4075 9.93453 21.0225 11.038 20.9125 11.3071C21.6138 12.0607 22.04 13.0162 22.04 14.2004C22.04 18.3317 19.4688 19.2468 17.0213 19.5159C17.42 19.8523 17.7638 20.4983 17.7638 21.5075C17.7638 22.9474 17.75 24.1047 17.75 24.4681C17.75 24.7507 17.9563 25.0871 18.5063 24.9794C22.8512 23.553 26 19.5159 26 14.7656C26 8.8176 21.0775 4 15 4Z"
      />
    </IconBase>
  );
};

export default GitHubIcon;
