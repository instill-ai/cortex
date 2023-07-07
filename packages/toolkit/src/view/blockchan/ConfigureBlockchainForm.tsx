import cn from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BasicProgressMessageBox,
  Button,
  Form,
  Icons,
  Input,
  Logos,
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
  ConnectorWithWatchState,
  ModalStore,
  Nullable,
  UpdateConnectorPayload,
  getInstillApiErrorMessage,
  sendAmplitudeData,
  testConnectorConnectionAction,
  useAmplitudeCtx,
  useConnectConnector,
  useDeleteConnector,
  useDisonnectConnector,
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

const modalSelector = (state: ModalStore) => ({
  closeModal: state.closeModal,
  openModal: state.openModal,
});

export type ConfigureBlockchainFormProps = {
  accessToken: Nullable<string>;
  onDelete: Nullable<() => void>;
  onConfigure: Nullable<() => void>;
  onTestConnection: Nullable<() => void>;
  blockchain: ConnectorWithWatchState;
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

  // Read the state before render to subscribe the form state through Proxy
  const {
    reset,
    formState: { isDirty },
  } = form;

  React.useEffect(() => {
    reset({
      ...blockchain,
    });
  }, [blockchain, reset]);

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

  const [isConnecting, setIsConnecting] = React.useState(false);

  const connectBlockchain = useConnectConnector();
  const disconnectBlockchain = useDisonnectConnector();

  const handleConnectAI = async function () {
    if (!blockchain) return;
    setIsConnecting(true);
    if (blockchain.watchState === "STATE_CONNECTED") {
      disconnectBlockchain.mutate(
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
              message: `Successfully disconnect ${blockchain.id}`,
            }));

            setIsConnecting(false);
          },
          onError: (error) => {
            setIsConnecting(false);

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
                message: "Something went wrong when disconnect the blockchain",
              }));
            }
          },
        }
      );
    } else {
      connectBlockchain.mutate(
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
              message: `Successfully connect ${blockchain.id}`,
            }));
            setIsConnecting(false);
          },
          onError: (error) => {
            setIsConnecting(false);

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
                message: "Something went wrong when connect the blockchain",
              }));
            }
          },
        }
      );
    }
  };

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
                    disabled={true}
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
                            form.resetField("configuration.capture_token", {
                              defaultValue: "*****MASK*****",
                            });
                          }
                        }}
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
              <Button
                onClick={handleConnectAI}
                className="gap-x-2 !rounded-none"
                variant="primary"
                size="lg"
                type="button"
                disabled={false}
              >
                {blockchain.watchState === "STATE_CONNECTED"
                  ? "Disconnect"
                  : "Connect"}
                {isConnecting ? (
                  <svg
                    className="m-auto h-4 w-4 animate-spin text-white"
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
                ) : blockchain.watchState === "STATE_CONNECTED" ||
                  blockchain.watchState === "STATE_ERROR" ? (
                  <Icons.Stop className="h-4 w-4 stroke-semantic-fg-on-default group-disabled:stroke-semantic-fg-disabled" />
                ) : (
                  <Icons.Play className="h-4 w-4 stroke-semantic-fg-on-default group-disabled:stroke-semantic-fg-disabled" />
                )}
              </Button>
              <button
                className="bg-instillBlue50 hover:bg-instillBlue80 text-instillGrey05 hover:text-instillBlue10 ml-auto rounded-[1px] px-5 py-2.5 my-auto disabled:cursor-not-allowed disabled:bg-instillGrey15 disabled:text-instillGrey50"
                type="submit"
                disabled={
                  disabledConfigure ? true : isDirty === true ? false : true
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
