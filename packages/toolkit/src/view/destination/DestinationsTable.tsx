import * as React from "react";
import {
  ConnectionTypeCell,
  PipelinesCell,
  NameCell,
  TableLoadingProgress,
  PaginationListContainer,
  StateOverview,
  TableHead,
  TableError,
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
  marginBottom: Nullable<string>;
  isError: boolean;
};

export const DestinationsTable = ({
  destinations,
  destinationsWatchState,
  marginBottom,
  isError,
}: DestinationsTableProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  const searchedDestinations = useSearchedResources({
    resources: destinations || null,
    searchTerm,
  });

  const searchedDestinationPages = React.useMemo(() => {
    return chunk(searchedDestinations, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedDestinations]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchedDestinations,
    destinationsWatchState
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
        displaySearchField={destinations?.length === 0 ? false : true}
        marginBottom={marginBottom}
      >
        <TableError marginBottom={null} />
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
      displaySearchField={destinations?.length === 0 ? false : true}
      marginBottom={marginBottom}
    >
      {destinations ? (
        destinations.length === 0 ? (
          <DestinationTablePlaceholder
            enablePlaceholderCreateButton={false}
            marginBottom={null}
          />
        ) : (
          <table className="table-fixed border-collapse">
            <TableHead
              borderColor="border-instillGrey20"
              bgColor="bg-instillGrey05"
              items={tableHeadItems}
            />
            {searchedDestinationPages.length !== 0 ? (
              <tbody>
                {searchedDestinationPages[currentPage].map((destination) => (
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
                ))}
              </tbody>
            ) : null}
          </table>
        )
      ) : (
        <TableLoadingProgress marginBottom={null} />
      )}
    </PaginationListContainer>
  );
};
