import cn from "clsx";
import * as React from "react";
import {
  ConnectionTypeCell,
  TableHead,
  ModelsCell,
  TableError,
  SkeletonCell,
  type TableHeadItem,
} from "../../components";
import { Pipeline, getComponentFromPipelineRecipe } from "../../lib";

export type PipelineTableProps = {
  pipeline: Pipeline;
  isError: boolean;
  isLoading: boolean;

  /**
   * Default is undefined
   */
  marginBottom?: string;
};

export const PipelineTable = (props: PipelineTableProps) => {
  const { pipeline, marginBottom, isError, isLoading } = props;
  const tableHeadItems = React.useMemo<TableHeadItem[]>(() => {
    const getHeadItem = (name: string) => {
      return (
        <div className="flex flex-row gap-x-[15px]">
          <div className="my-auto text-instillGrey90 text-instill-body">
            {name}
          </div>
        </div>
      );
    };

    return [
      {
        key: "pipeline-source",
        item: getHeadItem("Source"),
        width: "w-auto",
      },
      {
        key: "pipeline-models",
        item: getHeadItem("Models"),
        width: "w-auto",
      },
      {
        key: "pipeline-destination",
        item: getHeadItem("Destination"),
        width: "w-auto",
      },
    ];
  }, []);

  if (isError) {
    return <TableError />;
  }

  return (
    <table className={cn("w-full table-auto border-collapse", marginBottom)}>
      <TableHead
        bgColor="bg-instillGrey05"
        borderColor="border-instillGrey20"
        items={tableHeadItems}
      />
      <tbody>
        <tr className="bg-white border border-instillGrey20">
          {isLoading ? (
            <>
              <SkeletonCell width={null} padding="py-2 pl-6" />
              <SkeletonCell width={null} padding="py-2" />
              <SkeletonCell width={null} padding="py-2 pr-6" />
            </>
          ) : (
            <>
              <ConnectionTypeCell
                width={null}
                padding="py-2 pl-6"
                connectorDefinition={
                  getComponentFromPipelineRecipe({
                    recipe: pipeline.recipe,
                    componentName: "source",
                  })?.resource_detail.source_connector_definition_detail ?? null
                }
                connectorName={
                  getComponentFromPipelineRecipe({
                    recipe: pipeline.recipe,
                    componentName: "source",
                  })?.resource_detail.id ?? null
                }
              />
              <ModelsCell
                models={
                  getComponentFromPipelineRecipe({
                    recipe: pipeline.recipe,
                    componentName: "model",
                  }) || []
                }
                width={null}
                padding="py-2"
              />
              <ConnectionTypeCell
                width={null}
                padding="py-2 pr-6"
                connectorDefinition={
                  getComponentFromPipelineRecipe({
                    recipe: pipeline.recipe,
                    componentName: "destination",
                  })?.resource_detail.destination_connector_definition_detail ??
                  null
                }
                connectorName={
                  getComponentFromPipelineRecipe({
                    recipe: pipeline.recipe,
                    componentName: "destination",
                  })?.resource_detail.id ?? null
                }
              />
            </>
          )}
        </tr>
      </tbody>
    </table>
  );
};
