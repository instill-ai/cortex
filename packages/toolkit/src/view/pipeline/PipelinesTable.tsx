import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, DataTable, Dialog, useToast } from "@instill-ai/design-system";

import { isAxiosError } from "axios";
import {
  formatDate,
  getInstillApiErrorMessage,
  useDeleteUserPipeline,
  type Nullable,
  type Pipeline,
  type Model,
  type ConnectorResourceWithDefinition,
} from "../../lib";
import { SortIcon, TableCell, TableError } from "../../components";
import { GeneralDeleteResourceModal } from "../../components/GeneralDeleteResourceModal";
import { PipelineTablePlaceholder } from "./PipelineTablePlaceholder";

export type PipelinesTableProps = {
  pipelines: Pipeline[];
  isError: boolean;
  isLoading: boolean;
  accessToken: Nullable<string>;
};

export const PipelinesTable = (props: PipelinesTableProps) => {
  const { pipelines, isError, isLoading, accessToken } = props;

  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const deletePipeline = useDeleteUserPipeline();
  function handleDeletePipeline(
    resource: Nullable<Pipeline | Model | ConnectorResourceWithDefinition>
  ): void {
    if (!resource) return;
    setIsDeleting(true);
    deletePipeline.mutate(
      {
        pipelineName: resource.name,
        accessToken: accessToken ? accessToken : null,
      },
      {
        onSuccess: () => {
          setIsDeleting(false);
          toast({
            title: "Pipeline deleted",
            variant: "alert-success",
            size: "large",
          });
        },
        onError: (error) => {
          setIsDeleting(false);
          if (isAxiosError(error)) {
            toast({
              title: "Something went wrong when delete the pipeline",
              description: getInstillApiErrorMessage(error),
              variant: "alert-error",
              size: "large",
            });
          } else {
            toast({
              title: "Something went wrong when delete the pipeline",
              variant: "alert-error",
              description: "Please try again later",
              size: "large",
            });
          }
        },
      }
    );
  }

  const columns: ColumnDef<Pipeline>[] = [
    {
      accessorKey: "id",
      header: () => <div className="min-w-[650px] text-left">Pipelines</div>,
      cell: ({ row }) => {
        const pipelineNameFragments = row.original.name.split("/");
        const pipelineLink = `${pipelineNameFragments[1]}/${pipelineNameFragments[2]}/${pipelineNameFragments[3]}`;

        return (
          <div className="text-left">
            <TableCell
              primaryLink={pipelineLink}
              primaryText={row.getValue("id")}
              secondaryLink={null}
              secondaryText={null}
              iconElement={null}
            />
          </div>
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
      accessorKey: "uid",
      header: () => <div className="max-w-[100px] text-center"></div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <div className="text-sm-semibold cursor-pointer truncate text-center text-semantic-error-default">
                  Delete
                </div>
              </Dialog.Trigger>
              <Dialog.Content>
                <GeneralDeleteResourceModal
                  resource={row.original}
                  handleDeleteResource={handleDeletePipeline}
                  isDeleting={isDeleting}
                />
              </Dialog.Content>
            </Dialog.Root>
          </div>
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
        primaryText="Pipelines"
        secondaryText="Check your pipelines"
      >
        <TableError marginBottom="!border-0" />
      </DataTable>
    );
  }

  if (pipelines.length === 0 && !isLoading) {
    return (
      <DataTable
        columns={columns}
        data={[]}
        pageSize={6}
        searchPlaceholder={null}
        searchKey={null}
        isLoading={isLoading}
        loadingRows={6}
        primaryText="Pipelines"
        secondaryText="Check your pipelines"
      >
        <PipelineTablePlaceholder
          enableCreateButton={false}
          marginBottom="!border-0"
        />
      </DataTable>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={pipelines}
      pageSize={6}
      searchPlaceholder={"Search Pipelines"}
      searchKey={"id"}
      isLoading={isLoading}
      loadingRows={6}
      primaryText="Pipelines"
      secondaryText="Check your pipelines"
    />
  );
};
