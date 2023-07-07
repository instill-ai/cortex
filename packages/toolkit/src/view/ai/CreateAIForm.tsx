import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

import {
  BasicProgressMessageBox,
  Form,
  Icons,
  Input,
  ModelLogo,
  Select,
  Textarea,
  type ProgressMessageBoxState,
} from "@instill-ai/design-system";
import {
  getInstillApiErrorMessage,
  sendAmplitudeData,
  useAmplitudeCtx,
  useCreateConnector,
  type CreateConnectorPayload,
  type Nullable,
} from "../../lib";
import { ImageWithFallback } from "../../components";

export const CreateAIFormSchema = z
  .object({
    id: z.string().min(1, { message: "ID is required" }),
    description: z.string().optional(),
    connector_definition_name: z.string(),
    configuration: z.object({
      api_key: z.string().optional(),
      api_token: z.string().optional(),
      server_url: z.string().optional(),
      task: z.string().optional(),
      engine: z.string().optional(),
      model_id: z.string().optional(),
    }),
  })
  .superRefine((state, ctx) => {
    if (
      state.connector_definition_name ===
      "connector-definitions/ai-stability-ai"
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
      "connector-definitions/ai-instill-model"
    ) {
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

export type CreateAIFormProps = {
  accessToken: Nullable<string>;
  onCreate: Nullable<() => void>;
};

export const CreateAIForm = (props: CreateAIFormProps) => {
  const { accessToken, onCreate } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();
  const form = useForm<z.infer<typeof CreateAIFormSchema>>({
    resolver: zodResolver(CreateAIFormSchema),
  });

  // Read the state before render to subscribe the form state through Proxy

  const [messageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const createConnector = useCreateConnector();

  function onSubmit(data: z.infer<typeof CreateAIFormSchema>) {
    form.trigger(["configuration", "description", "id"]);

    const payload: CreateConnectorPayload = {
      connectorName: `connectors/${data.id}`,
      connector_definition_name: data.connector_definition_name,
      description: data.description,
      configuration: data.configuration,
    };

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Creating...",
    }));

    createConnector.mutate(
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
          if (onCreate) onCreate();
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
              message: "Something went wrong when create the AI",
            }));
          }
        },
      }
    );
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-10 flex flex-col space-y-5">
          <Form.Field
            control={form.control}
            name="id"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>ID *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        autoComplete="off"
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control>
                    <Textarea
                      {...field}
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
                  <Form.Label>AI Connector Type</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      <Select.Item
                        key="connector-definitions/ai-instill-model"
                        value="connector-definitions/ai-instill-model"
                        className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <ModelLogo width={20} variant="square" />
                          <p className="my-auto">Instill Model</p>
                        </div>
                      </Select.Item>
                      <Select.Item
                        key="connector-definitions/ai-stability-ai"
                        value="connector-definitions/ai-stability-ai"
                        className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <ImageWithFallback
                            src={"/icons/stabilityAI/stabilityai.svg"}
                            width={20}
                            height={20}
                            alt="Stability AI model logo"
                            fallbackImg={
                              <Icons.Model className="h-5 w-5 stroke-semantic-fg-primary" />
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
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                    "connector-definitions/ai-stability-ai"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>API Key *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="password"
                        value={field.value ?? ""}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    Fill your Stability AI API key. To find your keys, navigate
                    to your DreamStudio&apos;s Account page.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.api_token"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                    "connector-definitions/ai-instill-model"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>API Token</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="password"
                        value={field.value ?? ""}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    {`To access models on Instill Cloud, enter your Instill Cloud API Token. You can find your tokens by visiting your Instill Cloud's Settings > API Tokens page. Leave this field empty to access models on your local Instill Model.`}
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
                    form.watch("connector_definition_name") ===
                    "connector-definitions/ai-stability-ai"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Task *</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {["Text to Image"].map((task) => (
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
                    form.watch("connector_definition_name") ===
                    "connector-definitions/ai-stability-ai"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Engine</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value />
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
                  <Form.Description>
                    Stability AI Engine (model) to be used.
                  </Form.Description>
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
                    form.watch("connector_definition_name") ===
                    "connector-definitions/ai-instill-model"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Server URL *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    Base URL for the Instill Model API. To access models on
                    Instill Cloud, use the base URL
                    `https://api-model.instill.tech`. To access models on your
                    local Instill Model, use the base URL
                    `http://localhost:9080`.
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
                    form.watch("connector_definition_name") ===
                    "connector-definitions/ai-instill-model"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Model ID *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    ID of the Instill Model model to be used.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
        </div>
        <div className="flex flex-row">
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
          <button
            className="my-auto ml-auto rounded-[1px] bg-instillBlue50 px-5 py-2.5 text-instillGrey05 hover:bg-instillBlue80 hover:text-instillBlue10"
            type="submit"
          >
            Set up
          </button>
        </div>
      </form>
    </Form.Root>
  );
};
