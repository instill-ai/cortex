import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Button,
  DataDestinationIcon,
  DataSourceIcon,
  DataTable,
  Dialog,
  useToast,
} from "@instill-ai/design-system";
import { isAxiosError } from "axios";
import { GeneralDeleteResourceModal } from "../../components/GeneralDeleteResourceModal";
import {
  ConnectorWithDefinition,
  ConnectorWithPipelines,
  ConnectorsWatchState,
  Model,
  Nullable,
  Pipeline,
  formatDate,
  getInstillApiErrorMessage,
  parseStatusLabel,
  useDeleteConnector,
} from "../../lib";
import {
  GeneralStateCell,
  GeneralTaskCell,
  ImageWithFallback,
  PaginationListContainerProps,
  SortIcon,
  TableCell,
  TableError,
} from "../../components";
import { AITablePlaceholder } from "./AITablePlaceholder";

export type AIsTableProps = {
  ais: ConnectorWithPipelines[];
  aisWatchState: ConnectorsWatchState;
  isError: boolean;
  isLoading: boolean;
} & Pick<PaginationListContainerProps, "marginBottom">;

export const AIsTable = (props: AIsTableProps) => {
  const { ais, aisWatchState, marginBottom, isError, isLoading } = props;

  const deleteConnector = useDeleteConnector();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const handleDeleteAI = (
    resource: Nullable<ConnectorWithDefinition | Pipeline | Model>
  ) => {
    if (!resource) return;

    setIsDeleting(true);

    deleteConnector.mutate(
      {
        connectorName: resource.name,
        accessToken: null,
      },
      {
        onSuccess: () => {
          setIsDeleting(false);
          toast({
            title: "AI deleted",
            variant: "alert-success",
            size: "large",
          });
        },
        onError: (error) => {
          setIsDeleting(false);
          if (isAxiosError(error)) {
            toast({
              title: "Something went wrong when delete the AI",
              description: getInstillApiErrorMessage(error),
              variant: "alert-error",
              size: "large",
            });
          } else {
            toast({
              title: "Something went wrong when delete the AI",
              variant: "alert-error",
              description: "Please try again later",
              size: "large",
            });
          }
        },
      }
    );
  };

  const columns: ColumnDef<ConnectorWithPipelines>[] = [
    {
      accessorKey: "id",
      header: () => <div className="min-w-[300px] text-left">Model Name</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left">
            <TableCell
              primaryLink={`/ais/${row.getValue("id")}`}
              primaryText={row.getValue("id")}
              secondaryLink={null}
              secondaryText={row.original.connector_definition.title}
              iconElement={
                <ImageWithFallback
                  src={`/icons/${row.original.connector_definition.vendor}/${row.original.connector_definition.icon}`}
                  width={16}
                  height={16}
                  alt={`${row.original.id}-icon`}
                  fallbackImg={
                    row.original.connector_definition.name
                      .split("/")[0]
                      .split("-")[0] === "source" ? (
                      <DataSourceIcon
                        width="w-4"
                        height="h-4"
                        color="fill-semantic-bg-secondary-base-bg"
                        position="my-auto"
                      />
                    ) : (
                      <DataDestinationIcon
                        width="w-4"
                        height="h-4"
                        color="fill-semantic-bg-secondary-base-bg"
                        position="my-auto"
                      />
                    )
                  }
                />
              }
            />
          </div>
        );
      },
    },
    {
      accessorKey: "task",
      header: () => <div className="text-center">Task</div>,
      cell: ({ row }) => {
        return (
          <GeneralTaskCell modelTask={row.getValue("task")} className={null} />
        );
      },
    },
    {
      accessorKey: "create_time",
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              className="gap-x-2 py-0"
              variant="tertiaryGrey"
              size="sm"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span className="min-w-[130px]">Date added</span>
              <SortIcon type={column.getIsSorted()} />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="truncate text-center text-semantic-fg-secondary product-body-text-3-regular">
            {formatDate(row.getValue("create_time"))}
          </div>
        );
      },
    },
    {
      accessorKey: "state",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const name: string = row.original.name;
        return (
          <div className="grid justify-items-center">
            <GeneralStateCell
              width={null}
              state={
                aisWatchState
                  ? aisWatchState[name]
                    ? aisWatchState[name].state
                    : "STATE_UNSPECIFIED"
                  : "STATE_UNSPECIFIED"
              }
              padding="py-2"
              label={parseStatusLabel(row.getValue("state"))}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "uid",
      header: () => <div className="text-center"></div>,
      cell: ({ row }) => {
        return (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <div className="text-sm-semibold cursor-pointer truncate text-center text-semantic-error-default">
                Delete
              </div>
            </Dialog.Trigger>
            <Dialog.Content>
              <GeneralDeleteResourceModal
                resource={row.original}
                handleDeleteResource={handleDeleteAI}
                isDeleting={isDeleting}
              />
            </Dialog.Content>
          </Dialog.Root>
        );
      },
    },
  ];

  if (isError) {
    return (
      <DataTable
        columns={columns}
        data={[]}
        pageSize={6}
        searchPlaceholder={null}
        searchKey={null}
        isLoading={isLoading}
        loadingRows={6}
        primaryText="AI"
        secondaryText="Check and organise your AI connectors"
      >
        <TableError marginBottom="!border-0" />
      </DataTable>
    );
  }

  if (ais.length === 0 && !isLoading) {
    return (
      <DataTable
        columns={columns}
        data={[]}
        pageSize={6}
        searchPlaceholder={null}
        searchKey={null}
        isLoading={isLoading}
        loadingRows={6}
        primaryText="AI"
        secondaryText="Check and organise your AI connectors"
      >
        <AITablePlaceholder
          enableCreateButton={false}
          marginBottom="!border-0"
        />
      </DataTable>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={ais}
      pageSize={6}
      searchPlaceholder={"Search AI"}
      searchKey={"id"}
      isLoading={isLoading}
      loadingRows={6}
      primaryText="AI"
      secondaryText="Check and organise your AI connectors"
    />
  );
};
