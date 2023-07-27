import * as React from "react";
import {
  Cell,
  GeneralStateCell,
  PaginationListContainer,
  PaginationListContainerProps,
  SkeletonCell,
  TableError,
  TableHead,
  TableHeadItem,
} from "../../components";
import { Nullable, PipelineTriggerCount, chunk, env } from "../../lib";
import { PipelineTablePlaceholder } from "../pipeline";
import Link from "next/link";
import { useRouter } from "next/router";

export type DashboardPipelinesTableProps = {
  pipelineTriggerCounts: PipelineTriggerCount[];
  isError: boolean;
  isLoading: boolean;
} & Pick<PaginationListContainerProps, "marginBottom">;

export const DashboardPipelinesTable = (
  props: DashboardPipelinesTableProps
) => {
  const router = useRouter();
  const { days } = router.query;
  const { pipelineTriggerCounts, marginBottom, isError, isLoading } = props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We will only use searched resource when user input search term

  const pipelineTriggerPages = React.useMemo(() => {
    return chunk(pipelineTriggerCounts, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [pipelineTriggerCounts]);

  const tableHeadItems = React.useMemo<TableHeadItem[]>(() => {
    return [
      {
        key: "pipeline-id-head",
        item: "Pipeline ID",
        width: "w-auto",
      },
      {
        key: "pipeline-state-overview-head",
        item: "Status",
        width: "w-[160px]",
      },
      {
        key: "pipeline-completed-triggers-head",
        item: "Completed triggers",
        width: "w-[160px]",
      },
      {
        key: "pipeline-errored-triggers-head",
        item: "Errorred triggers",
        width: "w-[160px]",
      },
    ];
  }, []);

  if (isError) {
    return (
      <PaginationListContainer
        title=""
        description=""
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={pipelineTriggerPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError />
      </PaginationListContainer>
    );
  }

  if (pipelineTriggerCounts.length === 0 && !isLoading) {
    return (
      <PaginationListContainer
        title=""
        description=""
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={pipelineTriggerPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <PipelineTablePlaceholder enableCreateButton={false} />
      </PaginationListContainer>
    );
  }

  return (
    <PaginationListContainer
      title=""
      description=""
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={null}
      setSearchTerm={setSearchTerm}
      totalPage={pipelineTriggerPages.length}
      disabledSearchField={true}
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
            ? [Array(4).keys()].map((e) => (
                <tr
                  key={`pipelines-table-skeleton-${e}`}
                  className="border border-instillGrey20 bg-white"
                >
                  <SkeletonCell width={null} padding="py-2 pl-6 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                </tr>
              ))
            : pipelineTriggerPages[currentPage]
            ? pipelineTriggerPages[currentPage]?.map((pipelineTriggerCount) => (
                <tr
                  key={pipelineTriggerCount.pipeline_uid}
                  className="border border-instillGrey20 bg-white"
                >
                  <Cell width={null} padding="py-2 pl-6">
                    <Link
                      className="truncate product-body-text-3-regular hover:underline text-semantic-fg-secondary"
                      href={`/dashboard/pipeline/${
                        pipelineTriggerCount.pipeline_id
                      }${days ? "?days=" + days : ""}`}
                    >
                      {pipelineTriggerCount.pipeline_id}
                    </Link>
                  </Cell>

                  <GeneralStateCell
                    width={null}
                    state={pipelineTriggerCount.watchState}
                    padding="py-2"
                  />

                  <Cell width={null} padding="py-2">
                    <p className="truncate product-body-text-3-regular text-semantic-fg-secondary">
                      {pipelineTriggerCount.pipeline_completed}
                    </p>
                  </Cell>

                  <Cell width={null} padding="py-2 pr-6">
                    <p className="truncate product-body-text-3-regular text-semantic-fg-secondary">
                      {pipelineTriggerCount.pipeline_errored}
                    </p>
                  </Cell>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </PaginationListContainer>
  );
};
