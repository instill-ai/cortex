import { FC } from "react";

export const StoryGroup: FC = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};
