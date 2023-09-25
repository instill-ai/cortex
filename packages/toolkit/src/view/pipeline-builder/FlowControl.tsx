import * as React from "react";
import { isAxiosError } from "axios";
import { shallow } from "zustand/shallow";
import { v4 as uuidv4 } from "uuid";

import { Button, Icons, useToast } from "@instill-ai/design-system";

import {
  constructPipelineRecipe,
  createGraphLayout,
  getBlockchainConnectorDefaultConfiguration,
  createInitialGraphData,
  getAiConnectorDefaultConfiguration,
} from "./lib";
import {
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "./usePipelineBuilderStore";
import { Node, Position, ReactFlowInstance } from "reactflow";

import {
  ReleasePipelineModal,
  PipelineToolkitModal,
  SelectConnectorResourceDialog,
} from "./components";
import { triggerPipelineSnippets } from "./components/triggerPipelineSnippets";
import {
  CreateUserPipelinePayload,
  GeneralRecord,
  InstillAppEnv,
  Nullable,
  PipelineConnectorComponent,
  UpdateUserPipelinePayload,
  env,
  getInstillApiErrorMessage,
  useCreateUserPipeline,
  useUpdateUserPipeline,
} from "../../lib";
import { StartNodeData } from "./type";
import { useRouter } from "next/router";

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  pipelineId: state.pipelineId,
  pipelineDescription: state.pipelineDescription,
  setPipelineUid: state.setPipelineUid,
  pipelineRecipeIsDirty: state.pipelineRecipeIsDirty,
  updatePipelineRecipeIsDirty: state.updatePipelineRecipeIsDirty,
  updateNodes: state.updateNodes,
  updateEdges: state.updateEdges,
  updatePipelineIsNew: state.updatePipelineIsNew,
  pipelineIsNew: state.pipelineIsNew,
  selectResourceDialogIsOpen: state.selectResourceDialogIsOpen,
  updateSelectResourceDialogIsOpen: state.updateSelectResourceDialogIsOpen,
  updateSelectedConnectorNodeId: state.updateSelectedConnectorNodeId,
  testModeEnabled: state.testModeEnabled,
  updateTestModeEnabled: state.updateTestModeEnabled,
});

export type FlowControlProps = {
  accessToken: Nullable<string>;
  enableQuery: boolean;
  reactFlowInstance: Nullable<ReactFlowInstance>;
  appEnv: InstillAppEnv;
};

/**
 * FlowControl is a component that handles the crucial action of pipeline like
 * - Save pipeline
 * - Activate pipeline
 * - Deactivate pipeline
 */

