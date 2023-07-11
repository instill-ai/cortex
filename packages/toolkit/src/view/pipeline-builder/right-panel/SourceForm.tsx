import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

import {
  Button,
  Form,
  Icons,
  Select,
  useToast,
} from "@instill-ai/design-system";
import {
  getInstillApiErrorMessage,
  useConnectorDefinitions,
  useConnectors,
  useCreateConnector,
  useConnectConnector,
  useDisonnectConnector,
  usePipelineBuilderStore,
  type CreateConnectorPayload,
  type Nullable,
  type IncompleteConnectorWithWatchState,
  type ConnectorWithWatchState,
} from "../../../lib";
import { ImageWithFallback } from "../../../components";

export type SourceFormProps = {
  source: ConnectorWithWatchState | IncompleteConnectorWithWatchState;
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

const SourceFormSchema = z.object({
  sourceDefinition: z.string(),
});

export const SourceForm = (props: SourceFormProps) => {
  const { source, accessToken, enableQuery } = props;

  // We will disable all the fields if the connector is public (which mean
  // it is provided by Instill AI)
  let disabledAll = false;
  if ("visibility" in source && source.visibility === "VISIBILITY_PUBLIC") {
    disabledAll = true;
  }

  if (
    source.connector_definition_name === "connector-definitions/source-http" ||
    source.connector_definition_name === "connector-definitions/source-grpc"
  ) {
    disabledAll = true;
  }

  const form = useForm<z.infer<typeof SourceFormSchema>>({
    resolver: zodResolver(SourceFormSchema),
    defaultValues: {
      sourceDefinition: source.connector_definition_name,
    },
  });

  // Read the state before render to subscribe the form state through Proxy
  const {
    reset,
    formState: { isDirty },
  } = form;

  const updateSelectedNode = usePipelineBuilderStore(
    (state) => state.updateSelectedNode
  );

  const sourceDefinitions = useConnectorDefinitions({
    connectorType: "CONNECTOR_TYPE_SOURCE",
    accessToken,
    enabled: enableQuery,
  });

  const sources = useConnectors({
    connectorType: "CONNECTOR_TYPE_SOURCE",
    accessToken,
    enabled: enableQuery,
  });

  React.useEffect(() => {
    reset({
      sourceDefinition: source.connector_definition_name,
    });
  }, [reset, source]);

  const { toast } = useToast();

  const createConnector = useCreateConnector();

  async function handleCreateSource() {
    const payload: CreateConnectorPayload = {
      connectorName: `connectors/${source.id}`,
      connector_definition_name: source.connector_definition_name,
      configuration: {},
    };

    createConnector.mutate(
      {
        payload,
        accessToken,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Successfully create source",
            variant: "alert-success",
            size: "large",
          });

          // We don't need to update the node here, at the root of the pipeline-builder,
          // we have a listener to update the node when the data had changed.
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            toast({
              title: "Something went wrong when create the source",
              description: getInstillApiErrorMessage(error),
              variant: "alert-error",
              size: "large",
            });
          } else {
            toast({
              title: "Something went wrong when create the source",
              variant: "alert-error",
              size: "large",
            });
          }
        },
      }
    );
  }

  const [isConnecting, setIsConnecting] = React.useState(false);
  const connectSource = useConnectConnector();
  const disconnectSource = useDisonnectConnector();

  const handleConnectSource = async function () {
    if (!source) return;

    setIsConnecting(true);

    const oldState = source.watchState;

    if (
      source.watchState === "STATE_CONNECTED" ||
      source.watchState === "STATE_ERROR"
    ) {
      disconnectSource.mutate(
        {
          connectorName: source.name,
          accessToken,
        },
        {
          onSuccess: () => {
            toast({
              title: `Successfully disconnect ${source.id}`,
              variant: "alert-success",
              size: "small",
            });
            setIsConnecting(false);

            updateSelectedNode((prev) => {
              if (prev === null) return prev;

              return {
                ...prev,
                data: {
                  ...prev.data,
                  connector: {
                    ...prev.data.connector,
                    watchState: "STATE_DISCONNECTED",
                  },
                },
              };
            });
          },
          onError: (error) => {
            setIsConnecting(false);
            updateSelectedNode((prev) => {
              if (prev === null) return prev;

              return {
                ...prev,
                data: {
                  ...prev.data,
                  connector: {
                    ...prev.data.connector,
                    watchState: oldState,
                  },
                },
              };
            });

            if (isAxiosError(error)) {
              toast({
                title: "Something went wrong when disconnect the source",
                variant: "alert-error",
                size: "large",
                description: getInstillApiErrorMessage(error),
              });
            } else {
              toast({
                title: "Something went wrong when disconnect the source",
                variant: "alert-error",
                size: "large",
                description: "Please try again later",
              });
            }
          },
        }
      );
    } else {
      connectSource.mutate(
        {
          connectorName: source.name,
          accessToken,
        },
        {
          onSuccess: () => {
            toast({
              title: `Successfully connect ${source.id}`,
              variant: "alert-success",
              size: "small",
            });
            setIsConnecting(false);
            updateSelectedNode((prev) => {
              if (prev === null) return prev;

              return {
                ...prev,
                data: {
                  ...prev.data,
                  connector: {
                    ...prev.data.connector,
                    watchState: "STATE_CONNECTED",
                  },
                },
              };
            });
          },
          onError: (error) => {
            setIsConnecting(false);
            updateSelectedNode((prev) => {
              if (prev === null) return prev;

              return {
                ...prev,
                data: {
                  ...prev.data,
                  connector: {
                    ...prev.data.connector,
                    watchState: oldState,
                  },
                },
              };
            });
            if (isAxiosError(error)) {
              toast({
                title: "Something went wrong when connect the source",
                variant: "alert-error",
                size: "large",
                description: getInstillApiErrorMessage(error),
              });
            } else {
              toast({
                title: "Something went wrong when connect the source",
                variant: "alert-error",
                size: "large",
                description: "Please try again later",
              });
            }
          },
        }
      );
    }
  };

  let disabledSubmit = false;

  if (sources.isSuccess) {
    if (sources.data.some((e) => e.name === source.name)) {
      disabledSubmit = true;
    }
  } else {
    disabledSubmit = true;
  }

  return (
    <div className="flex w-full flex-col">
      <Form.Root {...form}>
        <form
          className="flex w-full flex-col"
          onSubmit={form.handleSubmit(handleCreateSource)}
        >
          <div className="mb-10">
            <Form.Field
              control={form.control}
              name="sourceDefinition"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>Source definition</Form.Label>
                    <Form.Control>
                      <Select.Root
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={true}
                      >
                        <Select.Trigger>
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                          {sourceDefinitions.isSuccess
                            ? sourceDefinitions.data.map((definition) => (
                                <Select.Item
                                  key={definition.name}
                                  value={definition.name}
                                >
                                  <div className="flex w-full flex-row gap-x-2">
                                    <ImageWithFallback
                                      src={`/icons/${definition.vendor}/${definition.icon}`}
                                      width={24}
                                      height={24}
                                      alt={`${definition.title}-icon`}
                                      fallbackImg={
                                        <Icons.Box className="h-6 w-6 stroke-semantic-fg-primary" />
                                      }
                                    />
                                    <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                                      {definition.id}
                                    </p>
                                  </div>
                                </Select.Item>
                              ))
                            : null}
                        </Select.Content>
                      </Select.Root>
                    </Form.Control>
                  </Form.Item>
                );
              }}
            />
          </div>
          <div className="flex w-full flex-row-reverse gap-x-4">
            <Button
              onClick={handleConnectSource}
              className="gap-x-2"
              variant="primary"
              size="lg"
              type="button"
              disabled={
                disabledAll ? disabledAll : "uid" in source ? false : true
              }
            >
              {source.watchState === "STATE_CONNECTED" ||
              source.watchState === "STATE_ERROR"
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
              ) : source.watchState === "STATE_CONNECTED" ||
                source.watchState === "STATE_ERROR" ? (
                <Icons.Stop className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              ) : (
                <Icons.Play className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              )}
            </Button>
            <Button
              type="submit"
              variant="secondaryColour"
              disabled={disabledAll ? disabledAll : disabledSubmit}
              size={isDirty ? "lg" : "md"}
              className="gap-x-2"
            >
              {sources.isSuccess
                ? sources.data.some((e) => e.id === source.id)
                  ? "Update"
                  : "Create"
                : ""}
              <Icons.Save01 className="h-4 w-4 stroke-semantic-accent-on-bg group-disabled:stroke-semantic-fg-disabled" />
            </Button>
          </div>
        </form>
      </Form.Root>
    </div>
  );
};
