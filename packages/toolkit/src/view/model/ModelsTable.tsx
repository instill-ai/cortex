import * as React from "react";
import {
  NameCell,
  TableHead,
  TableHeadItem,
  ModelDefinitionCell,
  PaginationListContainer,
  ModelTaskCell,
  StateOverview,
  TableError,
  SkeletonCell,
} from "../../components";
import {
  useSearchedResources,
  env,
  chunk,
  useStateOverviewCounts,
  type Model,
  type Nullable,
  type ModelsWatchState,
} from "../../lib";
import { ModelTablePlaceholder } from "./ModelTablePlaceholder";

export type ModelsTableProps = {
  models: Model[];
  modelsWatchState: ModelsWatchState;
  isError: boolean;
  isLoading: boolean;
  marginBottom?: string;
};

export const ModelsTable = ({
  models,
  modelsWatchState,
  marginBottom,
  isError,
  isLoading,
}: ModelsTableProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  const searchedModels = useSearchedResources({
    resources: models || null,
    searchTerm,
  });

  const searchedModelPages = React.useMemo(() => {
    return chunk(searchedModels, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedModels]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchedModels,
    modelsWatchState,
    isLoading
  );

  const tableHeadItems = React.useMemo<TableHeadItem[]>(() => {
    return [
      {
        key: "model-state-overview-head",
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
        key: "model-source-head",
        item: "Model source",
        width: "w-[240px]",
      },
      {
        key: "model-task-head",
        item: "Model task",
        width: "w-[240px]",
      },
    ];
  }, [stateOverviewCounts]);

  if (isError) {
    return (
      <PaginationListContainer
        title="Model"
        description="These are the models you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={searchedModelPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError marginBottom={null} />
      </PaginationListContainer>
    );
  }

  if (models.length === 0) {
    return (
      <PaginationListContainer
        title="Model"
        description="These are the models you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={searchedModelPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <ModelTablePlaceholder
          enablePlaceholderCreateButton={false}
          marginBottom={null}
        />
      </PaginationListContainer>
    );
  }

  return (
    <PaginationListContainer
      title="Model"
      description="These are the models you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={searchedModelPages.length}
      disabledSearchField={isLoading ? true : false}
      marginBottom={marginBottom}
    >
      <table className="table-fixed border-collapse w-full">
        <TableHead
          borderColor="border-instillGrey20"
          bgColor="bg-instillGrey05"
          items={tableHeadItems}
        />
        <tbody>
          {isLoading
            ? [0, 1, 2, 3, 4].map((e) => (
                <tr
                  key={`models-table-skeleton-${e}`}
                  className="bg-white border border-instillGrey20"
                >
                  <SkeletonCell width={null} padding="py-2 pl-6 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                </tr>
              ))
            : searchedModelPages[currentPage]
            ? searchedModelPages[currentPage].map((model) => (
                <tr
                  key={model.name}
                  className="bg-white border border-instillGrey20"
                >
                  <NameCell
                    name={model.id}
                    width={null}
                    state={
                      modelsWatchState
                        ? modelsWatchState[model.name]
                          ? modelsWatchState[model.name].state
                          : "STATE_UNSPECIFIED"
                        : "STATE_UNSPECIFIED"
                    }
                    padding="py-2 px-6"
                    link={`/models/${model.id}`}
                  />
                  <ModelDefinitionCell
                    width={null}
                    modelDefinition={model.model_definition}
                    padding="py-2"
                  />
                  <ModelTaskCell
                    width={null}
                    padding="py-2 pr-6"
                    modelTask={model.task}
                  />
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </PaginationListContainer>
  );
};
