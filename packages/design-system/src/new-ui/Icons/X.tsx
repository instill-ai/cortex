import { IconBase, IconBaseProps } from "./IconBase";

export const X = (props: Omit<IconBaseProps, "viewBox" | "children">) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase viewBox="0 0 24 24" className={className} {...passThrough}>
      <path
        d="M17 7L7 17M7 7L17 17"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};
