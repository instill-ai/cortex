import { IconBase, IconBaseProps } from "./IconBase";

export const CheckCircle = (
  props: Omit<IconBaseProps, "viewBox" | "children">
) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase viewBox="0 0 24 24" className={className} {...passThrough}>
      <path
        d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};
