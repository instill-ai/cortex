import { IconBase, IconBaseProps } from "./IconBase";

export const ChevronUp = (
  props: Omit<IconBaseProps, "viewBox" | "children">
) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase viewBox="0 0 24 24" className={className} {...passThrough}>
      <path
        d="M18 15L12 9L6 15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};
