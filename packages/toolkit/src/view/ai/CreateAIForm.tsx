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
  Select,
  Textarea,
  type ProgressMessageBoxState,
  Logos,
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

const CreateAIFormSchema = z
  .object({
    id: z.string().min(1, { message: "ID is required" }),
    description: z.string().optional(),
    connector_definition_name: z.string(),
    configuration: z.object({
      // Instill Model
      api_token: z.string().optional(),
      server_url: z.string().optional(),
      model_id: z.string().optional(),

      // Stability AI / Open AI
      api_key: z.string().optional(),
      task: z.string().optional(),

      // Stability AI
      engine: z.string().optional(),

      // Open AI
      organization: z.string().optional(),
      model: z.string().optional(),
      system_message: z.string().optional(),
      temperature: z.coerce
        .number()
        .positive({ message: "Value must be positive" })
        .min(0, "Value must be greater than or equal to 0")
        .max(2, "Value must be less than or equal to 2")
        .optional(),
      n: z.coerce
        .number()
        .positive({ message: "Value must be positive" })
        .int({ message: "Value must be an integer" })
        .min(1, "Value must be greater than or equal to 1")
        .max(5, "Value must be less than or equal to 5")
        .optional(),
      max_tokens: z.coerce
        .number()
        .positive({ message: "Value must be positive" })
        .int({ message: "Value must be an integer" })
        .min(1, "Value must be greater than or equal to 1")
        .optional(),
    }),
  })
  .superRefine((state, ctx) => {
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

    if (state.connector_definition_name === "connector-definitions/ai-openai") {
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

      if (state.configuration.task === "Text Generation") {
        if (!state.configuration.temperature) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Temperature is required",
            path: ["configuration", "temperature"],
          });
        }

        if (!state.configuration.n) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "N is required",
            path: ["configuration", "n"],
          });
        }

        if (!state.configuration.model) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Model is required",
            path: ["configuration", "model"],
          });
        }
      }

      if (state.configuration.task === "Text Embeddings") {
        if (!state.configuration.model) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Model is required",
            path: ["configuration", "model"],
          });
        }
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
                    value={field.value}
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
                          <Logos.MDLSquare className="h-5 w-5 my-auto" />
                          <p className="my-auto">Instill Model</p>
                        </div>
                      </Select.Item>
                      <Select.Item
                        key="connector-definitions/ai-stability-ai"
                        value="connector-definitions/ai-stability-ai"
                        className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <div className="my-auto">
                            <ImageWithFallback
                              src={"/icons/stabilityAI/stabilityai.svg"}
                              width={20}
                              height={20}
                              alt="Stability AI logo"
                              fallbackImg={
                                <Icons.Model className="h-5 w-5 stroke-semantic-fg-primary" />
                              }
                            />
                          </div>
                          <p className="my-auto">Stability AI</p>
                        </div>
                      </Select.Item>
                      <Select.Item
                        key="connector-definitions/ai-openai"
                        value="connector-definitions/ai-openai"
                        className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <div className="my-auto">
                            <ImageWithFallback
                              src={"/icons/openai/openai.svg"}
                              width={20}
                              height={20}
                              alt="Open AI model logo"
                              fallbackImg={
                                <Icons.Model className="h-5 w-5 stroke-semantic-fg-primary" />
                              }
                            />
                          </div>
                          <p className="my-auto">OpenAI</p>
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

          {/* 
            Instill Model
          */}

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
                        id={field.name}
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

          {/* 
            General field for OpenAI and StabilityAI connector
          */}

          <Form.Field
            control={form.control}
            name="configuration.api_key"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-stability-ai" ||
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-openai"
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
                    {form.watch("connector_definition_name") ===
                    "connector-definitions/ai-openai"
                      ? "Fill your OpenAI API key. To find your keys, visit your OpenAI's API Keys page."
                      : null}
                    {form.watch("connector_definition_name") ===
                    "connector-definitions/ai-stability-ai"
                      ? "Fill your Stability AI API key. To find your keys, navigate to your DreamStudio's Account page."
                      : null}
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
              const tasks =
                form.watch("connector_definition_name") ===
                "connector-definitions/ai-stability-ai"
                  ? ["Text to Image", "Image to Image"]
                  : ["Text Generation", "Text Embeddings"];

              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-stability-ai" ||
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-openai"
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
                      {tasks.map((task) => (
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

          {/* 
            StabilityAI connector fields
          */}

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

          {/* 
            OpenAI connector fields
          */}

          <Form.Field
            control={form.control}
            name="configuration.model"
            render={({ field }) => {
              const models =
                form.watch("configuration.task") === "Text Generation"
                  ? ["gpt-4", "gpt-4-32k", "gpt-3.5-turbo", "gpt-3.5-turbo-16k"]
                  : ["text-embedding-ada-002"];

              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-openai" &&
                    form.watch("configuration.task")
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Model *</Form.Label>
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
                      {models.map((model) => (
                        <Select.Item
                          className="text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                          key={model}
                          value={model}
                        >
                          <p className="my-auto">{model}</p>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Form.Description>OpenAI model to be used.</Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />

          {/* 
            OpenAI Text Generation connector fields
          */}

          <Form.Field
            control={form.control}
            name="configuration.system_message"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-openai" &&
                    form.watch("configuration.task") === "Text Generation"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>System message</Form.Label>
                  <Form.Control>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      className="!rounded-none"
                    />
                  </Form.Control>
                  <Form.Description>
                    The system message helps set the behavior of the assistant.
                    For example, you can modify the personality of the assistant
                    or provide specific instructions about how it should behave
                    throughout the conversation. By default, the model&apos;s
                    behavior is using a generic message as &quot;You are a
                    helpful assistant.&quot;
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.temperature"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-openai" &&
                    form.watch("configuration.task") === "Text Generation"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Temperature *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="number"
                        value={field.value}
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
            name="configuration.n"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-openai" &&
                    form.watch("configuration.task") === "Text Generation"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Number of text completions *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="number"
                        value={field.value}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    How many chat completion choices to generate for each input
                    message.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.max_tokens"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.watch("connector_definition_name") ===
                      "connector-definitions/ai-openai" &&
                    form.watch("configuration.task") === "Text Generation"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Max tokens</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        type="number"
                        value={field.value}
                        autoComplete="off"
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    The maximum number of tokens to generate in the chat
                    completion. If it is not set, meaning no maximum number. The
                    total length of input tokens and generated tokens is limited
                    by the model&apos;s context length.
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
