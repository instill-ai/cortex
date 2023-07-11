import { NodeProps } from "reactflow";
import { Icons } from "@instill-ai/design-system";

import { CustomNode } from "./CustomNode";
import { ConnectorNodeData, usePipelineBuilderStore } from "../../../lib";

export const BlockchainNode = ({ data, id }: NodeProps<ConnectorNodeData>) => {
  const selectedNode = usePipelineBuilderStore((state) => state.selectedNode);

  return (
    <CustomNode.Root
      className={
        selectedNode?.id === id
          ? "outline outline-2 outline-semantic-accent-default"
          : ""
      }
    >
      <CustomNode.NameRow
        name={data.connector.name.split("/")[1]}
        icon={
          <Icons.CubeOutline className="h-4 w-4 stroke-semantic-fg-primary" />
        }
      />
      <CustomNode.ConnectorDefinitionRow
        definition={data.connector.connector_definition}
      />
      <CustomNode.StateRow state={data.connector.watchState} />
    </CustomNode.Root>
  );
};