export const FlowControl = (props: FlowControlProps) => {
  const { accessToken, enableQuery, reactFlowInstance, appEnv } = props;
  const {
    nodes,
    edges,
    pipelineId,
    pipelineDescription,
    setPipelineUid,
    updateNodes,
    updateEdges,
    pipelineRecipeIsDirty,
    updatePipelineRecipeIsDirty,
    updatePipelineIsNew,
    pipelineIsNew,
    selectResourceDialogIsOpen,
    updateSelectResourceDialogIsOpen,
    testModeEnabled,
    updateTestModeEnabled,
    updateSelectedConnectorNodeId,
  } = usePipelineBuilderStore(pipelineBuilderSelector, shallow);
  const router = useRouter();
  const { entity } = router.query;

  const { toast } = useToast();

  const createUserPipeline = useCreateUserPipeline();
  const updateUserPipeline = useUpdateUserPipeline();

  const [isSaving, setIsSaving] = React.useState(false);

  async function handleSavePipeline() {
    if (!pipelineId) {
      return;
    }

    setIsSaving(true);

    if (!pipelineIsNew) {
      const payload: UpdateUserPipelinePayload = {
        name: `users/${entity}/pipelines/${pipelineId}`,
        description: pipelineDescription ?? undefined,
        recipe: constructPipelineRecipe(nodes),
      };

      try {
        const res = await updateUserPipeline.mutateAsync({
          payload,
          accessToken,
        });

        toast({
          title: "Pipeline is saved",
          variant: "alert-success",
          size: "small",
        });

        updatePipelineRecipeIsDirty(() => false);

        const { nodes, edges } = createInitialGraphData({
          pipeline: res.pipeline,
        });

        createGraphLayout(nodes, edges)
          .then((graphData) => {
            updateNodes(() => graphData.nodes);
            updateEdges(() => graphData.edges);
            updateSelectResourceDialogIsOpen(() => false);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        if (isAxiosError(error)) {
          toast({
            title: "Something went wrong when save the pipeline",
            description: getInstillApiErrorMessage(error),
            variant: "alert-error",
            size: "large",
          });
        } else {
          toast({
            title: "Something went wrong when save the pipeline",
            variant: "alert-error",
            size: "large",
          });
        }
      }
      setIsSaving(false);
      return;
    }

    // If the user haven't created the pipeline yet, we will create the pipeline

    const payload: CreateUserPipelinePayload = {
      id: pipelineId,
      description: pipelineDescription ?? undefined,
      recipe: constructPipelineRecipe(nodes),
    };

    try {
      const res = await createUserPipeline.mutateAsync({
        userName: `users/${entity}`,
        payload,
        accessToken,
      });

      setPipelineUid(res.pipeline.uid);
      updatePipelineRecipeIsDirty(() => false);
      updatePipelineIsNew(() => false);

      toast({
        title: "Successfully saved the pipeline",
        variant: "alert-success",
        size: "small",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: "Something went wrong when save the pipeline",
          description: getInstillApiErrorMessage(error),
          variant: "alert-error",
          size: "large",
        });
      } else {
        toast({
          title: "Something went wrong when save the pipeline",
          variant: "alert-error",
          size: "large",
        });
      }
    }

    setIsSaving(false);
  }

  const codeSnippte = React.useMemo(() => {
    const input: GeneralRecord = {};

    const startNode = nodes.find(
      (e) => e.data.nodeType === "start"
    ) as Node<StartNodeData>;

    if (!startNode) return "";

    for (const [key, metadata] of Object.entries(
      startNode.data.component.configuration.metadata
    )) {
      switch (metadata.type) {
        case "text": {
          input[key] = "Please put your value here";
          break;
        }
        case "text_array": {
          input[key] = [
            "Please put your first value here",
            "Please put your second value here",
            "...",
          ];
          break;
        }
        case "number": {
          input[key] = 123456;
          break;
        }
        case "number_array": {
          input[key] = [123456, 654321];
          break;
        }
        case "image": {
          input[key] = "your image base64 encoded string";
          break;
        }
        case "image_array": {
          input[key] = [
            "Please put your first image base64 encoded string",
            "Please put your second image base64 encoded string",
            "...",
          ];
          break;
        }
        case "audio": {
          input[key] = "Please put your audio base64 encoded string";
          break;
        }
        case "audio_array": {
          input[key] = [
            "Please put your first audio base64 encoded string",
            "Please put your second audio base64 encoded string",
            "...",
          ];
          break;
        }
        case "boolean": {
          input[key] = true;
          break;
        }
        case "boolean_array": {
          input[key] = [true, false];
          break;
        }
      }
    }

    const inputsString = JSON.stringify({ inputs: [input] }, null, "\t");

    let snippet =
      appEnv === "APP_ENV_CLOUD"
        ? triggerPipelineSnippets.cloud
        : triggerPipelineSnippets.core;

    snippet = snippet
      .replace(/\{vdp-pipeline-base-url\}/g, env("NEXT_PUBLIC_API_GATEWAY_URL"))
      .replace(/\{pipeline-name\}/g, `users/${entity}/pipelines/${pipelineId}`)
      .replace(/\{input-array\}/g, inputsString);

    return snippet;
  }, [nodes, pipelineId, appEnv, entity]);

  return (
    <>
      <div className="absolute right-8 top-8 flex flex-row-reverse gap-x-4">
        <ReleasePipelineModal accessToken={accessToken} />
        <Button
          onClick={handleSavePipeline}
          className="gap-x-2"
          variant="secondaryGrey"
          size="lg"
          type="button"
          disabled={pipelineRecipeIsDirty ? false : true}
        >
          Save
          {isSaving ? (
            <svg
              className="m-auto h-4 w-4 animate-spin text-semantic-fg-secondary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <Icons.Save01 className="h-5 w-5 stroke-semantic-fg-primary" />
          )}
        </Button>
        <Button
          onClick={async () => {
            if (pipelineIsNew) {
              toast({
                title: "Pipeline is not saved",
                description: "Please save the pipeline before testing it.",
                variant: "alert-error",
                size: "large",
              });
              return;
            }

            if (!testModeEnabled) {
              await handleSavePipeline();
            }

            updateTestModeEnabled((prev) => !prev);
            updateSelectedConnectorNodeId(() => null);
            updateSelectResourceDialogIsOpen(() => false);
          }}
          className="gap-x-2"
          variant="secondaryGrey"
          size="lg"
        >
          {testModeEnabled ? (
            "Stop"
          ) : (
            <>
              Test <Icons.Play className="h-5 w-5 stroke-semantic-fg-primary" />
            </>
          )}
        </Button>
      </div>
      <div className="absolute left-8 top-8 flex flex-row gap-x-4">
        <SelectConnectorResourceDialog
          enableQuery={enableQuery}
          open={selectResourceDialogIsOpen}
          onOpenChange={(open) => updateSelectResourceDialogIsOpen(() => open)}
          accessToken={accessToken}
          onSelect={(resource) => {
            if (!reactFlowInstance) return;

            const viewport = reactFlowInstance.getViewport();
            let componentType: Nullable<PipelineConnectorComponent["type"]> =
              null;

            // Remove the empty node and edges that connect to empty node if it exists
            const emptyNode = nodes.find((e) => e.data.nodeType === "empty");

            const newNodes = emptyNode
              ? nodes.filter((e) => e.data.nodeType !== "empty")
              : nodes;

            const newEdges = emptyNode
              ? edges.filter((e) => {
                  if (e.source === emptyNode.id || e.target === emptyNode.id) {
                    return false;
                  }
                  return true;
                })
              : edges;

            let nodePrefix: Nullable<string> = null;
            let nodeIndex = 0;
            let configuration: Nullable<GeneralRecord> = null;

            switch (resource.type) {
              case "CONNECTOR_TYPE_AI": {
                nodePrefix = "ai";
                nodeIndex =
                  nodes.filter(
                    (e) =>
                      e.data.component?.type === "COMPONENT_TYPE_CONNECTOR_AI"
                  ).length + 1;
                configuration =
                  "configuration" in resource
                    ? getAiConnectorDefaultConfiguration(
                        resource.connector_definition_name
                      )
                    : getAiConnectorDefaultConfiguration(resource.name);
                componentType = "COMPONENT_TYPE_CONNECTOR_AI";
                break;
              }
              case "CONNECTOR_TYPE_BLOCKCHAIN": {
                nodePrefix = "blockchain";
                nodeIndex =
                  nodes.filter(
                    (e) =>
                      e.data.component?.type ===
                      "COMPONENT_TYPE_CONNECTOR_BLOCKCHAIN"
                  ).length + 1;
                configuration =
                  "configuration" in resource
                    ? getBlockchainConnectorDefaultConfiguration(
                        resource.connector_definition_name
                      )
                    : getBlockchainConnectorDefaultConfiguration(resource.name);
                componentType = "COMPONENT_TYPE_CONNECTOR_BLOCKCHAIN";
                break;
              }
              case "CONNECTOR_TYPE_DATA": {
                nodePrefix = "data";
                nodeIndex =
                  nodes.filter(
                    (e) =>
                      e.data.component?.type === "COMPONENT_TYPE_CONNECTOR_DATA"
                  ).length + 1;
                configuration = {
                  input: {},
                };
                componentType = "COMPONENT_TYPE_CONNECTOR_DATA";
                break;
              }

              case "CONNECTOR_TYPE_OPERATOR": {
                nodePrefix = "operator";
                nodeIndex =
                  nodes.filter(
                    (e) => e.data.component?.type === "COMPONENT_TYPE_OPERATOR"
                  ).length + 1;
                configuration = {};
                componentType = "COMPONENT_TYPE_OPERATOR";
                break;
              }
            }

            const nodeID = `${nodePrefix}_${nodeIndex}`;

            if (!componentType) {
              throw new Error("Component type is not defined");
            }

            if ("configuration" in resource) {
              newNodes.push({
                id: nodeID,
                type: "connectorNode",
                sourcePosition: Position.Left,
                targetPosition: Position.Right,
                data: {
                  nodeType: "connector",
                  component: {
                    id: nodeID,
                    resource_name: resource.name,
                    resource: {
                      ...resource,
                      connector_definition: null,
                    },
                    definition_name: resource.connector_definition.name,
                    configuration: configuration ? configuration : {},
                    type: componentType,
                    connector_definition: resource.connector_definition,
                  },
                },
                position: reactFlowInstance.project({
                  x: viewport.x,
                  y: viewport.y,
                }),
              });

              newEdges.push(
                ...[
                  {
                    id: uuidv4(),
                    source: "start",
                    target: nodeID,
                    type: "customEdge",
                  },
                  {
                    id: uuidv4(),
                    source: nodeID,
                    target: "end",
                    type: "customEdge",
                  },
                ]
              );
            } else {
              newNodes.push({
                id: nodeID,
                type: "connectorNode",
                sourcePosition: Position.Left,
                targetPosition: Position.Right,
                data: {
                  nodeType: "connector",
                  component: {
                    id: nodeID,
                    resource_name: null,
                    resource: null,
                    definition_name: resource.name,
                    type: componentType,
                    connector_definition: resource,
                    configuration: configuration ? configuration : {},
                  },
                },
                position: reactFlowInstance.project({
                  x: viewport.x,
                  y: viewport.y,
                }),
              });

              newEdges.push(
                ...[
                  {
                    id: uuidv4(),
                    source: "start",
                    target: nodeID,
                    type: "customEdge",
                  },
                  {
                    id: uuidv4(),
                    source: nodeID,
                    target: "end",
                    type: "customEdge",
                  },
                ]
              );
            }

            updatePipelineRecipeIsDirty(() => true);

            createGraphLayout(newNodes, newEdges)
              .then((graphData) => {
                updateNodes(() => graphData.nodes);
                updateEdges(() => graphData.edges);
                updateSelectResourceDialogIsOpen(() => false);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      </div>
      <div className="absolute bottom-8 right-8">
        <PipelineToolkitModal snippet={codeSnippte} />
      </div>
    </>
  );
};
