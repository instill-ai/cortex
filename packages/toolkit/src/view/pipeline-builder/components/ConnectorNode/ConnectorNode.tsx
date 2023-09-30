import cn from "clsx";
import * as React from "react";
import * as z from "zod";
import { Node, NodeProps, Position } from "reactflow";
import {
  Button,
  Form,
  Icons,
  Input,
  LinkButton,
  Tag,
  Textarea,
  useToast,
} from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ConnectorNodeData,
  NodeData,
  PipelineComponentReference,
} from "../../type";
import {
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "../../usePipelineBuilderStore";
import { CustomHandle } from "../CustomHandle";
import {
  extractReferencesFromConfiguration,
  getPropertiesFromOpenAPISchema,
  getConnectorInputOutputSchema,
  extractPipelineComponentReferenceFromString,
  composeEdgesFromReferences,
  createGraphLayout,
} from "../../lib";
import { InputPropertyItem } from "./InputPropertyItem";
import { GeneralRecord, Nullable } from "../../../../lib";
import { useConnectorTestModeOutputFields } from "../../use-node-output-fields";
import { ImageWithFallback } from "../../../../components";

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  expandAllNodes: state.expandAllNodes,
  selectedConnectorNodeId: state.selectedConnectorNodeId,
  updateSelectedConnectorNodeId: state.updateSelectedConnectorNodeId,
  nodes: state.nodes,
  edges: state.edges,
  updateNodes: state.updateNodes,
  updateEdges: state.updateEdges,
  testModeEnabled: state.testModeEnabled,
  testModeTriggerResponse: state.testModeTriggerResponse,
  updatePipelineRecipeIsDirty: state.updatePipelineRecipeIsDirty,
  updateCreateResourceDialogState: state.updateCreateResourceDialogState,
  isLatestVersion: state.isLatestVersion,
  isOwner: state.isOwner,
});

export const DataConnectorInputSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

const UpdateNodeIdSchema = z.object({
  nodeId: z.string().min(1, { message: "Title is required" }),
});

