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
  type PaginationListContainerProps,
} from "../../components";
import {
  useStateOverviewCounts,
  useSearchedResources,
  chunk,
  env,
  type ConnectorWithPipelines,
  type Nullable,
  type ConnectorsWatchState,
} from "../../lib";
import { DestinationTablePlaceholder } from "./DestinationTablePlaceholder";

export type DestinationsTableProps = {
  destinations: ConnectorWithPipelines[];
  destinationsWatchState: ConnectorsWatchState;
  isError: boolean;
  isLoading: boolean;
} & Pick<PaginationListContainerProps, "marginBottom">;

export const DestinationsTable = (props: DestinationsTableProps) => {
  const {
    destinations,
    destinationsWatchState,
    isError,
    isLoading,
    marginBottom,
  } = props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We will only use searched resource when user input search term

  const searchedDestinations = useSearchedResources({
    resources: destinations,
    searchTerm,
  });

  const destinationPages = React.useMemo(() => {
    if (!searchTerm) {
      return chunk(destinations, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
    }
    return chunk(searchedDestinations, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedDestinations, searchTerm, destinations]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchTerm ? searchedDestinations : destinations,
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
        totalPage={destinationPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError />
      </PaginationListContainer>
    );
  }

  if (destinations.length === 0 && !isLoading) {
    return (
      <PaginationListContainer
        title="Destination"
        description="These are the destinations you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={destinationPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <DestinationTablePlaceholder enableCreateButton={false} />
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
      totalPage={destinationPages.length}
      disabledSearchField={isLoading ? true : false}
      marginBottom={marginBottom}
    >
      <table className="table-fixed border-collapse">
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
            : destinationPages[currentPage]
            ? destinationPages[currentPage].map((destination) => (
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
                    connectorDefinition={destination.connector_definition}
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
