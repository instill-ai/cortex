import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "clsx";
import { isAxiosError } from "axios";
import { NodeProps, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { PipelineComponentReference, StartNodeData } from "../type";
import {
  Button,
  Checkbox,
  ComplicateIcons,
  Form,
  Icons,
  Input,
  Tag,
  useToast,
} from "@instill-ai/design-system";

import {
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "../usePipelineBuilderStore";
import {
  extractReferencesFromConfiguration,
  composeEdgesFromReferences,
  recursiveParseToNum,
  recursiveRemoveUndefinedAndNullFromArray,
  recursiveReplaceNullAndEmptyStringWithUndefined,
} from "../lib";
import { CustomHandle } from "./CustomHandle";
import { useStartOperatorTestModeInputForm } from "../use-node-input-fields";
import { StartNodeInputType } from "./StartNodeInputType";
import {
  Nullable,
  StartOperatorInputSingularType,
  StartOperatorInputType,
  getInstillApiErrorMessage,
  useTriggerUserPipeline,
} from "../../../lib";

export const CreateStartOperatorInputSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  key: z.string().min(1, { message: "Key is required" }),
});

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  pipelineIsNew: state.pipelineIsNew,
  pipelineName: state.pipelineName,
  nodes: state.nodes,
  updateNodes: state.updateNodes,
  updateEdges: state.updateEdges,
  testModeEnabled: state.testModeEnabled,
  updateTestModeTriggerResponse: state.updateTestModeTriggerResponse,
  accessToken: state.accessToken,
  updatePipelineRecipeIsDirty: state.updatePipelineRecipeIsDirty,
  isLatestVersion: state.isLatestVersion,
});

