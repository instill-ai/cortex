import { IconBase, IconBaseProps } from "./IconBase";

export const Sliders01 = (
  props: Omit<IconBaseProps, "viewBox" | "children">
) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase viewBox="0 0 24 24" className={className} {...passThrough}>
      <path
        d="M5 21V14M5 10V3M12 21V12M12 8V3M19 21V16M19 12V3M2 14H8M9 8H15M16 16H22"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};
