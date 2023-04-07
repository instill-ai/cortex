import { useMemo, useState } from "react";

import {
  ConnectionTypeCell,
  PipelinesCell,
  NameCell,
  TableHeadItem,
  TableHead,
  TableLoadingProgress,
  StateOverview,
  PaginationListContainer,
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
  sources: Nullable<SourceWithPipelines[]>;
  sourcesWatchState: Nullable<ConnectorsWatchState>;
  marginBottom: Nullable<string>;
};

export const SourcesTable = ({
  sources,
  sourcesWatchState,
  marginBottom,
}: SourcesTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<Nullable<string>>(null);

  const searchedSources = useSearchedResources({
    resources: sources || null,
    searchTerm,
  });

  const searchedPipelinePages = useMemo(() => {
    return chunk(searchedSources, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedSources]);

  const stateOverviewCounts = useStateOverviewCounts(searchedSources);

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
        item: "Definition",
      },
      {
        key: "connector-pipelines-head",
        item: "Pipelines",
      },
    ];
  }, [stateOverviewCounts]);

  return (
    <PaginationListContainer
      title="Source"
      description="These are the sources you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={searchedPipelinePages.length}
      displaySearchField={sources?.length !== 0 ? true : false}
      marginBottom={marginBottom}
    >
      {sources ? (
        sources.length === 0 ? (
          <SourceTablePlaceholder
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
                ? searchedPipelinePages[currentPage].map((source) => (
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
        )
      ) : (
        <TableLoadingProgress marginBottom={null} />
      )}
    </PaginationListContainer>
  );
};
