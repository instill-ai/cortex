import { useRef } from "react";

export const useRenderCounter = (componentName: string) => {
  const counts = useRef(0);
  counts.current += 1;

  return (
    <div
      style={{
        backgroundColor: "lime",
        color: "black",
        padding: "10px",
        borderRadius: "4px",
      }}
    >
      {componentName}
      {counts.current}
    </div>
  );
};
