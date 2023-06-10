import { IconBase, IconBaseProps } from "./IconBase";

export const Plus = (props: Omit<IconBaseProps, "viewBox" | "children">) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase viewBox="0 0 24 24" className={className} {...passThrough}>
      <path
        d="M12 5V19M5 12H19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};
