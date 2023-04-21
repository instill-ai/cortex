import * as React from "react";
import {
  ConnectionTypeCell,
  PipelinesCell,
  NameCell,
  PaginationListContainer,
  StateOverview,
  TableHead,
  TableError,
  SkeletonCell,
  type TableHeadItem,
} from "../../components";
import {
  useStateOverviewCounts,
  useSearchedResources,
  chunk,
  env,
  type DestinationWithPipelines,
  type Nullable,
  type ConnectorsWatchState,
} from "../../lib";
import { DestinationTablePlaceholder } from "./DestinationTablePlaceholder";

export type DestinationsTableProps = {
  destinations: Nullable<DestinationWithPipelines[]>;
  destinationsWatchState: Nullable<ConnectorsWatchState>;
  isError: boolean;
  isLoading: boolean;
  marginBottom?: string;
};

export const DestinationsTable = ({
  destinations,
  destinationsWatchState,
  marginBottom,
  isError,
  isLoading,
}: DestinationsTableProps) => {
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

  const searchedDestinations = useSearchedResources({
    resources: destinations || null,
    searchTerm,
  });

  const searchedDestinationPages = React.useMemo(() => {
    return chunk(searchedDestinations, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedDestinations]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchedDestinations,
    destinationsWatchState,
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
        title="Destination"
        description="These are the destinations you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={searchedDestinationPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError marginBottom={null} />
      </PaginationListContainer>
    );
  }

  if (destinations?.length === 0) {
    return (
      <PaginationListContainer
        title="Destination"
        description="These are the destinations you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={searchedDestinationPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <DestinationTablePlaceholder
          enablePlaceholderCreateButton={false}
          marginBottom={null}
        />
      </PaginationListContainer>
    );
  }

  return (
    <PaginationListContainer
      title="Destination"
      description="These are the destinations you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={searchedDestinationPages.length}
      disabledSearchField={loaded ? false : true}
      marginBottom={marginBottom}
    >
      <table className="table-fixed border-collapse">
        <TableHead
          borderColor="border-instillGrey20"
          bgColor="bg-instillGrey05"
          items={tableHeadItems}
        />
        <tbody>
          {!destinations || !loaded
            ? [0, 1, 2, 3, 4].map((e) => (
                <tr
                  key={`pipelines-table-skeleton-${e}`}
                  className="bg-white border border-instillGrey20"
                >
                  <SkeletonCell width={null} padding="py-2 pl-6 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                </tr>
              ))
            : searchedDestinationPages.length !== 0
            ? searchedDestinationPages[currentPage].map((destination) => (
                <tr
                  key={destination.name}
                  className="bg-white border border-instillGrey20"
                >
                  <NameCell
                    name={destination.id}
                    width="w-full"
                    state={
                      destinationsWatchState
                        ? destinationsWatchState[destination.name]
                          ? destinationsWatchState[destination.name].state
                          : "STATE_UNSPECIFIED"
                        : "STATE_UNSPECIFIED"
                    }
                    link={`/destinations/${destination.id}`}
                    padding="pl-6 py-2"
                  />
                  <ConnectionTypeCell
                    connectorDefinition={
                      destination.destination_connector_definition
                    }
                    connectorName={destination.id}
                    width="w-full"
                    padding="py-2"
                  />
                  <PipelinesCell
                    width="w-full"
                    pipelineCount={destination.pipelines.length}
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
