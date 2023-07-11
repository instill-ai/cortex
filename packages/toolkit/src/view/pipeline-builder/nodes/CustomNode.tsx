import cn from "clsx";
import * as React from "react";
import { Handle, Position } from "reactflow";

import { Icons, getModelInstanceTaskToolkit } from "@instill-ai/design-system";
import {
  ConnectorDefinition,
  ConnectorState,
  ModelState,
  ModelTask,
} from "../../../lib";
import { ImageWithFallback } from "../../../components";
import "./CustomNode.css";

import "./CustomNode.css";

export type CustomNodeProps = {
  children: React.ReactNode;
  className?: string;
};

export const Root = React.forwardRef<
  HTMLDivElement,
  CustomNodeProps & React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, children, ...customNodeProps } = props;

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "instill-custom-node group relative z-30 box-border flex w-[343px] flex-col rounded-[12px]",
          className
        )}
        {...customNodeProps}
      >
        <div>{children}</div>
      </div>
      <div className="flex flex-col">
        {["images", "texts"].map((e) => (
          <div className="flex flex-row">
            <Handle
              className="!relative !top-none !left-none !transform-none !w-4 !h-4 !border-semantic-bg-line !bg-semantic-fg-secondary"
              type="target"
              position={Position.Left}
              id={e}
            />
            <div className="flex flex-1 justify-center items-center">{e}</div>
            <Handle
              className="!relative !top-none !left-none !transform-none !w-4 !h-4 !border-semantic-bg-line !bg-semantic-fg-secondary"
              type="source"
              position={Position.Right}
              id={e}
            />
          </div>
        ))}
      </div>
    </>
  );
});
Root.displayName = "CustomNodeRoot";

const NameRow = (props: { name: string; icon: React.ReactElement }) => {
  return (
    <div className="flex rounded-tl-[12px] rounded-tr-[12px] bg-semantic-bg-secondary p-4 transition-colors duration-500 group-hover:bg-semantic-bg-line">
      <div className="flex w-full flex-row space-x-2">
        <div className="flex min-w-[20px] min-h-[20px] items-center justify-center">
          {props.icon}
        </div>
        <p className="text-semantic-fg-primary line-clamp-2 product-body-text-2-semibold">
          {props.name}
        </p>
      </div>
    </div>
  );
};

const ConnectorDefinitionRow = (props: { definition: ConnectorDefinition }) => {
  const { definition } = props;
  let fallbackImage: React.ReactElement;

  switch (definition.connector_type) {
    case "CONNECTOR_TYPE_AI": {
      fallbackImage = (
        <Icons.Model className="h-4 w-4 stroke-semantic-fg-primary" />
      );
      break;
    }
    case "CONNECTOR_TYPE_BLOCKCHAIN": {
      fallbackImage = (
        <Icons.CubeOutline className="h-4 w-4 stroke-semantic-fg-primary" />
      );
      break;
    }
    case "CONNECTOR_TYPE_DESTINATION": {
      fallbackImage = (
        <Icons.Database01 className="h-4 w-4 stroke-semantic-fg-primary" />
      );
      break;
    }
    case "CONNECTOR_TYPE_SOURCE": {
      fallbackImage = (
        <Icons.Box className="h-4 w-4 stroke-semantic-fg-primary" />
      );
      break;
    }
    default: {
      fallbackImage = (
        <Icons.Cube01 className="h-4 w-4 stroke-semantic-fg-primary" />
      );
    }
  }

  return (
    <div className="flex h-[56px] bg-semantic-bg-primary p-4">
      <div className="flex w-full flex-row space-x-2">
        <p className="mr-auto !capitalize text-semantic-fg-primary product-body-text-3-regular">
          {definition.title}
        </p>
        <ImageWithFallback
          src={`/icons/${definition.vendor}/${definition.icon}`}
          width={30}
          height={30}
          alt={`${definition.title}-icon`}
          fallbackImg={fallbackImage}
        />
      </div>
    </div>
  );
};

const ModelTaskRow = (props: { task: ModelTask }) => {
  const toolkit = getModelInstanceTaskToolkit(props.task);
  return (
    <div className="flex h-[56px] bg-semantic-bg-primary p-4">
      <div className="flex w-full flex-row space-x-2">
        <p className="mr-auto !capitalize text-semantic-fg-primary product-body-text-3-regular">
          {toolkit.label}
        </p>
        {toolkit.getIcon({
          width: "w-4",
          height: "h-4",
          color: "fill-semantic-fg-primary",
          position: "my-auto",
        })}
      </div>
    </div>
  );
};

const StateRow = (props: { state: ModelState | ConnectorState }) => {
  const state = props.state;
  const _state =
    state === "STATE_ONLINE" || state === "STATE_CONNECTED"
      ? "connected"
      : state === "STATE_ERROR"
      ? "error"
      : "disconnected";

  return (
    <div
      className={cn(
        "flex h-[56px] rounded-bl-[12px] rounded-br-[12px] p-4 transition-colors duration-500",
        _state === "connected"
          ? "bg-semantic-success-bg group-hover:bg-[#d1faed]"
          : _state === "error"
          ? "bg-semantic-error-bg group-hover:bg-[#fec8cd]"
          : "bg-semantic-bg-secondary group-hover:bg-semantic-bg-line"
      )}
    >
      <div className="flex w-full flex-row space-x-2">
        <div
          className={cn(
            "my-auto h-2 w-2 rounded-full",
            _state === "connected"
              ? "bg-semantic-success-on-bg"
              : _state === "error"
              ? "bg-semantic-error-on-bg"
              : "bg-semantic-fg-primary"
          )}
        />
        <p
          className={cn(
            "my-auto mr-auto !uppercase product-label-label-1",
            _state === "connected"
              ? "text-semantic-success-on-bg"
              : _state === "error"
              ? "text-semantic-error-on-bg"
              : "text-semantic-fg-primary"
          )}
        >
          {_state}
        </p>
      </div>
    </div>
  );
};

export const CustomNode = {
  Root,
  NameRow,
  ConnectorDefinitionRow,
  ModelTaskRow,
  StateRow,
};
