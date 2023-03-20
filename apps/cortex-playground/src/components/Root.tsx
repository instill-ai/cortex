import { ReactNode } from "react";

export const Root = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      {children}
    </div>
  );
};
