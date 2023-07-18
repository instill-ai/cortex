import cn from "clsx";
import * as React from "react";
import { Handle, Position } from "reactflow";

import { Icons } from "@instill-ai/design-system";
import {
  ConnectorDefinition,
  ConnectorState,
  Nullable,
  usePipelineBuilderStore,
} from "../../../lib";
import { ImageWithFallback } from "../../../components";
import "./CustomNode.css";

export type CustomNodeProps = {
  children: React.ReactNode;
  className?: string;
  nodeId: string;
  selectedId: Nullable<string>;
  watchState: ConnectorState;
  connectorDefinitionName: string;
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
  const {
    className,
    nodeId,
    selectedId,
    children,
    watchState,
    connectorDefinitionName,
    ...customNodeProps
  } = props;

  const edges = usePipelineBuilderStore((state) => state.edges);

  return (
    <CustomNodeContext.Provider value={{ nodeId, watchState }}>
      <div
        ref={ref}
        className={cn(
          "instill-custom-node group z-30 border-4 box-border transition-colors duration-500 flex w-[400px] flex-col rounded-sm",
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
              watchState === "STATE_DISCONNECTED" ||
              watchState === "STATE_UNSPECIFIED",
          },
          {
            "ring-4 ring-offset-2 ring-semantic-accent-default":
              selectedId === nodeId,
          },
          className
        )}
        {...customNodeProps}
      >
        {/* 
          Top color bar of the node
        */}
        <div
          className={cn(
            "h-4 shrink-0 w-full rounded-tl rounded-tr transition-colors duration-500",
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
                watchState === "STATE_DISCONNECTED" ||
                watchState === "STATE_UNSPECIFIED",
            }
          )}
        />
        <div>{children}</div>
        <div className="flex flex-col">
          {/* 

            Multiple handlers of the node. 

            - Style wise we male the size of it be 12px and exclude the border 
            width out of the node using box-content.
          
            - About the logic. We give each handler an ID, when we connect the 
            handler to another handler, under the hood reactflow will record it
            using sourceHandler and targetHandler.

            For example, if we connect node-1.texts to node-2.texts, the edge
            will be recorded as:

            {
              id: "edge-1",
              source: "node-1",
              sourceHandle: "node-1.texts",
              target: "node-2",
              targetHandle: "node-2.texts",
            }
          
          */}
          {["texts", "images", "metadata", "structured_data"].map((e) => (
            <div
              key={`${nodeId}-${e}`}
              className="flex px-2 flex-row py-4 odd:bg-semantic-bg-base-bg even:bg-semantic-secondary-bg last:rounded-br-sm last:rounded-bl-sm"
            >
              {connectorDefinitionName === "connector-definitions/trigger" ? (
                <div className="w-3 h-3 shrink-0" />
              ) : (
                <Handle
                  className={cn(
                    "!relative !my-auto !top-none !left-none !transform-none !w-3 !h-3 !border !box-content !border-semantic-bg-line",
                    edges.some((edge) => edge.targetHandle === `${nodeId}.${e}`)
                      ? "!bg-[#595959]"
                      : "!bg-[#94A0B8]"
                  )}
                  type="target"
                  position={Position.Left}
                  id={`${nodeId}.${e}`}
                />
              )}

              <div className="flex flex-1 justify-center items-center">{e}</div>

              {connectorDefinitionName === "connector-definitions/response" ? (
                <div className="w-3 h-3 shrink-0" />
              ) : (
                <Handle
                  className={cn(
                    "!relative !my-auto !top-none !left-none !transform-none !w-3 !h-3 !border !box-content !border-semantic-bg-line",
                    edges.some((edge) => edge.sourceHandle === `${nodeId}.${e}`)
                      ? "!bg-[#595959]"
                      : "!bg-[#94A0B8]"
                  )}
                  type="source"
                  position={Position.Right}
                  id={`${nodeId}.${e}`}
                />
              )}
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
        "flex flex-col pt-2 pb-4 px-2.5 transition-colors duration-500",
        {
          "bg-semantic-node-connected-bg": watchState === "STATE_CONNECTED",
        },
        {
          "bg-semantic-node-error-bg": watchState === "STATE_ERROR",
        },
        {
          "bg-semantic-node-disconnected-bg":
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
