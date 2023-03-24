import { useMemo, useState } from "react";

import {
  ConnectionTypeCell,
  PipelinesCell,
  NameCell,
  TableLoadingProgress,
  PaginationListContainer,
  StateOverview,
  TableHead,
  type TableHeadItem,
} from "../../components";
import {
  useStateOverviewCounts,
  useSearchedResources,
  chunk,
  env,
  type DestinationWithPipelines,
  type Nullable,
} from "../../lib";
import { DestinationTablePlaceholder } from "./DestinationTablePlaceholder";

export type DestinationsTableProps = {
  destinations: Nullable<DestinationWithPipelines[]>;
  marginBottom: Nullable<string>;
};

export const DestinationsTable = ({
  destinations,
  marginBottom,
}: DestinationsTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<Nullable<string>>(null);

  const searchedDestinations = useSearchedResources({
    resources: destinations || null,
    searchTerm,
  });

  const searchedDestinationPages = useMemo(() => {
    return chunk(searchedDestinations, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedDestinations]);

  const stateOverviewCounts = useStateOverviewCounts(searchedDestinations);

  const tableHeadItems = useMemo<TableHeadItem[]>(() => {
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
      },
      {
        key: "connector-type-head",
        item: "Destination",
      },
      {
        key: "connector-pipelines-head",
        item: "Pipelines",
      },
    ];
  }, [stateOverviewCounts]);

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
          <table className="table-auto border-collapse">
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
                      width={null}
                      state={destination.connector.state}
                      link={`/destinations/${destination.id}`}
                      padding="pl-6 py-2"
                    />
                    <ConnectionTypeCell
                      connectorDefinition={
                        destination.destination_connector_definition
                      }
                      connectorName={destination.id}
                      width={null}
                      padding="py-2"
                    />
                    <PipelinesCell
                      width={null}
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
