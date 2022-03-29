import { FC } from "react";

export const StoryGroup: FC = ({ children }) => {
  return <div className="grid grid-cols-1 gap-y-4">{children}</div>;
};
