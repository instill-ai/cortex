import * as React from "react";
import {
  ConnectionTypeCell,
  ModeCell,
  NameCell,
  TableHead,
  TableHeadItem,
  StateOverview,
  PaginationListContainer,
  ModelCountsCell,
  TableError,
  SkeletonCell,
  PaginationListContainerProps,
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
  pipelines: Pipeline[];
  pipelinesWatchState: PipelinesWatchState;
  isError: boolean;
  isLoading: boolean;
} & Pick<PaginationListContainerProps, "marginBottom">;

export const PipelinesTable = (props: PipelinesTableProps) => {
  const { pipelines, pipelinesWatchState, marginBottom, isError, isLoading } =
    props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We will only use searched resource when user input search term

  const searchedPipelines = useSearchedResources({
    resources: pipelines,
    searchTerm,
  });

  const pipelinePages = React.useMemo(() => {
    if (!searchTerm) {
      return chunk(pipelines, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
    }
    return chunk(searchedPipelines, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedPipelines, pipelines, searchTerm]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchTerm ? searchedPipelines : pipelines,
    pipelinesWatchState,
    isLoading
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
        totalPage={pipelinePages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError />
      </PaginationListContainer>
    );
  }

  if (pipelines.length === 0 && !isLoading) {
    return (
      <PaginationListContainer
        title="Pipeline"
        description="These are the pipelines you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={pipelinePages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <PipelineTablePlaceholder enableCreateButton={false} />
      </PaginationListContainer>
    );
  }

  return (
    <PaginationListContainer
      title="Pipeline"
      description="These are the pipelines you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={pipelinePages.length}
      disabledSearchField={isLoading ? true : false}
      marginBottom={marginBottom}
    >
      <table className="table-auto border-collapse">
        <TableHead
          borderColor="border-instillGrey20"
          bgColor="bg-instillGrey05"
          items={tableHeadItems}
        />
        <tbody>
          {isLoading
            ? [...Array(5).keys()].map((e) => (
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
            : pipelinePages[currentPage]
            ? pipelinePages[currentPage].map((pipeline) => (
                <tr
                  key={pipeline.name}
                  className="bg-white border border-instillGrey20"
                >
                  <NameCell
                    name={pipeline.id}
                    width={null}
                    state={
                      pipelinesWatchState[pipeline.name]
                        ? pipelinesWatchState[pipeline.name].state
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
