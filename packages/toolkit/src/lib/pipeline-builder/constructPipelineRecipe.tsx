import { Edge, Node } from "reactflow";
import { ConnectorNodeData } from "../type";

export function constructPipelineRecipe(
  nodes: Node<ConnectorNodeData>[],
  edges: Edge[]
) {
  return {
    version: "v1alpha",
    components: nodes.map((node) => {
      const connections = edges.filter((edge) => edge.target === node.id);

      /*
        The structure of the edge will be somethink like this:

        {
          id: "edge-1",
          source: "node-1",
          sourceHandle: "node-1.images",
          target: "node-2",
          targetHandle: "node-2.metadata",
        }

        This will construct the following recipe:

        {
          components: [
            {
              id: "node-1",
              dependencies: {
                texts: "[]",
                images: "[]",
                metadata: "{}",
                structured_data: "{}"
              }
            },
            {
              id: "node-2",
              dependencies: {
                texts: "[]",
                images: "[]",
                metadata: "{**node-1.images}",
                structured_data: "{}"
              }
            }
          ]
        }
      */

      return {
        id: node.id,
        resource_name: node.data.connector.name,
        dependencies: {
          texts: `[${connections
            .filter(
              (connection) => connection.targetHandle?.split(".")[1] === "texts"
            )
            .map((edge) => `*${edge.sourceHandle}`)
            .join(",")}]`,
          images: `[${connections
            .filter(
              (connection) =>
                connection.targetHandle?.split(".")[1] === "images"
            )
            .map((edge) => `*${edge.sourceHandle}}`)
            .join(",")}]`,
          structured_data: `{${connections
            .filter(
              (connection) =>
                connection.targetHandle?.split(".")[1] === "structured_data"
            )
            .map((edge) => `**${edge.sourceHandle}`)
            .join(",")}}`,
          metadata: `{${connections
            .filter(
              (connection) =>
                connection.targetHandle?.split(".")[1] === "metadata"
            )
            .map((edge) => `**${edge.sourceHandle}`)
            .join(",")}}`,
        },
      };
    }),
  };
}
