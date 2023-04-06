export const FormVerticalDivider = () => {
  return (
    <div className="relative flex mx-5 h-full w-6">
      <p className="text-instill-h3 absolute top-5 z-10 bg-instillGrey05">OR</p>
      <svg
        className="h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 6 100"
        preserveAspectRatio="none"
      >
        <line
          x1="3"
          y1="0"
          x2="3"
          y2="100"
          className="stroke-instillGrey20 stroke-1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};
