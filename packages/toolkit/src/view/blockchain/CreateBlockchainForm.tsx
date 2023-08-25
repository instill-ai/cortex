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
  getInstillApiErrorMessage,
  sendAmplitudeData,
  useAmplitudeCtx,
  useCreateConnectorResource,
  type CreateConnectorResourcePayload,
  type Nullable,
} from "../../lib";

export const CreateBlockchainFormSchema = z
  .object({
    id: z.string().min(1, { message: "ID is required" }),
    description: z.string().optional(),
    connector_definition_name: z.string(),
    configuration: z.object({
      capture_token: z.string().optional(),
      asset_type: z.string().optional(),
      metadata_texts: z.boolean().optional(),
      metadata_structured_data: z.boolean().optional(),
      metadata_metadata: z.boolean().optional(),
    }),
  })
  .superRefine((state, ctx) => {
    if (
      state.connector_definition_name ===
      "connector-definitions/blockchain-numbers"
    ) {
      if (!state.configuration.capture_token) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Capture token is required",
          path: ["configuration", "capture_token"],
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
  const form = useForm<z.infer<typeof CreateBlockchainFormSchema>>({
    resolver: zodResolver(CreateBlockchainFormSchema),
    defaultValues: {
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

  const createBlockchain = useCreateConnectorResource();

  function onSubmit(data: z.infer<typeof CreateBlockchainFormSchema>) {
    form.trigger([
      "configuration",
      "connector_definition_name",
      "description",
      "id",
    ]);

    const payload: CreateConnectorResourcePayload = {
      connectorResourceName: `connector-resources/${data.id}`,
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

    createBlockchain.mutate(
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
              message: "Something went wrong when create the Blockchain",
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
                  <Form.Label>Blockchain Connector Type</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value placeholder="Select an blockchain connector type" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      <Select.Item
                        key="connector-definitions/blockchain-numbers"
                        value="connector-definitions/blockchain-numbers"
                        className="my-auto text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <div className="flex flex-row space-x-2">
                          <Logos.Number className="w-5 h-5 my-auto" />
                          <p className="my-auto">Numbers Protocol</p>
                        </div>
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <Form.Description>
                    Select a blockchain connector type.
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
                    form.watch("connector_definition_name") ===
                    "connector-definitions/blockchain-numbers"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Capture token *</Form.Label>
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
                    Fill your Capture token in the Capture App. To access your
                    tokens, you need a Capture App account and you can sign in
                    with email or wallet to acquire the Capture Token.
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
                    form.watch("connector_definition_name") ===
                    "connector-definitions/blockchain-numbers"
                      ? ""
                      : "hidden"
                  }
                >
                  <Form.Label>Asset type *</Form.Label>
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
                    The type of asset to be added to the Blockchain.
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
                    form.watch("connector_definition_name") ===
                      "connector-definitions/blockchain-numbers"
                      ? ""
                      : "hidden"
                  )}
                >
                  <div className="space-y-1">
                    <Form.Label>{`'texts' input as asset metadata`}</Form.Label>
                    <Form.Description className="w-8/12">
                      Include the `texts` input in the asset metadata on the
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
            name="configuration.metadata_structured_data"
            render={({ field }) => {
              return (
                <Form.Item
                  className={cn(
                    "flex !flex-row items-center justify-between border border-semantic-bg-line py-3 pl-3 pr-6",
                    form.watch("connector_definition_name") ===
                      "connector-definitions/blockchain-numbers"
                      ? ""
                      : "hidden"
                  )}
                >
                  <div className="space-y-1">
                    <Form.Label>
                      {`'structured_data' input as asset metadata`}
                    </Form.Label>
                    <Form.Description className="w-8/12">
                      Include the `structured_data` input in the asset metadata
                      on the Blockchain.
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
                    form.watch("connector_definition_name") ===
                      "connector-definitions/blockchain-numbers"
                      ? ""
                      : "hidden"
                  )}
                >
                  <div className="space-y-1">
                    <Form.Label>
                      {`'metadata' input as asset metadata`}
                    </Form.Label>
                    <Form.Description className="w-8/12">
                      Include the `metadata` input in the asset metadata on the
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
