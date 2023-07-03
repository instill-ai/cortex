import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BasicProgressMessageBox,
  Form,
  Icons,
  Input,
  ModelLogo,
  OutlineButton,
  ProgressMessageBoxState,
  Select,
  SolidButton,
  Textarea,
} from "@instill-ai/design-system";
import { DeleteResourceModal, ImageWithFallback } from "../../components";
import {
  ConnectorWithDefinition,
  ModalStore,
  Nullable,
  UpdateConnectorPayload,
  getInstillApiErrorMessage,
  sendAmplitudeData,
  testConnectorConnectionAction,
  useAmplitudeCtx,
  useDeleteConnector,
  useModalStore,
  useUpdateConnector,
} from "../../lib";
import { isAxiosError } from "axios";
import { shallow } from "zustand/shallow";

export const ConfigureAIFormSchema = z
  .object({
    id: z.string().min(1, { message: "ID is required" }),
    description: z.string().optional(),
    connector_definition_name: z.string(),
    configuration: z.object({
      api_key: z.string().optional(),
      server_url: z.string().optional(),
      task: z.string().optional(),
      engine: z.string().optional(),
      model_id: z.string().optional(),
    }),
  })
  .superRefine((state, ctx) => {
    if (
      state.connector_definition_name ===
      "connector-definitions/stability-ai-model"
    ) {
      if (!state.configuration.api_key) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "API Key is required",
          path: ["configuration", "api_key"],
        });
      }

      if (!state.configuration.task) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Task is required",
          path: ["configuration", "task"],
        });
      }

      if (!state.configuration.engine) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Engine is required",
          path: ["configuration", "engine"],
        });
      }
    }

    if (
      state.connector_definition_name ===
      "connector-definitions/instill-ai-model"
    ) {
      if (!state.configuration.api_key) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "API Key is required",
          path: ["configuration", "api_key"],
        });
      }

      if (!state.configuration.model_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Model ID is required",
          path: ["configuration", "model_id"],
        });
      }

      if (!state.configuration.server_url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Server URL is required",
          path: ["configuration", "server_url"],
        });
      }
    }
  });

const modalSelector = (state: ModalStore) => ({
  closeModal: state.closeModal,
  openModal: state.openModal,
});

export type ConfigureAIFormProps = {
  accessToken: Nullable<string>;
  onDelete: Nullable<() => void>;
  onConfigure: Nullable<() => void>;
  onTestConnection: Nullable<() => void>;
  ai: ConnectorWithDefinition;
  disabledConfigure?: boolean;
  disabledDelete?: boolean;
  disabledTestConnection?: boolean;
};

