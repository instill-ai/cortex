export type IconBaseProps = {
  viewBox: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.SVGProps<SVGSVGElement>, "color" | "height" | "width">;

export const IconBase = (props: IconBaseProps) => {
  const { children, viewBox, className, ...passThrough } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
    >
      {children}
    </svg>
  );
};
