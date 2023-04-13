import * as React from "react";

export const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      {children}
    </div>
  );
};
