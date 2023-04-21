import * as React from "react";
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
  TableError,
  SkeletonCell,
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
  isError: boolean;
  isLoading: boolean;
  marginBottom?: string;
};

export const PipelinesTable = ({
  pipelines,
  pipelinesWatchState,
  marginBottom,
  isError,
  isLoading,
}: PipelinesTableProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We delay the loading animation by 500ms to avoid a flickering effect
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (isLoading) return;
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const searchedPipelines = useSearchedResources({
    resources: pipelines || null,
    searchTerm,
  });

  const searchedPipelinePages = React.useMemo(() => {
    return chunk(searchedPipelines, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedPipelines]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchedPipelines,
    pipelinesWatchState,
    !loaded
  );

  const tableHeadItems = React.useMemo<TableHeadItem[]>(() => {
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

  if (isError) {
    return (
      <PaginationListContainer
        title="Pipeline"
        description="These are the pipelines you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={searchedPipelinePages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError marginBottom={null} />
      </PaginationListContainer>
    );
  }

  if (pipelines?.length === 0) {
    <PaginationListContainer
      title="Pipeline"
      description="These are the pipelines you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={searchedPipelinePages.length}
      disabledSearchField={true}
      marginBottom={marginBottom}
    >
      <PipelineTablePlaceholder
        enablePlaceholderCreateButton={false}
        marginBottom={null}
      />
    </PaginationListContainer>;
  }

  return (
    <PaginationListContainer
      title="Pipeline"
      description="These are the pipelines you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={searchedPipelinePages.length}
      disabledSearchField={loaded ? false : true}
      marginBottom={marginBottom}
    >
      <table className="table-auto border-collapse">
        <TableHead
          borderColor="border-instillGrey20"
          bgColor="bg-instillGrey05"
          items={tableHeadItems}
        />
        <tbody>
          {!pipelines || !loaded
            ? [0, 1, 2, 3, 4].map((e) => (
                <tr
                  key={`pipelines-table-skeleton-${e}`}
                  className="bg-white border border-instillGrey20"
                >
                  <SkeletonCell width={null} padding="py-2 pl-6 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                </tr>
              ))
            : searchedPipelinePages[currentPage]
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
    </PaginationListContainer>
  );
};