export const StartNode = ({ data, id }: NodeProps<StartNodeData>) => {
  const [enableEdit, setEnableEdit] = React.useState(false);
  const [selectedType, setSelectedType] =
    React.useState<Nullable<StartOperatorInputSingularType>>(null);
  const [prevFieldKey, setPrevFieldKey] =
    React.useState<Nullable<string>>(null);
  const [isTriggering, setIsTriggering] = React.useState(false);
  const [inputTypeIsArray, setInputTypeIsArray] = React.useState(false);

  const {
    pipelineName,
    nodes,
    updateNodes,
    updateEdges,
    testModeEnabled,
    updateTestModeTriggerResponse,
    accessToken,
    updatePipelineRecipeIsDirty,
    isLatestVersion,
  } = usePipelineBuilderStore(pipelineBuilderSelector, shallow);

  const { toast } = useToast();

  const createStartOperatorInputform = useForm<
    z.infer<typeof CreateStartOperatorInputSchema>
  >({
    resolver: zodResolver(CreateStartOperatorInputSchema),
  });

  const {
    Schema: StartOperatorTestModeInputSchema,
    fields: startOperatorTestModeInputfields,
    form: startOperatorTestModeInputForm,
  } = useStartOperatorTestModeInputForm({ nodes });

  const useTriggerPipeline = useTriggerUserPipeline();

  const onTriggerPipeline = (
    data: z.infer<typeof StartOperatorTestModeInputSchema>
  ) => {
    if (!pipelineName) return;

    const input = recursiveRemoveUndefinedAndNullFromArray(
      recursiveReplaceNullAndEmptyStringWithUndefined(recursiveParseToNum(data))
    );

    setIsTriggering(true);

    useTriggerPipeline.mutate(
      {
        pipelineName,
        accessToken,
        payload: {
          inputs: [input],
        },
        returnTraces: true,
      },
      {
        onSuccess: (data) => {
          setIsTriggering(false);
          updateTestModeTriggerResponse(() => data);
        },
        onError: (error) => {
          setIsTriggering(false);
          if (isAxiosError(error)) {
            toast({
              title: "Something went wrong when trigger the pipeline",
              variant: "alert-error",
              size: "large",
              description: getInstillApiErrorMessage(error),
            });
          } else {
            toast({
              title: "Something went wrong when trigger the pipeline",
              variant: "alert-error",
              size: "large",
              description: "Please try again later",
            });
          }
        },
      }
    );
  };

  const onSubmit = (
    formData: z.infer<typeof CreateStartOperatorInputSchema>
  ) => {
    if (!selectedType) return;

    let finalType: StartOperatorInputType = selectedType;

    if (inputTypeIsArray) {
      switch (selectedType) {
        case "text": {
          finalType = "text_array";
          break;
        }
        case "audio": {
          finalType = "audio_array";
          break;
        }
        case "boolean": {
          finalType = "boolean_array";
          break;
        }
        case "image": {
          finalType = "image_array";
          break;
        }
        case "number": {
          finalType = "number_array";
          break;
        }
      }
    }

    const newNodes = nodes.map((node) => {
      if (node.data.nodeType === "start") {
        if (prevFieldKey) {
          delete node.data.component.configuration.metadata[prevFieldKey];
        }

        node.data = {
          ...node.data,
          component: {
            ...node.data.component,
            configuration: {
              ...node.data.component.configuration,
              metadata: {
                ...node.data.component.configuration.metadata,
                [formData.key]: {
                  type: finalType,
                  title: formData.title,
                },
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

    setEnableEdit(false);
    setSelectedType(null);
    setPrevFieldKey(null);
    setInputTypeIsArray(false);
    updatePipelineRecipeIsDirty(() => true);
    createStartOperatorInputform.reset({
      title: "",
      key: "",
    });
  };

  const onDeleteField = (key: string) => {
    const newNodes = nodes.map((node) => {
      if (node.data.nodeType === "start") {
        delete node.data.component.configuration.metadata[key];

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
    updateEdges(() => newEdges);
    updatePipelineRecipeIsDirty(() => true);
  };

  const onEditField = (key: string) => {
    createStartOperatorInputform.reset({
      title: data.component.configuration.metadata[key].title,
      key: key,
    });
    setEnableEdit(true);
    setSelectedType(() => {
      let finalType = data.component.configuration.metadata[key].type;

      switch (finalType) {
        case "text_array": {
          finalType = "text";
          setInputTypeIsArray(true);
          break;
        }
        case "audio_array": {
          finalType = "audio";
          setInputTypeIsArray(true);
          break;
        }
        case "boolean_array": {
          finalType = "boolean";
          setInputTypeIsArray(true);
          break;
        }
        case "image_array": {
          finalType = "image";
          setInputTypeIsArray(true);
          break;
        }
        case "number_array": {
          finalType = "number";
          setInputTypeIsArray(true);
          break;
        }
      }

      return finalType;
    });
  };

  return (
    <>
      <div className="relative flex min-w-[246px] flex-col rounded-sm border-2 border-semantic-bg-primary bg-semantic-bg-base-bg px-3 py-2.5 shadow-md hover:shadow-lg">
        <div className="mb-4 flex flex-row gap-x-1">
          <p className="text-semantic-fg-secondary product-body-text-4-medium">
            start
          </p>
        </div>

        {enableEdit ? (
          <Form.Root {...createStartOperatorInputform}>
            <form
              onSubmit={createStartOperatorInputform.handleSubmit(onSubmit)}
            >
              <div className="mb-3 flex flex-row justify-between">
                <Button
                  variant="tertiaryGrey"
                  size="sm"
                  className="!px-2 !py-2"
                  onClick={() => {
                    setEnableEdit(!enableEdit);
                    setSelectedType(null);
                    createStartOperatorInputform.reset({
                      title: "",
                      key: "",
                    });
                    setInputTypeIsArray(false);
                  }}
                >
                  <Icons.ArrowLeft className="m-auto h-4 w-4 stroke-slate-500" />
                </Button>
                <div>
                  <Button variant="primary" type="submit" size="sm">
                    Save
                  </Button>
                </div>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-x-3 gap-y-3">
                <StartNodeInputType
                  type="text"
                  selectedType={selectedType}
                  onSelect={() => {
                    if (selectedType === "text") {
                      setSelectedType(null);
                    } else {
                      setSelectedType("text");
                    }
                    setInputTypeIsArray(false);
                  }}
                />
                <StartNodeInputType
                  type="number"
                  selectedType={selectedType}
                  onSelect={() => {
                    if (selectedType === "number") {
                      setSelectedType(null);
                    } else {
                      setSelectedType("number");
                    }
                    setInputTypeIsArray(false);
                  }}
                />
                <StartNodeInputType
                  type="image"
                  selectedType={selectedType}
                  onSelect={() => {
                    if (selectedType === "image") {
                      setSelectedType(null);
                    } else {
                      setSelectedType("image");
                    }
                    setInputTypeIsArray(false);
                  }}
                />
                <StartNodeInputType
                  type="audio"
                  selectedType={selectedType}
                  onSelect={() => {
                    if (selectedType === "audio") {
                      setSelectedType(null);
                    } else {
                      setSelectedType("audio");
                    }
                    setInputTypeIsArray(false);
                  }}
                />
                <StartNodeInputType
                  type="boolean"
                  selectedType={selectedType}
                  onSelect={() => {
                    if (selectedType === "boolean") {
                      setSelectedType(null);
                    } else {
                      setSelectedType("boolean");
                    }
                    setInputTypeIsArray(false);
                  }}
                />
              </div>
              {["number", "image", "text", "audio"].includes(
                selectedType ?? ""
              ) ? (
                <div className="mb-3 flex flex-row space-x-3">
                  <Checkbox
                    checked={inputTypeIsArray}
                    onCheckedChange={(e) => {
                      if (typeof e === "boolean") {
                        setInputTypeIsArray(e);
                      }
                    }}
                    id="is_array"
                    className="my-auto h-4 w-4"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="is_array"
                      className="text-semantic-fg-primary product-body-text-4-semibold"
                    >
                      Convert selected type to array
                    </label>
                  </div>
                </div>
              ) : null}
              <div
                className={cn(
                  selectedType ? "" : "hidden",
                  "flex flex-col space-y-3"
                )}
              >
                <Form.Field
                  control={createStartOperatorInputform.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label className="!font-sans !text-base !font-semibold">
                          Title
                        </Form.Label>
                        <Form.Control className="h-8">
                          <Input.Root className="!px-[9px] !py-1.5">
                            <Input.Core
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              autoComplete="off"
                              className="!h-5 !text-sm"
                              placeholder="My prompt"
                            />
                          </Input.Root>
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    );
                  }}
                />
                <Form.Field
                  control={createStartOperatorInputform.control}
                  name="key"
                  render={({ field }) => {
                    return (
                      <Form.Item>
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
                              placeholder="text_prompt"
                            />
                          </Input.Root>
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
          <div className="flex flex-col">
            {testModeEnabled ? (
              <Form.Root {...startOperatorTestModeInputForm}>
                <form
                  className="w-full"
                  onSubmit={startOperatorTestModeInputForm.handleSubmit(
                    onTriggerPipeline
                  )}
                >
                  <div className="flex flex-col space-y-3">
                    {...startOperatorTestModeInputfields}
                  </div>
                  <div className="absolute left-[6px] top-0 -translate-y-[calc(100%+2px)]">
                    <Button
                      type="submit"
                      variant="secondaryGrey"
                      size="lg"
                      className="gap-x-2"
                    >
                      Run
                      {isTriggering ? (
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
                        <Icons.Play className="h-4 w-4 stroke-semantic-fg-primary" />
                      )}
                    </Button>
                  </div>
                </form>
              </Form.Root>
            ) : (
              <div className="flex flex-col space-y-3">
                {Object.entries(data.component.configuration.metadata).map(
                  ([key, value]) => {
                    let icon: Nullable<React.ReactElement> = null;

                    switch (value.type) {
                      case "text":
                      case "text_array": {
                        icon = (
                          <Icons.Type02 className="m-auto h-4 w-4 stroke-semantic-accent-on-bg" />
                        );
                        break;
                      }
                      case "audio":
                      case "audio_array": {
                        icon = (
                          <Icons.Recording02 className="m-auto h-4 w-4 stroke-semantic-accent-on-bg" />
                        );
                        break;
                      }
                      case "boolean":
                      case "boolean_array": {
                        icon = (
                          <ComplicateIcons.ToggleLeft
                            fillAreaColor="fill-semantic-accent-on-bg"
                            className="m-auto h-4 w-4"
                          />
                        );
                        break;
                      }
                      case "image":
                      case "image_array": {
                        icon = (
                          <Icons.Image01 className="m-auto h-4 w-4 stroke-semantic-accent-on-bg" />
                        );
                        break;
                      }
                      case "number":
                      case "number_array": {
                        icon = (
                          <ComplicateIcons.Number
                            fillAreaColor="fill-semantic-accent-on-bg"
                            className="m-auto h-4 w-4"
                          />
                        );
                        break;
                      }
                      default:
                        break;
                    }

                    return (
                      <div key={key} className="flex flex-col">
                        <div className="mb-2 flex flex-row items-center justify-between">
                          <div className="my-auto font-sans text-base font-semibold text-semantic-fg-primary">
                            {key}
                          </div>
                          {isLatestVersion ? (
                            <div className="my-auto flex flex-row gap-x-4">
                              <button
                                onClick={() => {
                                  onEditField(key);
                                  setPrevFieldKey(key);
                                }}
                                disabled={isLatestVersion ? false : true}
                              >
                                <Icons.Edit03 className="h-6 w-6 stroke-semantic-accent-on-bg" />
                              </button>
                              <button
                                onClick={() => onDeleteField(key)}
                                disabled={isLatestVersion ? false : true}
                              >
                                <Icons.Trash01 className="h-6 w-6 stroke-semantic-error-on-bg" />
                              </button>
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <Tag
                            className="gap-x-1.5"
                            variant="lightBlue"
                            size="md"
                          >
                            {icon}
                            {value.type}
                          </Tag>
                        </div>
                      </div>
                    );
                  }
                )}
                <Button
                  className="flex w-full flex-1"
                  variant="primary"
                  onClick={() => setEnableEdit(!enableEdit)}
                  disabled={isLatestVersion ? false : true}
                >
                  <p className="my-auto">Add Field</p>
                  <Icons.Plus
                    className={cn(
                      "my-auto h-4 w-4 stroke-semantic-bg-primary",
                      isLatestVersion
                        ? "stroke-semantic-bg-primary"
                        : "stroke-semantic-fg-secondary"
                    )}
                  />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <CustomHandle type="source" position={Position.Right} id={id} />
    </>
  );
};
