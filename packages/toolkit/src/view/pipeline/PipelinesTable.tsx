import { useMemo, useState } from "react";

import {
  ConnectionTypeCell,
  ModeCell,
  NameCell,
  TableHead,
  TableHeadItem,
  StateOverview,
  TableLoadingProgress,
  PaginationListContainer,
  ModelCountsCell,
} from "../../components";
import {
  chunk,
  env,
  useSearchedResources,
  useStateOverviewCounts,
  type Nullable,
  type Pipeline,
  type PipelinesWatchState,
} from "../../lib";
import { PipelineTablePlaceholder } from "./PipelineTablePlaceholder";

export type PipelinesTableProps = {
  pipelines: Nullable<Pipeline[]>;
  pipelinesWatchState: Nullable<PipelinesWatchState>;
  marginBottom: Nullable<string>;
};

export const PipelinesTable = ({
  pipelines,
  pipelinesWatchState,
  marginBottom,
}: PipelinesTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<Nullable<string>>(null);

  const searchedPipelines = useSearchedResources({
    resources: pipelines || null,
    searchTerm,
  });

  const searchedPipelinePages = useMemo(() => {
    return chunk(searchedPipelines, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedPipelines]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchedPipelines,
    pipelinesWatchState
  );

  const tableHeadItems = useMemo<TableHeadItem[]>(() => {
    return [
      {
        key: "pipeline-state-overview-head",
        item: (
          <StateOverview
            errorCounts={stateOverviewCounts?.error || 0}
            offlineCounts={stateOverviewCounts?.offline || 0}
            onlineCounts={stateOverviewCounts?.online || 0}
          />
        ),
        width: "w-auto",
      },
      {
        key: "pipeline-mode-head",
        item: "Mode",
        width: "w-[160px]",
      },
      {
        key: "pipeline-source-head",
        item: "Source",
        width: "w-[160px]",
      },
      {
        key: "pipeline-models-head",
        item: "Models",
        width: "w-[160px]",
      },
      {
        key: "pipeline-destination-head",
        item: "Destination",
        width: "w-[160px]",
      },
    ];
  }, [stateOverviewCounts]);

  return (
    <PaginationListContainer
      title="Pipeline"
      description="These are the pipelines you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={searchedPipelinePages.length}
      displaySearchField={pipelines?.length !== 0 ? true : false}
      marginBottom={marginBottom}
    >
      {pipelines ? (
        pipelines.length === 0 ? (
          <PipelineTablePlaceholder
            enablePlaceholderCreateButton={false}
            marginBottom={null}
          />
        ) : (
          <table className="table-auto border-collapse">
            <TableHead
              borderColor="border-instillGrey20"
              bgColor="bg-instillGrey05"
              items={tableHeadItems}
            />
            <tbody>
              {searchedPipelinePages[currentPage]
                ? searchedPipelinePages[currentPage].map((pipeline) => (
                    <tr
                      key={pipeline.name}
                      className="bg-white border border-instillGrey20"
                    >
                      <NameCell
                        name={pipeline.id}
                        width={null}
                        state={
                          pipelinesWatchState
                            ? pipelinesWatchState[pipeline.name]
                              ? pipelinesWatchState[pipeline.name].state
                              : "STATE_UNSPECIFIED"
                            : "STATE_UNSPECIFIED"
                        }
                        padding="py-2 pl-6"
                        link={`/pipelines/${pipeline.id}`}
                      />
                      <ModeCell width="" mode={pipeline.mode} padding="py-2" />
                      <ConnectionTypeCell
                        width={null}
                        connectorDefinition={
                          pipeline.recipe.source.source_connector_definition
                        }
                        connectorName={pipeline.recipe.source.id}
                        padding="py-2"
                      />
                      <ModelCountsCell
                        modelCount={pipeline.recipe.models.length}
                        width={null}
                        padding="py-2"
                      />
                      <ConnectionTypeCell
                        width={null}
                        connectorDefinition={
                          pipeline.recipe.destination
                            .destination_connector_definition
                        }
                        connectorName={pipeline.recipe.destination.id}
                        padding="py-2 pr-6"
                      />
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        )
      ) : (
        <TableLoadingProgress marginBottom={null} />
      )}
    </PaginationListContainer>
  );
};
