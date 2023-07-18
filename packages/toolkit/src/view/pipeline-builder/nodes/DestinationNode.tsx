import { NodeProps } from "reactflow";

import { CustomNode } from "./CustomNode";
import { ConnectorNodeData, usePipelineBuilderStore } from "../../../lib";

export const DestinationNode = (props: NodeProps<ConnectorNodeData>) => {
  const { data, id } = props;
  const selectedNode = usePipelineBuilderStore((state) => state.selectedNode);

  return (
    <CustomNode.Root
      nodeId={id}
      watchState={data.connector.watchState}
      selectedId={selectedNode ? selectedNode.id : null}
      connectorDefinitionName={data.connector.connector_definition_name}
    >
      <CustomNode.NameRow
        name={data.connector.name.split("/")[1]}
        definition={data.connector.connector_definition}
      />
    </CustomNode.Root>
  );
};
