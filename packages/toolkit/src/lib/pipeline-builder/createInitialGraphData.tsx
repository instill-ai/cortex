import { Edge, Node } from "reactflow";
import { parseDependencyComponents } from "./parseDependencyComponents";
import { PipelineComponent, PipelineState } from "../vdp-sdk";
import {
  ConnectorNodeData,
  ConnectorWithWatchState,
  PipelineWithWatchState,
} from "../type";

export type CreateInitialGraphDataProps = {
  pipeline: PipelineWithWatchState;
  ais: ConnectorWithWatchState[];
  sources: ConnectorWithWatchState[];
  destinations: ConnectorWithWatchState[];
  blockchains: ConnectorWithWatchState[];
};

export function createInitialGraphData(props: CreateInitialGraphDataProps) {
  const { pipeline, ais, sources, destinations, blockchains } = props;

  const nodes: Node<ConnectorNodeData>[] = [];
  const edges: Edge[] = [];

  for (const component of pipeline.recipe.components) {
    switch (component.type) {
      case "CONNECTOR_TYPE_OPERATOR": {
        const target = sources.find(
          (source) => source.name === component.resource_name
        );

        if (target) {
          nodes.push({
            id: component.id,
            type: "sourceNode",
            data: {
              connectorType: "CONNECTOR_TYPE_OPERATOR",
              connector: target,
            },
            position: { x: 0, y: 0 },
          });
        }

        const componentEdges = composeEdgesFromDependency(
          component.dependencies,
          component.id,
          pipeline.watchState
        );

        edges.push(...componentEdges);
        break;
      }
      case "CONNECTOR_TYPE_DESTINATION": {
        const target = destinations.find(
          (destination) => destination.name === component.resource_name
        );
        if (target) {
          nodes.push({
            id: component.id,
            type: "destinationNode",
            data: {
              connectorType: "CONNECTOR_TYPE_DESTINATION",
              connector: target,
            },
            position: { x: 0, y: 0 },
          });
        }

        const componentEdges = composeEdgesFromDependency(
          component.dependencies,
          component.id,
          pipeline.watchState
        );

        edges.push(...componentEdges);
        break;
      }
      case "CONNECTOR_TYPE_BLOCKCHAIN": {
        const target = blockchains.find(
          (blockchain) => blockchain.name === component.resource_name
        );

        if (target) {
          nodes.push({
            id: component.id,
            type: "blockchainNode",
            data: {
              connectorType: "CONNECTOR_TYPE_BLOCKCHAIN",
              connector: target,
            },
            position: { x: 0, y: 0 },
          });
        }

        const componentEdges = composeEdgesFromDependency(
          component.dependencies,
          component.id,
          pipeline.watchState
        );

        edges.push(...componentEdges);
        break;
      }
      case "CONNECTOR_TYPE_AI": {
        const target = ais.find((ai) => ai.name === component.resource_name);

        if (target) {
          nodes.push({
            id: component.id,
            type: "aiNode",
            data: {
              connectorType: "CONNECTOR_TYPE_AI",
              connector: target,
            },
            position: { x: 0, y: 0 },
          });
        }

        const componentEdges = composeEdgesFromDependency(
          component.dependencies,
          component.id,
          pipeline.watchState
        );

        edges.push(...componentEdges);
        break;
      }
      default:
        console.error(`Unknown component type: ${component.type}`);
    }
  }

  return {
    nodes,
    edges,
  };
}

function composeEdgesFromDependency(
  dependencies: PipelineComponent["dependencies"],
  componentId: string,
  pipelineWatchState: PipelineState
) {
  const edges: Edge[] = [];

  const textComponents = parseDependencyComponents(dependencies.texts);

  for (const dependentComponent of textComponents) {
    edges.push({
      id: `${dependentComponent}-${componentId}.texts`,
      type: "customEdge",
      source: dependentComponent.split(".")[0],
      sourceHandle: dependentComponent,
      target: componentId,
      targetHandle: `${componentId}.texts`,
      animated: pipelineWatchState === "STATE_ACTIVE" ? true : false,
    });
  }

  const imageComponents = parseDependencyComponents(dependencies.images);

  for (const dependentComponent of imageComponents) {
    edges.push({
      id: `${dependentComponent}-${componentId}.images`,
      type: "customEdge",
      source: dependentComponent.split(".")[0],
      sourceHandle: dependentComponent,
      target: componentId,
      targetHandle: `${componentId}.images`,
      animated: pipelineWatchState === "STATE_ACTIVE" ? true : false,
    });
  }

  const metadataComponent = parseDependencyComponents(dependencies.metadata);

  for (const dependentComponent of metadataComponent) {
    edges.push({
      id: `${dependentComponent}-${componentId}.metadata`,
      type: "customEdge",
      source: dependentComponent.split(".")[0],
      sourceHandle: dependentComponent,
      target: componentId,
      targetHandle: `${componentId}.metadata`,
      animated: pipelineWatchState === "STATE_ACTIVE" ? true : false,
    });
  }

  const structuredDataComponent = parseDependencyComponents(
    dependencies.structured_data
  );

  for (const dependentComponent of structuredDataComponent) {
    edges.push({
      id: `${dependentComponent}-${componentId}.structured_data`,
      type: "customEdge",
      source: dependentComponent.split(".")[0],
      sourceHandle: dependentComponent,
      target: componentId,
      targetHandle: `${componentId}.structured_data`,
      animated: pipelineWatchState === "STATE_ACTIVE" ? true : false,
    });
  }

  return edges;
}
