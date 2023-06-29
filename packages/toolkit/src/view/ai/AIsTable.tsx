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
  PaginationListContainerProps,
  VisibilityCell,
} from "../../components";
import {
  useSearchedResources,
  useStateOverviewCounts,
  chunk,
  env,
  type ConnectorWithPipelines,
  type Nullable,
  type ConnectorsWatchState,
} from "../../lib";
import { AITablePlaceholder } from "./AITablePlaceholder";

export type AIsTableProps = {
  ais: ConnectorWithPipelines[];
  aisWatchState: ConnectorsWatchState;
  isError: boolean;
  isLoading: boolean;
} & Pick<PaginationListContainerProps, "marginBottom">;

export const AIsTable = (props: AIsTableProps) => {
  const { ais, aisWatchState, marginBottom, isError, isLoading } = props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We will only use searched resource when user input search term

  const searchedAIs = useSearchedResources({
    resources: ais,
    searchTerm,
  });

  const aiPages = React.useMemo(() => {
    if (!searchTerm) {
      return chunk(ais, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
    }
    return chunk(searchedAIs, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedAIs, ais, searchTerm]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchTerm ? searchedAIs : ais,
    aisWatchState,
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
        key: "visibility-head",
        item: "Ownership",
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
        title="AI"
        description="These are the AIs you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={aiPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError />
      </PaginationListContainer>
    );
  }

  if (ais.length === 0 && !isLoading) {
    return (
      <PaginationListContainer
        title="AI"
        description="These are the AIs you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={aiPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <AITablePlaceholder enableCreateButton={false} />
      </PaginationListContainer>
    );
  }

  return (
    <PaginationListContainer
      title="AI"
      description="These are the AIs you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={aiPages.length}
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
                </tr>
              ))
            : aiPages[currentPage]
            ? aiPages[currentPage].map((ai) => (
                <tr
                  key={ai.name}
                  className="bg-white border border-instillGrey20"
                >
                  <NameCell
                    name={ai.id}
                    width={null}
                    state={
                      aisWatchState
                        ? aisWatchState[ai.name]
                          ? aisWatchState[ai.name].state
                          : "STATE_UNSPECIFIED"
                        : "STATE_UNSPECIFIED"
                    }
                    padding="py-2 pl-6"
                    link={`/ais/${ai.id}`}
                  />
                  <ConnectionTypeCell
                    connectorDefinition={ai.connector_definition}
                    connectorName={ai.id}
                    width={null}
                    padding="py-2"
                  />
                  <VisibilityCell
                    visibility={ai.visibility}
                    width={null}
                    padding="py-2"
                  />
                  <PipelinesCell
                    width={null}
                    padding="py-2 pr-6"
                    pipelineCount={ai.pipelines.length}
                  />
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </PaginationListContainer>
  );
};
