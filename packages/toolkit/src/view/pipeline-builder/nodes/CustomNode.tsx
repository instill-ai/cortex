import cn from "clsx";
import * as React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

import { Icons, getModelInstanceTaskToolkit } from "@instill-ai/design-system";
import {
  ConnectorDefinition,
  ConnectorState,
  ModelState,
  ModelTask,
  Nullable,
} from "../../../lib";
import { ImageWithFallback } from "../../../components";
import "./CustomNode.css";

import "./CustomNode.css";

export type CustomNodeProps = {
  children: React.ReactNode;
  className?: string;
  nodeId: string;
  watchState: ConnectorState;
};

type CustomNodeContextValue = {
  nodeId: string;
  watchState: ConnectorState;
};

const CustomNodeContext = React.createContext<CustomNodeContextValue>(
  {} as CustomNodeContextValue
);

export const useCustomNodeContext = () => {
  const customNodeContext = React.useContext(CustomNodeContext);

  if (!customNodeContext) {
    throw new Error(
      "useCustomNodeContext should be used within <CustomNode.Root>"
    );
  }

  const { nodeId, watchState } = customNodeContext;

  return {
    nodeId,
    watchState,
  };
};

export const Root = React.forwardRef<
  HTMLDivElement,
  CustomNodeProps & React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, nodeId, children, watchState, ...customNodeProps } = props;

  const reactflowInstance = useReactFlow();

  return (
    <CustomNodeContext.Provider value={{ nodeId, watchState }}>
      <div
        ref={ref}
        className={cn(
          "instill-custom-node group z-30 box-border flex w-[400px] flex-col rounded-sm border-4",
          {
            "border-semantic-node-connected-default-stroke hover:border-semantic-node-connected-hover-stroke":
              watchState === "STATE_CONNECTED",
          },
          {
            "border-semantic-node-error-default-stroke hover:border-semantic-node-error-hover-stroke":
              watchState === "STATE_ERROR",
          },
          {
            "border-semantic-node-disconnected-default-stroke hover:border-semantic-node-disconnected-hover-stroke":
              watchState === "STATE_DISCONNECTED",
          },
          className
        )}
        {...customNodeProps}
      >
        <div
          className={cn(
            "h-[12px] shrink-0 w-full rounded-tl-sm rounded-tr-sm",
            {
              "bg-semantic-node-connected-default-stroke group-hover:bg-semantic-node-connected-hover-stroke":
                watchState === "STATE_CONNECTED",
            },
            {
              "bg-semantic-node-error-default-stroke group-hover:bg-semantic-node-error-hover-stroke":
                watchState === "STATE_ERROR",
            },
            {
              "bg-semantic-node-disconnected-default-stroke group-hover:bg-semantic-node-disconnected-hover-stroke":
                watchState === "STATE_DISCONNECTED",
            }
          )}
        ></div>
        <div>{children}</div>
        <div className="flex flex-col">
          {["texts", "images", "metadata", "structured_data"].map((e) => (
            <div
              key={`${nodeId}-${e}`}
              className="flex flex-row py-4 odd:bg-semantic-bg-base-bg even:bg-semantic-secondary-bg"
            >
              <Handle
                className={cn(
                  "!relative !top-none !left-none !transform-none !w-4 !h-4 !border-semantic-bg-line",
                  "bg-[#94A0B8]"
                )}
                type="target"
                position={Position.Left}
                id={`${nodeId}.${e}`}
              />
              <div className="flex flex-1 justify-center items-center">{e}</div>
              <Handle
                className={cn(
                  "!relative !top-none !left-none !transform-none !w-4 !h-4 !border-semantic-bg-line",
                  "bg-[#94A0B8]"
                )}
                type="source"
                position={Position.Right}
                id={`${nodeId}.${e}`}
              />
            </div>
          ))}
        </div>
      </div>
    </CustomNodeContext.Provider>
  );
});
Root.displayName = "CustomNodeRoot";

const NameRow = (props: { name: string; definition: ConnectorDefinition }) => {
  const { name, definition } = props;
  const { watchState } = useCustomNodeContext();

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

  let stateName: Nullable<string> = null;

  switch (watchState) {
    case "STATE_CONNECTED": {
      stateName = "CONNECTED";
      break;
    }
    case "STATE_DISCONNECTED": {
      stateName = "DISCONNECTED";
      break;
    }
    case "STATE_ERROR": {
      stateName = "ERROR";
      break;
    }
    default: {
      stateName = "UNSPECIFIED";
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-semantic-bg-secondary pt-2 pb-4 px-2.5 transition-colors duration-500 group-hover:bg-semantic-bg-line",
        {
          "border-semantic-node-connected-default-stroke":
            watchState === "STATE_CONNECTED",
        },
        {
          "border-semantic-node-error-default-stroke":
            watchState === "STATE_ERROR",
        },
        {
          "border-semantic-node-disconnected-default-stroke":
            watchState === "STATE_DISCONNECTED",
        }
      )}
    >
      <div className="flex w-full flex-row space-x-2">
        <p className="my-auto w-full line-clamp-2 product-body-text-2-semibold">
          {name}
        </p>
        <div className="shrink-0 w-6 h-6 flex items-center justify-center">
          <ImageWithFallback
            src={`/icons/${definition.vendor}/${definition.icon}`}
            width={24}
            height={24}
            alt={`${definition.title}-icon`}
            fallbackImg={fallbackImage}
          />
        </div>
      </div>
      <p
        className={cn(
          "product-label-label-2",
          {
            "text-semantic-success-on-bg": watchState === "STATE_CONNECTED",
          },
          {
            "text-semantic-error-on-bg": watchState === "STATE_ERROR",
          },
          {
            "text-semantic-fg-secondary": watchState === "STATE_DISCONNECTED",
          }
        )}
      >
        {stateName}
      </p>
    </div>
  );
};

export const CustomNode = {
  Root,
  NameRow,
};
