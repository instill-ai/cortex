import cn from "clsx";
import { Icons } from "@instill-ai/design-system";
import { PipelineBuilderStore, usePipelineBuilderStore } from "../../../lib";
import { shallow } from "zustand/shallow";

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  leftSidebarSelectedTab: state.leftSidebarSelectedTab,
  setLeftSidebarSelectedTab: state.setLeftSidebarSelectedTab,
});
export const LeftSidebar = () => {
  const { leftSidebarSelectedTab, setLeftSidebarSelectedTab } =
    usePipelineBuilderStore(pipelineBuilderSelector, shallow);

  return (
    <div className="mb-auto flex flex-col space-y-2 pt-8">
      <button
        onClick={() =>
          setLeftSidebarSelectedTab((prev) =>
            prev === "CONNECTOR_TYPE_OPERATOR" ? null : "CONNECTOR_TYPE_OPERATOR"
          )
        }
        className={cn(
          "mx-auto flex flex-col rounded-xs border border-transparent p-1 hover:bg-semantic-bg-base-bg",
          {
            "!border-semantic-accent-default border-opacity-100 bg-semantic-accent-bg hover:bg-semantic-accent-bg":
              leftSidebarSelectedTab === "CONNECTOR_TYPE_OPERATOR",
          }
        )}
      >
        <div className="flex flex-col items-center px-1">
          <div className="flex h-10 w-10 items-center justify-center">
            <Icons.Database01 className="h-6 w-6 stroke-semantic-fg-primary" />
          </div>
          <p className="font-sans text-semantic-fg-primary product-label-label-2">
            Operator
          </p>
        </div>
      </button>
      <button
        onClick={() =>
          setLeftSidebarSelectedTab((prev) =>
            prev === "CONNECTOR_TYPE_AI" ? null : "CONNECTOR_TYPE_AI"
          )
        }
        className={cn(
          "mx-auto flex flex-col rounded-xs border border-transparent p-1 hover:bg-semantic-bg-base-bg",
          {
            "!border-semantic-accent-default border-opacity-100 bg-semantic-accent-bg hover:bg-semantic-accent-bg":
              leftSidebarSelectedTab === "CONNECTOR_TYPE_AI",
          }
        )}
      >
        <div className="flex flex-col items-center px-1">
          <div className="flex h-10 w-10 items-center justify-center">
            <Icons.Model className="h-6 w-6 stroke-semantic-fg-primary" />
          </div>
          <p className="font-sans text-semantic-fg-primary product-label-label-2">
            AI
          </p>
        </div>
      </button>
      <button
        onClick={() =>
          setLeftSidebarSelectedTab((prev) =>
            prev === "CONNECTOR_TYPE_BLOCKCHAIN"
              ? null
              : "CONNECTOR_TYPE_BLOCKCHAIN"
          )
        }
        className={cn(
          "mx-auto flex flex-col rounded-xs border border-transparent p-1 hover:bg-semantic-bg-base-bg",
          {
            "!border-semantic-accent-default border-opacity-100 bg-semantic-accent-bg hover:bg-semantic-accent-bg":
              leftSidebarSelectedTab === "CONNECTOR_TYPE_BLOCKCHAIN",
          }
        )}
      >
        <div className="flex flex-col items-center px-1">
          <div className="flex h-10 w-10 items-center justify-center">
            <Icons.CubeOutline className="h-6 w-6 stroke-semantic-fg-primary" />
          </div>
          <p className="font-sans text-semantic-fg-primary product-label-label-2">
            Blockchain
          </p>
        </div>
      </button>
      <button
        onClick={() =>
          setLeftSidebarSelectedTab((prev) =>
            prev === "CONNECTOR_TYPE_DATA"
              ? null
              : "CONNECTOR_TYPE_DATA"
          )
        }
        className={cn(
          "mx-auto flex flex-col rounded-xs border border-transparent p-1 hover:bg-semantic-bg-base-bg",
          {
            "!border-semantic-accent-default border-opacity-100 bg-semantic-accent-bg hover:bg-semantic-accent-bg":
              leftSidebarSelectedTab === "CONNECTOR_TYPE_DATA",
          }
        )}
      >
        <div className="flex flex-col items-center px-1">
          <div className="flex h-10 w-10 items-center justify-center">
            <Icons.Box className="h-6 w-6 stroke-semantic-fg-primary" />
          </div>
          <p className="font-sans text-semantic-fg-primary product-label-label-2">
            Data
          </p>
        </div>
      </button>
    </div>
  );
};
