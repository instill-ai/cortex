import { NodeProps } from "reactflow";

import { CustomNode } from "./CustomNode";
import { ConnectorNodeData, usePipelineBuilderStore } from "../../../lib";

export const BlockchainNode = ({ data, id }: NodeProps<ConnectorNodeData>) => {
  const selectedNode = usePipelineBuilderStore((state) => state.selectedNode);

  return (
    <CustomNode.Root
      nodeId={id}
      selectedId={selectedNode ? selectedNode.id : null}
      watchState={data.connector.watchState}
      connectorDefinitionName={data.connector.connector_definition_name}
    >
      <CustomNode.NameRow
        name={data.connector.name.split("/")[1]}
        definition={data.connector.connector_definition}
      />
    </CustomNode.Root>
  );
};