export const ConnectorNode = ({ data, id }: NodeProps<ConnectorNodeData>) => {
  const {
    expandAllNodes,
    selectedConnectorNodeId,
    updateSelectedConnectorNodeId,
    nodes,
    edges,
    updateNodes,
    updateEdges,
    testModeEnabled,
    testModeTriggerResponse,
    updatePipelineRecipeIsDirty,
    updateCreateResourceDialogState,
    isLatestVersion,
    isOwner,
  } = usePipelineBuilderStore(pipelineBuilderSelector, shallow);

  const { toast } = useToast();

  const [enableEdit, setEnableEdit] = React.useState(false);
  const connectorNameEditInputRef = React.useRef<HTMLInputElement>(null);
  const [prevFieldKey, setPrevFieldKey] =
    React.useState<Nullable<string>>(null);

  const updateNodeIdForm = useForm<z.infer<typeof UpdateNodeIdSchema>>({
    resolver: zodResolver(UpdateNodeIdSchema),
    mode: "onBlur",
    defaultValues: {
      nodeId: id,
    },
  });

  const dataConnectorInputForm = useForm<
    z.infer<typeof DataConnectorInputSchema>
  >({
    resolver: zodResolver(DataConnectorInputSchema),
  });

  const { reset } = updateNodeIdForm;

  React.useEffect(() => {
    reset({
      nodeId: id,
    });
  }, [id, reset]);

  const [exapndInputs, setExpandInputs] = React.useState(false);
  const [exapndOutputs, setExpandOutputs] = React.useState(false);

  let aiTaskNotSelected = false;
  let resourceNotCreated = false;

  const { inputSchema, outputSchema } = React.useMemo(() => {
    if (
      data.component.type === "COMPONENT_TYPE_CONNECTOR_AI" &&
      !data.component.configuration.input.task
    ) {
      return { inputSchema: null, outputSchema: null };
    }

    return getConnectorInputOutputSchema(data.component);
  }, [data.component]);

  if (
    data.component.type === "COMPONENT_TYPE_CONNECTOR_AI" &&
    !data.component.configuration.input.task
  ) {
    aiTaskNotSelected = true;
  }

  if (!data.component.resource_name) {
    resourceNotCreated = true;
  }

  React.useEffect(() => {
    setExpandInputs(expandAllNodes);
    setExpandOutputs(expandAllNodes);
  }, [expandAllNodes]);

  const inputProperties = React.useMemo(() => {
    if (!inputSchema) return [];
    return getPropertiesFromOpenAPISchema(inputSchema);
  }, [inputSchema]);

  const collapsedInputProperties = React.useMemo(() => {
    if (exapndInputs) return inputProperties;
    return inputProperties.slice(0, 3);
  }, [exapndInputs, inputProperties]);

  const outputProperties = React.useMemo(() => {
    if (!outputSchema) return [];
    return getPropertiesFromOpenAPISchema(outputSchema);
  }, [outputSchema]);

  const collapsedOutputProperties = React.useMemo(() => {
    if (exapndOutputs) return outputProperties;
    return outputProperties.slice(0, 3);
  }, [outputProperties, exapndOutputs]);

  function handleRenameNode(newNodeId: string) {
    if (newNodeId === id) {
      return;
    }

    const newNodes = nodes.map((node) => {
      if (node.id === id && node.data.nodeType === "connector") {
        return {
          ...node,
          id: newNodeId,
          data: {
            ...node.data,
            component: {
              ...node.data.component,
              id: newNodeId,
            },
          },
        };
      }
      return node;
    });

    updateNodes(() => newNodes);

    const allReferences: PipelineComponentReference[] = [];

    newNodes.forEach((node) => {
      if (node.data.component?.configuration) {
        allReferences.push(
          ...extractReferencesFromConfiguration(
            node.data.component?.configuration,
            node.id
          )
        );
      }
    });

    const newEdges = composeEdgesFromReferences(allReferences, newNodes);

    updateEdges(() => newEdges);

    updateSelectedConnectorNodeId(() => newNodeId);

    toast({
      title: "Successfully update node's name",
      variant: "alert-success",
      size: "small",
    });

    updatePipelineRecipeIsDirty(() => true);
  }

  function onEditDataConnectorInput(key: string) {
    dataConnectorInputForm.reset({
      value: data.component.configuration.input[key],
      key: key,
    });
    setEnableEdit(true);
  }

  function onSubmitDataConnectorInput(
    formData: z.infer<typeof DataConnectorInputSchema>
  ) {
    const newNodes = nodes.map((node) => {
      if (node.data.nodeType === "connector" && node.id === id) {
        if (prevFieldKey) {
          delete node.data.component.configuration.input[prevFieldKey];
        }

        node.data = {
          ...node.data,
          component: {
            ...node.data.component,
            configuration: {
              ...node.data.component.configuration,
              input: {
                ...node.data.component.configuration.input,
                [formData.key]: formData.value,
              },
            },
          },
        };
      }
      return node;
    });

    updateNodes(() => newNodes);

    const allReferences: PipelineComponentReference[] = [];

    newNodes.forEach((node) => {
      if (node.data.component?.configuration) {
        allReferences.push(
          ...extractReferencesFromConfiguration(
            node.data.component?.configuration,
            node.id
          )
        );
      }
    });

    const newEdges = composeEdgesFromReferences(allReferences, newNodes);
    updateEdges(() => newEdges);

    updatePipelineRecipeIsDirty(() => true);

    setEnableEdit(false);
    setPrevFieldKey(null);
    dataConnectorInputForm.reset({
      value: "",
      key: "",
    });
  }

  function onDeleteDataConnectorInput(key: string) {
    const newNodes = nodes.map((node) => {
      if (node.data.nodeType === "connector" && node.id === id) {
        delete node.data.component.configuration.input[key];

        node.data = {
          ...node.data,
        };
      }
      return node;
    });

    updateNodes(() => newNodes);

    const allReferences: PipelineComponentReference[] = [];

    newNodes.forEach((node) => {
      if (node.data.component?.configuration) {
        allReferences.push(
          ...extractReferencesFromConfiguration(
            node.data.component?.configuration,
            node.id
          )
        );
      }
    });

    const newEdges = composeEdgesFromReferences(allReferences, newNodes);
    updatePipelineRecipeIsDirty(() => true);
    updateEdges(() => newEdges);
  }

  const testModeOutputFields = useConnectorTestModeOutputFields(
    data.component,
    testModeTriggerResponse?.metadata?.traces ?? null
  );

  const hasTargetEdges = React.useMemo(() => {
    return edges.some((edge) => edge.target === id);
  }, [edges]);

  const hasSourceEdges = React.useMemo(() => {
    return edges.some((edge) => edge.source === id);
  }, [edges]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col rounded-sm border-2 border-semantic-bg-primary bg-semantic-bg-base-bg px-3 py-2.5 shadow-md hover:shadow-lg",
          {
            "outline outline-2 outline-semantic-accent-default outline-offset-1":
              id === selectedConnectorNodeId,
          },
          testModeEnabled ? "w-[480px]" : "w-[340px]"
        )}
      >
        <div className="mb-3 flex flex-row w-full">
          <div className="flex flex-row gap-x-1 mr-auto">
            <ImageWithFallback
              src={`/icons/${data.component?.connector_definition?.vendor}/${data.component?.connector_definition?.icon}`}
              width={16}
              height={16}
              alt={`${data.component?.connector_definition?.title}-icon`}
              fallbackImg={
                <Icons.Box className="my-auto h-4 w-4 stroke-semantic-fg-primary" />
              }
            />
            <Form.Root {...updateNodeIdForm}>
              <form className="my-auto flex">
                <Form.Field
                  control={updateNodeIdForm.control}
                  name="nodeId"
                  render={({ field }) => {
                    return (
                      <input
                        {...field}
                        className="flex flex-shrink bg-transparent p-1 text-semantic-fg-secondary product-body-text-4-medium focus:!ring-1 focus:!ring-semantic-accent-default"
                        ref={connectorNameEditInputRef}
                        value={field.value}
                        type="text"
                        autoComplete="off"
                        disabled={testModeEnabled}
                        onBlur={() => {
                          updateNodeIdForm.handleSubmit((data) => {
                            if (data.nodeId) {
                              handleRenameNode(data.nodeId);
                            }
                          })();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onKeyDown={(e) => {
                          // Disable enter key to prevent default form submit behavior
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            updateNodeIdForm.handleSubmit((data) => {
                              if (data.nodeId) {
                                handleRenameNode(data.nodeId);
                              }
                            })();
                          }
                        }}
                      />
                    );
                  }}
                />
              </form>
            </Form.Root>
          </div>
          {isLatestVersion && isOwner ? (
            <div className="flex flex-row gap-x-3">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  updateSelectedConnectorNodeId(() => id);
                }}
                variant="tertiaryGrey"
                size="sm"
                className="!px-0 !py-0"
                disabled={testModeEnabled}
              >
                <Icons.Gear01 className="w-4 h-4 stroke-semantic-fg-secondary" />
              </Button>
              {data.component.resource_name ? (
                <Button
                  variant="tertiaryGrey"
                  size="sm"
                  className="!px-0 !py-0"
                  disabled={testModeEnabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    const nodeIndex =
                      nodes.filter(
                        (node) =>
                          node.data.component?.type === data.component.type
                      ).length + 1;

                    let nodePrefix: Nullable<string> = null;

                    switch (data.component.connector_definition?.type) {
                      case "CONNECTOR_TYPE_AI": {
                        nodePrefix = "ai";
                        break;
                      }
                      case "CONNECTOR_TYPE_BLOCKCHAIN": {
                        nodePrefix = "blockchain";
                        break;
                      }
                      case "CONNECTOR_TYPE_DATA": {
                        nodePrefix = "data";
                        break;
                      }
                      case "CONNECTOR_TYPE_OPERATOR": {
                        nodePrefix = "operator";
                        break;
                      }
                    }
                    const nodeID = `${nodePrefix}_${nodeIndex}`;

                    const newNodes: Node<NodeData>[] = [
                      ...nodes,
                      {
                        id: nodeID,
                        type: "connectorNode",
                        sourcePosition: Position.Left,
                        targetPosition: Position.Right,
                        position: { x: 0, y: 0 },
                        data,
                      },
                    ];

                    const allReferences: PipelineComponentReference[] = [];

                    newNodes.forEach((node) => {
                      if (node.data.component?.configuration) {
                        allReferences.push(
                          ...extractReferencesFromConfiguration(
                            node.data.component?.configuration,
                            node.id
                          )
                        );
                      }
                    });

                    const newEdges = composeEdgesFromReferences(
                      allReferences,
                      newNodes
                    );

                    updatePipelineRecipeIsDirty(() => true);

                    createGraphLayout(newNodes, newEdges)
                      .then((graphData) => {
                        updateNodes(() => graphData.nodes);
                        updateEdges(() => graphData.edges);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <Icons.Copy07 className="w-4 h-4 stroke-semantic-fg-secondary" />
                </Button>
              ) : null}
              <Button
                variant="tertiaryGrey"
                size="sm"
                className="!px-0 !py-0"
                disabled={testModeEnabled}
                onClick={(e) => {
                  e.stopPropagation();
                  const newNodes = nodes.filter((node) => node.id !== id);

                  const allReferences: PipelineComponentReference[] = [];

                  newNodes.forEach((node) => {
                    if (node.data.component?.configuration) {
                      allReferences.push(
                        ...extractReferencesFromConfiguration(
                          node.data.component?.configuration,
                          node.id
                        )
                      );
                    }
                  });

                  const newEdges = composeEdgesFromReferences(
                    allReferences,
                    newNodes
                  );

                  updatePipelineRecipeIsDirty(() => true);

                  updateNodes(() => newNodes);
                  updateEdges(() => newEdges);
                }}
              >
                <Icons.X className="w-4 h-4 stroke-semantic-fg-secondary" />
              </Button>
            </div>
          ) : null}
        </div>
        {enableEdit ? (
          <Form.Root {...dataConnectorInputForm}>
            <form
              onSubmit={dataConnectorInputForm.handleSubmit(
                onSubmitDataConnectorInput
              )}
            >
              <div className="mb-3 flex flex-row justify-between">
                <Icons.ArrowLeft
                  className="my-auto h-5 w-5 stroke-slate-500"
                  onClick={() => {
                    setEnableEdit(!enableEdit);
                    dataConnectorInputForm.reset();
                  }}
                />
                <div>
                  <Button variant="primary" type="submit" size="sm">
                    Save
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Form.Field
                  control={dataConnectorInputForm.control}
                  name="key"
                  render={({ field }) => {
                    return (
                      <Form.Item className="w-full">
                        <Form.Label className="!font-sans !text-base !font-semibold">
                          Key
                        </Form.Label>
                        <Form.Control className="h-8">
                          <Input.Root className="!px-[9px] !py-1.5">
                            <Input.Core
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              autoComplete="off"
                              className="!h-5 !text-sm"
                              placeholder="prompt"
                            />
                          </Input.Root>
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    );
                  }}
                />
                <Form.Field
                  control={dataConnectorInputForm.control}
                  name="value"
                  render={({ field }) => {
                    return (
                      <Form.Item className="w-full">
                        <Form.Label className="!font-sans !text-base !font-semibold">
                          Value
                        </Form.Label>
                        <Form.Control>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            autoComplete="off"
                            className="!h-[72px] resize-none !text-sm"
                          />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    );
                  }}
                />
              </div>
            </form>
          </Form.Root>
        ) : (
          <>
            {resourceNotCreated ? (
              <div className="w-full mb-3 gap-y-2 rounded-sm border border-semantic-warning-default bg-semantic-warning-bg p-4">
                <p className="text-semantic-fg-primary product-body-text-3-regular">
                  Please create resource for this connector
                </p>
                <LinkButton
                  className="gap-x-2"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    updateCreateResourceDialogState(() => ({
                      open: true,
                      connectorType:
                        data.component.connector_definition?.type ?? null,
                      connectorDefinition:
                        data.component.connector_definition ?? null,
                      onCreated: (connectorResource) => {
                        const newNodes = nodes.map((node) => {
                          if (
                            node.data.nodeType === "connector" &&
                            node.id === id
                          ) {
                            node.data = {
                              ...node.data,
                              component: {
                                ...node.data.component,
                                resource_name: connectorResource.name,
                                resource: {
                                  ...connectorResource,
                                  connector_definition: null,
                                },
                              },
                            };
                          }
                          return node;
                        });

                        updateNodes(() => newNodes);

                        const allReferences: PipelineComponentReference[] = [];

                        newNodes.forEach((node) => {
                          if (node.data.component?.configuration) {
                            allReferences.push(
                              ...extractReferencesFromConfiguration(
                                node.data.component?.configuration,
                                node.id
                              )
                            );
                          }
                        });

                        const newEdges = composeEdgesFromReferences(
                          allReferences,
                          newNodes
                        );
                        updatePipelineRecipeIsDirty(() => true);
                        updateEdges(() => newEdges);

                        updateCreateResourceDialogState(() => ({
                          open: false,
                          connectorType: null,
                          connectorDefinition: null,
                          onCreated: null,
                          onSelectedExistingResource: null,
                        }));
                      },
                      onSelectedExistingResource: (connectorResource) => {
                        updateNodes((prev) => {
                          return prev.map((node) => {
                            if (
                              node.data.nodeType === "connector" &&
                              node.id === id
                            ) {
                              node.data = {
                                ...node.data,
                                component: {
                                  ...node.data.component,
                                  resource_name: connectorResource.name,
                                },
                              };
                            }
                            return node;
                          });
                        });

                        updateCreateResourceDialogState(() => ({
                          open: false,
                          connectorType: null,
                          connectorDefinition: null,
                          onCreated: null,
                          onSelectedExistingResource: null,
                        }));
                      },
                    }));
                  }}
                >
                  Create resource
                </LinkButton>
              </div>
            ) : null}
            {aiTaskNotSelected && !resourceNotCreated ? (
              <div className="w-full rounded-sm border border-semantic-warning-default bg-semantic-warning-bg p-4">
                <p className="text-semantic-fg-primary product-body-text-3-regular">
                  Please select AI task for this connector
                </p>
              </div>
            ) : null}
            {aiTaskNotSelected || resourceNotCreated ? null : (
              <div className="mb-1 product-body-text-4-medium">input</div>
            )}
            {inputProperties.length > 0 ? (
              <div className="mb-1 flex flex-col gap-y-1">
                {collapsedInputProperties.map((property) => {
                  const path = property.path
                    ? property.path
                    : property.title ?? null;

                  return (
                    <InputPropertyItem key={path} propertyPath={path}>
                      <InputPropertyItem.Value
                        property={property}
                        connectorConfiguration={
                          data.component.configuration.input
                        }
                        traces={
                          testModeTriggerResponse?.metadata?.traces ?? null
                        }
                      />
                    </InputPropertyItem>
                  );
                })}
                {inputProperties.length > 3 ? (
                  <div className="flex flex-row-reverse">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandInputs((prev) => !prev);
                      }}
                      className="text-semantic-accent-hover !underline product-body-text-4-medium"
                    >
                      {exapndInputs ? "Less" : "More"}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
            {data.component.type === "COMPONENT_TYPE_CONNECTOR_DATA" ? (
              testModeEnabled ? (
                <div className="mb-3 flex flex-col space-y-3">
                  {Object.entries(data.component.configuration.input).map(
                    ([key]) => {
                      return (
                        <div key={key} className="flex flex-col space-y-1">
                          <p className="text-semantic-fg-primary product-body-text-3-semibold">
                            {key}
                          </p>
                          <div className="min-h-[32px] rounded-sm bg-semantic-bg-primary px-2 py-1 text-semantic-fg-primary"></div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="mb-3 flex flex-col">
                  <div className="mb-3 flex flex-col space-y-4">
                    {Object.entries(
                      data.component.configuration.input as GeneralRecord
                    ).map(([key, value]) => {
                      const reference =
                        extractPipelineComponentReferenceFromString({
                          key,
                          value: value.value,
                          currentPath: [],
                          nodeId: id,
                        });

                      return (
                        <div key={key} className="flex flex-col">
                          <div className="flex flex-row items-center justify-between">
                            <div className="my-auto font-sans text-base font-semibold text-semantic-fg-primary">
                              {key}
                            </div>
                            <div className="my-auto flex flex-row gap-x-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditDataConnectorInput(key);
                                  setPrevFieldKey(key);
                                }}
                              >
                                <Icons.Edit03 className="h-6 w-6 stroke-semantic-accent-on-bg" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteDataConnectorInput(key);
                                }}
                              >
                                <Icons.Trash01 className="h-6 w-6 stroke-semantic-error-on-bg" />
                              </button>
                            </div>
                          </div>
                          <div>
                            {reference?.type === "singleCurlyBrace" ? (
                              <Tag
                                className="gap-x-1.5"
                                variant="lightBlue"
                                size="md"
                              >
                                {reference.referenceValue.withoutCurlyBraces}
                              </Tag>
                            ) : (
                              reference?.referenceValues.map(
                                (referenceValue) => (
                                  <Tag
                                    key={referenceValue.withCurlyBraces}
                                    className="gap-x-1.5"
                                    variant="lightBlue"
                                    size="md"
                                  >
                                    {referenceValue.withoutCurlyBraces}
                                  </Tag>
                                )
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    className="flex w-full"
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnableEdit(!enableEdit);
                    }}
                  >
                    Add Field
                    <Icons.Plus className="my-auto h-5 w-5 stroke-semantic-bg-primary " />
                  </Button>
                </div>
              )
            ) : null}
            {aiTaskNotSelected || resourceNotCreated ? null : (
              <div className="mb-1 product-body-text-4-medium">output</div>
            )}
            {outputProperties.length > 0 ? (
              <div className="mb-1 flex flex-col">
                <div className="mb-1 flex flex-col gap-y-1">
                  {testModeEnabled
                    ? testModeOutputFields
                    : collapsedOutputProperties.map((property) => {
                        return (
                          <div
                            key={
                              property.title ? property.title : property.path
                            }
                            className="w-full rounded-[6px] bg-semantic-bg-primary p-2"
                          >
                            <div className="flex flex-row gap-x-2">
                              <p className="my-auto text-semantic-fg-secondary product-body-text-4-semibold">
                                {property.path?.split(".").pop()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                </div>
                {outputProperties.length > 3 ? (
                  <div className="flex flex-row-reverse">
                    <button
                      onClick={() => setExpandInputs((prev) => !prev)}
                      className="text-semantic-accent-hover !underline product-body-text-4-medium"
                    >
                      {exapndInputs ? "Less" : "More"}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>
      <CustomHandle
        className={hasTargetEdges ? "" : "!opacity-0"}
        type="target"
        position={Position.Left}
        id={id}
      />
      <CustomHandle
        className={hasSourceEdges ? "" : "!opacity-0"}
        type="source"
        position={Position.Right}
        id={id}
      />
    </>
  );
};
