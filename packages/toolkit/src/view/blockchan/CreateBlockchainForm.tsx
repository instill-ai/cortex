import cn from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BasicProgressMessageBox,
  Form,
  Input,
  ProgressMessageBoxState,
  Select,
  Switch,
  Textarea,
  Logos,
} from "@instill-ai/design-system";

import { isAxiosError } from "axios";
import {
  CreateConnectorPayload,
  Nullable,
  getInstillApiErrorMessage,
  sendAmplitudeData,
  useAmplitudeCtx,
  useCreateConnector,
} from "../../lib";

const CreateAIFormSchema = z
  .object({
    id: z.string().min(1, { message: "ID is required" }),
    description: z.string().optional(),
    connector_definition_name: z.string(),
    configuration: z.object({
      capture_token: z.string().optional(),
      creator_name: z.string().optional(),
      license: z.string().optional(),
      asset_type: z.string().optional(),
      metadata_texts: z.boolean().optional(),
      metadata_structured_data: z.boolean().optional(),
      metadata_metadata: z.boolean().optional(),
    }),
  })
  .superRefine((state, ctx) => {
    if (
      state.connector_definition_name ===
      "connector-definitions/numbers-blockchain-nit"
    ) {
      if (!state.configuration.capture_token) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Capture token is required",
          path: ["configuration", "capture_token"],
        });
      }

      if (!state.configuration.creator_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Creator name is required",
          path: ["configuration", "creator_name"],
        });
      }

      if (!state.configuration.license) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "License is required",
          path: ["configuration", "license"],
        });
      }

      if (!state.configuration.asset_type) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Asset type is required",
          path: ["configuration", "asset_type"],
        });
      }
    }
  });

export type CreateBlockchainFormProps = {
  accessToken: Nullable<string>;
  onCreate: Nullable<() => void>;
};

export const CreateBlockchainForm = (props: CreateBlockchainFormProps) => {
  const { accessToken, onCreate } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();
  const form = useForm<z.infer<typeof CreateAIFormSchema>>({
    resolver: zodResolver(CreateAIFormSchema),
    defaultValues: {
      connector_definition_name: "connector-definitions/numbers-blockchain-nit",
      configuration: {
        metadata_texts: false,
        metadata_structured_data: false,
        metadata_metadata: false,
      },
    },
  });

  const [messageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const createConnector = useCreateConnector();

  function onSubmit(data: z.infer<typeof CreateAIFormSchema>) {
    form.trigger([
      "configuration",
      "connector_definition_name",
      "description",
      "id",
    ]);

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
            sendAmplitudeData("create_blockchain", {
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
                  <Form.Label htmlFor={field.name}>ID *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="text"
                        value={field.value ?? ""}
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
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value placeholder="Select an AI connector type" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      <Select.Item
                        key="connector-definitions/numbers-blockchain-nit"
                        value="connector-definitions/numbers-blockchain-nit"
                        className="my-auto text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <Logos.Number className="w-5 h-5 my-auto" />
                          <p className="my-auto">NumbersProtocol NIT</p>
                        </div>
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
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
            name="configuration.capture_token"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/numbers-blockchain-nit"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>Capture token *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="password"
                        value={field.value ?? ""}
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    Capture token from NumbersProtocol.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.license"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/numbers-blockchain-nit"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>License *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="text"
                        value={field.value ?? ""}
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    License of the Web3 asset.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.creator_name"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/numbers-blockchain-nit"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>Creator Name *</Form.Label>
                  <Form.Control>
                    <Input.Root className="!rounded-none">
                      <Input.Core
                        {...field}
                        id={field.name}
                        type="text"
                        value={field.value ?? ""}
                      />
                    </Input.Root>
                  </Form.Control>
                  <Form.Description>
                    Name of the creator who owns the Web3 asset.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.asset_type"
            render={({ field }) => {
              return (
                <Form.Item
                  className={
                    form.getValues("connector_definition_name") ===
                    "connector-definitions/numbers-blockchain-nit"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label htmlFor={field.name}>Asset type *</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value placeholder="Select an asset type" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {["images"].map((item) => (
                        <Select.Item
                          className="my-auto capitalize text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                          key={item}
                          value={item}
                        >
                          <p className="my-auto">{item}</p>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Form.Description>
                    The type of asset to be added to Blockchain.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.metadata_texts"
            render={({ field }) => {
              return (
                <Form.Item
                  className={cn(
                    "flex !flex-row items-center justify-between border border-semantic-bg-line py-3 pl-3 pr-6",
                    form.getValues("connector_definition_name") ===
                      "connector-definitions/numbers-blockchain-nit"
                      ? ""
                      : "hidden"
                  )}
                >
                  <div className="space-y-1">
                    <Form.Label>
                      Add input texts to Blockchain&apos;s metadata
                    </Form.Label>
                    <Form.Description>
                      Add the texts input as the metadata to Blockchain.
                    </Form.Description>
                  </div>
                  <Form.Control>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </Form.Control>
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.metadata_structured_data"
            render={({ field }) => {
              return (
                <Form.Item
                  className={cn(
                    "flex !flex-row items-center justify-between border border-semantic-bg-line py-3 pl-3 pr-6",
                    form.getValues("connector_definition_name") ===
                      "connector-definitions/numbers-blockchain-nit"
                      ? ""
                      : "hidden"
                  )}
                >
                  <div className="space-y-1">
                    <Form.Label>
                      Add input structured_data to Blockchain&apos;s metadata
                    </Form.Label>
                    <Form.Description>
                      Add the structured_data input as the metadata to
                      Blockchain.
                    </Form.Description>
                  </div>
                  <Form.Control>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </Form.Control>
                </Form.Item>
              );
            }}
          />
          <Form.Field
            control={form.control}
            name="configuration.metadata_metadata"
            render={({ field }) => {
              return (
                <Form.Item
                  className={cn(
                    "flex !flex-row items-center justify-between border border-semantic-bg-line py-3 pl-3 pr-6",
                    form.getValues("connector_definition_name") ===
                      "connector-definitions/numbers-blockchain-nit"
                      ? ""
                      : "hidden"
                  )}
                >
                  <div className="space-y-1">
                    <Form.Label>
                      Add input metadata to Blockchain&apos;s metadata
                    </Form.Label>
                    <Form.Description>
                      Add the metadata input as the metadata to Blockchain.
                    </Form.Description>
                  </div>
                  <Form.Control>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </Form.Control>
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
