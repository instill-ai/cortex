import cn from "clsx";
import { EdgeProps, getBezierPath } from "reactflow";

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className={cn("fill-none stroke-semantic-accent-default stroke-[4px]")}
        strokeDasharray={12}
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};
