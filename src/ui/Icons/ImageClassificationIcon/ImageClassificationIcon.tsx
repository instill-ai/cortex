import React from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type ImageClassificationIconProps = Omit<
  IconBaseProps,
  "viewBox" | "fill"
>;

const ImageClassificationIcon: React.FC<ImageClassificationIconProps> = (
  props
) => {
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
        d="M15.0001 8.33527C11.8787 8.33527 9.07405 9.98085 7.06735 11.598C6.06066 12.4092 5.24658 13.22 4.68403 13.8279C4.40261 14.1321 4.18377 14.3859 4.03488 14.5641C3.96042 14.6533 3.90343 14.7236 3.86482 14.7719C3.84551 14.7961 3.8308 14.8147 3.8208 14.8275L3.80934 14.8422L3.80628 14.8462L3.80517 14.8476L3.6882 15L3.80543 15.1528L3.80628 15.1539L3.80934 15.1578L3.8208 15.1725C3.8308 15.1853 3.84551 15.204 3.86482 15.2281C3.90343 15.2765 3.96042 15.3468 4.03488 15.4359C4.18377 15.6142 4.40261 15.868 4.68403 16.1721C5.24658 16.7801 6.06066 17.5908 7.06735 18.4021C9.07405 20.0192 11.8787 21.6648 15.0001 21.6648C18.1214 21.6648 20.9261 20.0192 22.9328 18.4021C23.9395 17.5908 24.7536 16.7801 25.3161 16.1721C25.5976 15.868 25.8164 15.6142 25.9653 15.4359C26.0397 15.3468 26.0967 15.2765 26.1354 15.2281C26.1547 15.204 26.1694 15.1853 26.1794 15.1725L26.1908 15.1578L26.1939 15.1539L26.195 15.1524L26.312 15L26.1947 14.8473L26.1939 14.8462L26.1908 14.8422L26.1794 14.8275C26.1694 14.8147 26.1547 14.7961 26.1354 14.7719C26.0967 14.7236 26.0397 14.6533 25.9653 14.5641C25.8164 14.3859 25.5976 14.1321 25.3161 13.8279C24.7536 13.22 23.9395 12.4092 22.9328 11.598C20.9261 9.98085 18.1214 8.33527 15.0001 8.33527ZM25.9968 15C26.1951 15.1522 26.1951 15.1523 26.195 15.1524L25.9968 15ZM26.1947 14.8473C26.1948 14.8474 26.1951 14.8478 25.9968 15L26.1947 14.8473ZM4.00335 15C3.80503 14.8478 3.80509 14.8477 3.80517 14.8476L4.00335 15ZM3.80543 15.1528C3.80535 15.1527 3.80503 15.1522 4.00335 15L3.80543 15.1528ZM8.04419 12.8102C8.90855 12.1136 9.88984 11.446 10.9478 10.9256C9.90047 11.9667 9.25192 13.4087 9.25192 15.0024C9.25192 16.5913 9.89656 18.0294 10.9383 19.0698C9.88395 18.55 8.90594 17.8844 8.04419 17.1899C7.11021 16.4372 6.35137 15.6818 5.82669 15.1148C5.79039 15.0756 5.75525 15.0373 5.72129 15C5.75525 14.9628 5.79039 14.9245 5.82669 14.8852C6.35137 14.3182 7.11021 13.5628 8.04419 12.8102ZM20.7487 15.0024C20.7487 13.4089 20.1003 11.967 19.0532 10.926C20.1108 11.4464 21.0918 12.1138 21.956 12.8102C22.89 13.5628 23.6488 14.3182 24.1735 14.8852C24.2098 14.9245 24.2449 14.9627 24.2789 15C24.2449 15.0373 24.2098 15.0756 24.1735 15.1148C23.6488 15.6818 22.89 16.4372 21.956 17.1899C21.0945 17.8842 20.1167 18.5497 19.0627 19.0694C20.1042 18.0291 20.7487 16.5911 20.7487 15.0024ZM10.8087 15.0024C10.8087 12.6875 12.6853 10.8108 15.0003 10.8108C17.3152 10.8108 19.1919 12.6875 19.1919 15.0024C19.1919 17.3174 17.3152 19.194 15.0003 19.194C12.6853 19.194 10.8087 17.3174 10.8087 15.0024Z"
      />
    </IconBase>
  );
};

export default ImageClassificationIcon;