export const ConfigureAIForm = (props: ConfigureAIFormProps) => {
  const {
    accessToken,
    onDelete,
    onConfigure,
    onTestConnection,
    ai,
    disabledConfigure,
    disabledDelete,
    disabledTestConnection,
  } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();

  const { openModal, closeModal } = useModalStore(modalSelector, shallow);

  const form = useForm<z.infer<typeof ConfigureAIFormSchema>>({
    resolver: zodResolver(ConfigureAIFormSchema),
    defaultValues: {
      ...ai,
    },
  });

  const [messageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const updateConnector = useUpdateConnector();

  function onSubmit(data: z.infer<typeof ConfigureAIFormSchema>) {
    form.trigger([
      "configuration",
      "connector_definition_name",
      "description",
      "id",
    ]);

    const payload: UpdateConnectorPayload = {
      connectorName: `connectors/${data.id}`,
      description: data.description,
      configuration: data.configuration,
    };

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Creating...",
    }));

    updateConnector.mutate(
      { payload, accessToken },
      {
        onSuccess: () => {
          setMessageBoxState(() => ({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          }));
          if (amplitudeIsInit) {
            sendAmplitudeData("create_ai", {
              type: "critical_action",
              process: "source",
            });
          }
          if (onConfigure) onConfigure();
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: getInstillApiErrorMessage(error),
              message: error.message,
            }));
          } else {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when update the AI",
            }));
          }
        },
      }
    );
  }

  const deleteConnector = useDeleteConnector();
  const handleDeleteAI = React.useCallback(() => {
    if (!ai) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    }));

    closeModal();

    deleteConnector.mutate(
      {
        connectorName: ai.name,
        accessToken,
      },
      {
        onSuccess: () => {
          setMessageBoxState(() => ({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          }));

          if (amplitudeIsInit) {
            sendAmplitudeData("delete_source", {
              type: "critical_action",
              process: "source",
            });
          }
          if (onDelete) onDelete();
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            setMessageBoxState(() => ({
              activate: true,
              message: error.message,
              description: getInstillApiErrorMessage(error),
              status: "error",
            }));
          } else {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when delete the source",
            }));
          }
        },
      }
    );
  }, [ai, amplitudeIsInit, deleteConnector, closeModal, onDelete, accessToken]);

  const handleTestAI = React.useCallback(
    async function () {
      if (!ai) return;

      setMessageBoxState(() => ({
        activate: true,
        status: "progressing",
        description: null,
        message: "Testing...",
      }));

      try {
        const res = await testConnectorConnectionAction({
          connectorName: ai.name,
          accessToken,
        });

        setMessageBoxState(() => ({
          activate: true,
          status: res.state === "STATE_ERROR" ? "error" : "success",
          description: null,
          message: `The AI's state is ${res.state}`,
        }));

        if (onTestConnection) onTestConnection();
      } catch (err) {
        setMessageBoxState(() => ({
          activate: true,
          status: "error",
          description: null,
          message: "Something went wrong when test the AI",
        }));
      }
    },
    [accessToken, ai, onTestConnection]
  );

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-5 mb-10">
          <Form.Field
            control={form.control}
            name="id"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label htmlFor={field.name}>ID *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="AI's name"
                        value={field.value ?? ""}
                        autoComplete="off"
                        disabled={true}
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    Pick an ID to help you identify this resource. The ID
                    conforms to RFC-1034, which restricts to letters, numbers,
                    and hyphen, with the first character a letter, the last a
                    letter or a number, and a 63 character maximum.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label htmlFor={field.name}>Description</Form.Label>
                  <Form.Control>
                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Description"
                      value={field.value ?? ""}
                      className="!rounded-none"
                    />
                  </Form.Control>
                  <Form.Description>
                    Fill with a short description.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="connector_definition_name"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label htmlFor={field.name}>
                    AI Connector Type
                  </Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={true}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value placeholder="Select an AI connector type" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      <Select.Item
                        key="connector-definitions/instill-ai-model"
                        value="connector-definitions/instill-ai-model"
                        className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <ModelLogo width={20} variant="square" />
                          <p className="my-auto">Instill Model</p>
                        </div>
                      </Select.Item>
                      <Select.Item
                        key="connector-definitions/stability-ai-model"
                        value="connector-definitions/stability-ai-model"
                        className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <ImageWithFallback
                            src={"/icons/stability-ai/logo.png"}
                            width={20}
                            height={20}
                            alt="Stability AI model logo"
                            fallbackImg={
                              <Icons.Model className="w-5 h-5 stroke-semantic-fg-primary" />
                            }
                          />
                          <p className="my-auto">Stability AI Model</p>
                        </div>
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <Form.Description>
                    Select an AI connector type.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.api_key"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label htmlFor={field.name}>API Key *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="API Key"
                        value={field.value ?? ""}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    Access to your API keys can then be managed through
                    Stability AI&apos;s Account page.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.task"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/stability-ai-model"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>Task *</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value placeholder="Select an AI task" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {["Text to Image", "Image to Image"].map((task) => (
                        <Select.Item
                          className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                          key={task}
                          value={task}
                        >
                          <p className="my-auto">{task}</p>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Form.Description>AI task type.</Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.engine"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/stability-ai-model"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>Engine</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value placeholder="Select an AI engine" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {[
                        "stable-diffusion-v1",
                        "stable-diffusion-v1-5",
                        "stable-diffusion-512-v2-0",
                        "stable-diffusion-768-v2-0",
                        "stable-diffusion-512-v2-1",
                        "stable-diffusion-768-v2-1",
                        "stable-diffusion-xl-beta-v2-2-2",
                        "stable-inpainting-v1-0",
                        "stable-inpainting-512-v2-0",
                        "esrgan-v1-x2plus",
                        "stable-diffusion-x4-latent-upscaler",
                      ].map((engine) => (
                        <Select.Item
                          className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                          key={engine}
                          value={engine}
                        >
                          <p className="my-auto">{engine}</p>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Form.Description>Engine (model) to use.</Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.server_url"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/instill-ai-model"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>Server URL *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="URL"
                        value={field.value ?? ""}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    Base URL for the Instill Model API.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.model_id"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/instill-ai-model"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>Model ID *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="ID"
                        value={field.value ?? ""}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>ID of the model to use.</Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-10 flex flex-row items-center">
            <div className="flex flex-row items-center space-x-5 mr-auto">
              <SolidButton
                type="submit"
                disabled={disabledTestConnection}
                color="primary"
                onClickHandler={handleTestAI}
              >
                Test
              </SolidButton>
              <button
                className="bg-instillBlue50 hover:bg-instillBlue80 text-instillGrey05 hover:text-instillBlue10 ml-auto rounded-[1px] px-5 py-2.5 my-auto disabled:cursor-not-allowed disabled:bg-instillGrey15 disabled:text-instillGrey50"
                type="submit"
                disabled={
                  disabledConfigure
                    ? true
                    : form.formState.isDirty === true
                    ? false
                    : true
                }
              >
                Update
              </button>
            </div>

            <OutlineButton
              disabled={disabledDelete ? true : false}
              onClickHandler={() => openModal()}
              position="my-auto"
              type="button"
              color="danger"
              hoveredShadow={null}
            >
              Delete
            </OutlineButton>
          </div>
          <div className="flex">
            <BasicProgressMessageBox
              state={messageBoxState}
              setActivate={(activate) =>
                setMessageBoxState((prev) => ({
                  ...prev,
                  activate,
                }))
              }
              width="w-[25vw]"
              closable={true}
            />
          </div>
        </div>
      </form>
      <DeleteResourceModal
        resource={ai}
        handleDeleteResource={handleDeleteAI}
      />
    </Form.Root>
  );
};
