import * as React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-1">{children}</div>;
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 overflow-y-scroll bg-semantic-bg-base-bg">
      <div className="min-h-full w-full min-w-[927px] p-20">{children}</div>
    </div>
  );
};

export const PageBase = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
};

PageBase.Container = Container;
PageBase.Content = Content;
