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
import { BlockchainTablePlaceholder } from "./BlockchainTablePlaceholder";

export type BlockchainsTableProps = {
  blockchains: ConnectorWithPipelines[];
  blockchainsWatchState: ConnectorsWatchState;
  isError: boolean;
  isLoading: boolean;
} & Pick<PaginationListContainerProps, "marginBottom">;

export const BlockchainsTable = (props: BlockchainsTableProps) => {
  const {
    blockchains,
    blockchainsWatchState,
    marginBottom,
    isError,
    isLoading,
  } = props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We will only use searched resource when user input search term

  const searchedBlockchains = useSearchedResources({
    resources: blockchains,
    searchTerm,
  });

  const blockchainPages = React.useMemo(() => {
    if (!searchTerm) {
      return chunk(blockchains, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
    }
    return chunk(searchedBlockchains, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedBlockchains, blockchains, searchTerm]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchTerm ? searchedBlockchains : blockchains,
    blockchainsWatchState,
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
        title="Blockchain"
        description="These are the Blockchains you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={blockchainPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError />
      </PaginationListContainer>
    );
  }

  if (blockchains.length === 0 && !isLoading) {
    return (
      <PaginationListContainer
        title="Blockchain"
        description="These are the Blockchains you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={blockchainPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <BlockchainTablePlaceholder enableCreateButton={false} />
      </PaginationListContainer>
    );
  }

  return (
    <PaginationListContainer
      title="Blockchain"
      description="These are the blockchains you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={blockchainPages.length}
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
            : blockchainPages[currentPage]
            ? blockchainPages[currentPage].map((blockchain) => (
                <tr
                  key={blockchain.name}
                  className="bg-white border border-instillGrey20"
                >
                  <NameCell
                    name={blockchain.id}
                    width={null}
                    state={
                      blockchainsWatchState
                        ? blockchainsWatchState[blockchain.name]
                          ? blockchainsWatchState[blockchain.name].state
                          : "STATE_UNSPECIFIED"
                        : "STATE_UNSPECIFIED"
                    }
                    padding="py-2 pl-6"
                    link={`/blockchains/${blockchain.id}`}
                  />
                  <ConnectionTypeCell
                    connectorDefinition={blockchain.connector_definition}
                    connectorName={blockchain.id}
                    width={null}
                    padding="py-2"
                  />
                  <VisibilityCell
                    visibility={blockchain.visibility}
                    width={null}
                    padding="py-2"
                  />
                  <PipelinesCell
                    width={null}
                    padding="py-2 pr-6"
                    pipelineCount={blockchain.pipelines.length}
                  />
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </PaginationListContainer>
  );
};
