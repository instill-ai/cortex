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
  PaginationListContainerProps,
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
} & Pick<PaginationListContainerProps, "marginBottom">;

export const ModelsTable = (props: ModelsTableProps) => {
  const { models, modelsWatchState, marginBottom, isError, isLoading } = props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<Nullable<string>>(null);

  // We will only use searched resource when user input search term

  const searchedModels = useSearchedResources({
    resources: models,
    searchTerm,
  });

  const modelPages = React.useMemo(() => {
    if (!searchTerm) {
      return chunk(models, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
    }
    return chunk(searchedModels, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedModels, models, searchTerm]);

  const stateOverviewCounts = useStateOverviewCounts(
    searchTerm ? searchedModels : models,
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
        totalPage={modelPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <TableError marginBottom={null} />
      </PaginationListContainer>
    );
  }

  if (models.length === 0 && !isLoading) {
    return (
      <PaginationListContainer
        title="Model"
        description="These are the models you can select"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalPage={modelPages.length}
        disabledSearchField={true}
        marginBottom={marginBottom}
      >
        <ModelTablePlaceholder enableCreateButton={false} />
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
      totalPage={modelPages.length}
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
            ? [...Array(5).keys()].map((e) => (
                <tr
                  key={`models-table-skeleton-${e}`}
                  className="bg-white border border-instillGrey20"
                >
                  <SkeletonCell width={null} padding="py-2 pl-6 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                  <SkeletonCell width={null} padding="py-2 pr-6" />
                </tr>
              ))
            : modelPages[currentPage]
            ? modelPages[currentPage].map((model) => (
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
