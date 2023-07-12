import { NodeProps } from "reactflow";

import { CustomNode } from "./CustomNode";
import { ConnectorNodeData, usePipelineBuilderStore } from "../../../lib";

export const SourceNode = ({ data, id }: NodeProps<ConnectorNodeData>) => {
  const selectedNode = usePipelineBuilderStore((state) => state.selectedNode);

  return (
    <CustomNode.Root
      className={
        selectedNode?.id === id
          ? "outline outline-2 outline-semantic-accent-default"
          : ""
      }
      nodeId={id}
      watchState={data.connector.watchState}
    >
      <CustomNode.NameRow
        name={data.connector.name.split("/")[1]}
        definition={data.connector.connector_definition}
      />
    </CustomNode.Root>
  );
};
