import * as React from "react";
import {
  ConnectionTypeCell,
  PipelinesCell,
  NameCell,
  TableHeadItem,
  TableHead,
  StateOverview,
  PaginationListContainer,
  TableError,
  SkeletonCell,
} from "../../components";
import {
  useSearchedResources,
  useStateOverviewCounts,
  chunk,
  env,
  type SourceWithPipelines,
  type Nullable,
  type ConnectorsWatchState,
} from "../../lib";
import { SourceTablePlaceholder } from "./SourceTablePlaceholder";

export type SourcesTableProps = {
  sources: SourceWithPipelines[];
  sourcesWatchState: ConnectorsWatchState;
  isError: boolean;
  isLoading: boolean;
  marginBottom?: string;
};

export const SourcesTable = ({
  sources,
  sourcesWatchState,
  marginBottom,
  isError,
  isLoading,
}: SourcesTableProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We will only use searched resource when user input search term

  const searchedSources = useSearchedResources({
    resources: sources,
    searchTerm,
  });

  const sourcePages = React.useMemo(() => {
    if (!searchTerm) {
      return chunk(sources, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
    }
    return chunk(searchedSources, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedSources, sources]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchTerm ? searchedSources : sources,
    sourcesWatchState,
    isLoading
  );

  const tableHeadItems = React.useMemo<TableHeadItem[]>(() => {
    return [
      {
        key: "connector-state-overview-head",
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
        key: "connector-type-head",
        item: "Definition",
        width: "w-[240px]",
      },
      {
        key: "connector-pipelines-head",
        item: "Pipelines",
        width: "w-[240px]",
      },
    ];
  }, [stateOverviewCounts]);

  if (isError) {
    return (
      <PaginationListContainer
        title="Source"
        description="These are the sources you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={sourcePages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError marginBottom={null} />
      </PaginationListContainer>
    );
  }

  if (sources.length === 0 && !isLoading) {
    return (
      <PaginationListContainer
        title="Source"
        description="These are the sources you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={sourcePages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <SourceTablePlaceholder
          enablePlaceholderCreateButton={false}
          marginBottom={null}
        />
      </PaginationListContainer>
    );
  }

  return (
    <PaginationListContainer
      title="Source"
      description="These are the sources you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={sourcePages.length}
      disabledSearchField={isLoading ? false : true}
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
                </tr>
              ))
            : sourcePages[currentPage]
            ? sourcePages[currentPage].map((source) => (
                <tr
                  key={source.name}
                  className="bg-white border border-instillGrey20"
                >
                  <NameCell
                    name={source.id}
                    width={null}
                    state={
                      sourcesWatchState
                        ? sourcesWatchState[source.name]
                          ? sourcesWatchState[source.name].state
                          : "STATE_UNSPECIFIED"
                        : "STATE_UNSPECIFIED"
                    }
                    padding="py-2 pl-6"
                    link={`/sources/${source.id}`}
                  />
                  <ConnectionTypeCell
                    connectorDefinition={source.source_connector_definition}
                    connectorName={source.id}
                    width={null}
                    padding="py-2"
                  />
                  <PipelinesCell
                    width={null}
                    padding="py-2 pr-6"
                    pipelineCount={source.pipelines.length}
                  />
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </PaginationListContainer>
  );
};
