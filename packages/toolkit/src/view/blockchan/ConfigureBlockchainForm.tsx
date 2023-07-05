import cn from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BasicProgressMessageBox,
  Form,
  Input,
  OutlineButton,
  ProgressMessageBoxState,
  Select,
  SolidButton,
  Switch,
  Textarea,
} from "@instill-ai/design-system";

import { isAxiosError } from "axios";
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
import { DeleteResourceModal } from "../../components";
import { shallow } from "zustand/shallow";

export const ConfigureBlockchainFormSchema = z
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

const modalSelector = (state: ModalStore) => ({
  closeModal: state.closeModal,
  openModal: state.openModal,
});

export type ConfigureBlockchainFormProps = {
  accessToken: Nullable<string>;
  onDelete: Nullable<() => void>;
  onConfigure: Nullable<() => void>;
  onTestConnection: Nullable<() => void>;
  blockchain: ConnectorWithDefinition;
  disabledConfigure?: boolean;
  disabledDelete?: boolean;
  disabledTestConnection?: boolean;
};

export const ConfigureBlockchainForm = (
  props: ConfigureBlockchainFormProps
) => {
  const {
    accessToken,
    onDelete,
    onConfigure,
    onTestConnection,
    blockchain,
    disabledConfigure,
    disabledDelete,
    disabledTestConnection,
  } = props;

  const { amplitudeIsInit } = useAmplitudeCtx();

  const { openModal, closeModal } = useModalStore(modalSelector, shallow);

  const form = useForm<z.infer<typeof ConfigureBlockchainFormSchema>>({
    resolver: zodResolver(ConfigureBlockchainFormSchema),
    defaultValues: {
      ...blockchain,
    },
  });

  React.useEffect(() => {
    form.reset({
      ...blockchain,
    });
  }, [blockchain, form]);

  const [messageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const updateConnector = useUpdateConnector();

  function onSubmit(data: z.infer<typeof ConfigureBlockchainFormSchema>) {
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
  const handleDeleteBlockchain = React.useCallback(
    function () {
      if (!blockchain) return;

      setMessageBoxState(() => ({
        activate: true,
        status: "progressing",
        description: null,
        message: "Deleting...",
      }));

      closeModal();

      deleteConnector.mutate(
        {
          connectorName: blockchain.name,
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
              sendAmplitudeData("delete_blockchain", {
                type: "critical_action",
                process: "blockchain",
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
                message: "Something went wrong when delete the blockchain",
              }));
            }
          },
        }
      );
    },
    [
      blockchain,
      amplitudeIsInit,
      deleteConnector,
      closeModal,
      onDelete,
      accessToken,
    ]
  );

  const handleTestBlockchain = React.useCallback(
    async function () {
      if (!blockchain) return;

      setMessageBoxState(() => ({
        activate: true,
        status: "progressing",
        description: null,
        message: "Testing...",
      }));

      try {
        const state = await testConnectorConnectionAction({
          connectorName: blockchain.name,
          accessToken,
        });

        setMessageBoxState(() => ({
          activate: true,
          status: state === "STATE_ERROR" ? "error" : "success",
          description: null,
          message: `The blockchain's state is ${state}`,
        }));

        if (onTestConnection) onTestConnection();
      } catch (err) {
        setMessageBoxState(() => ({
          activate: true,
          status: "error",
          description: null,
          message: "Something went wrong when test the blockchain",
        }));
      }
    },
    [accessToken, blockchain, onTestConnection]
  );

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
                        disabled={true}
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
                    disabled={true}
                  >
                    <Form.Control>
                      <Select.Trigger className="w-full !rounded-none">
                        <Select.Value placeholder="Select an blockchain connector type" />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      <Select.Item
                        key="connector-definitions/numbers-blockchain-nit"
                        value="connector-definitions/numbers-blockchain-nit"
                        className="my-auto text-semantic-fg-primary product-body-text-2-regular group-hover:text-semantic-bg-primary data-[highlighted]:text-semantic-bg-primary"
                      >
                        <p className="my-auto">NumbersProtocol NIT</p>
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
                        autoComplete="off"
                        onFocus={() => {
                          if (field.value === "*****MASK*****") {
                            field.onChange("");
                          }
                        }}
                        onBlur={() => {
                          if (
                            field.value === "" &&
                            blockchain.configuration.capture_token ===
                              "*****MASK*****"
                          ) {
                            field.onChange("*****MASK*****");
                          }
                        }}
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
                        autoComplete="off"
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
                        autoComplete="off"
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

        <div className="flex flex-col">
          <div className="mb-10 flex flex-row items-center">
            <div className="flex flex-row items-center space-x-5 mr-auto">
              <SolidButton
                type="submit"
                disabled={disabledTestConnection}
                color="primary"
                onClickHandler={handleTestBlockchain}
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
        resource={blockchain}
        handleDeleteResource={handleDeleteBlockchain}
      />
    </Form.Root>
  );
};
