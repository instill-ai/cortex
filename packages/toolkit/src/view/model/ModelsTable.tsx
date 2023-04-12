import * as React from "react";
import {
  NameCell,
  TableHead,
  TableHeadItem,
  ModelDefinitionCell,
  TableLoadingProgress,
  PaginationListContainer,
  ModelTaskCell,
  StateOverview,
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
  models: Nullable<Model[]>;
  modelsWatchState: Nullable<ModelsWatchState>;
  marginBottom: Nullable<string>;
};

export const ModelsTable = ({
  models,
  modelsWatchState,
  marginBottom,
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
    modelsWatchState
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

  return (
    <PaginationListContainer
      title="Model"
      description="These are the models you can select"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalPage={searchedModelPages.length}
      displaySearchField={models?.length !== 0 ? true : false}
      marginBottom={marginBottom}
    >
      {models ? (
        models.length === 0 ? (
          <ModelTablePlaceholder
            enablePlaceholderCreateButton={false}
            marginBottom={null}
          />
        ) : (
          <table className="table-fixed border-collapse w-full">
            <TableHead
              borderColor="border-instillGrey20"
              bgColor="bg-instillGrey05"
              items={tableHeadItems}
            />
            <tbody>
              {searchedModelPages[currentPage]
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
        )
      ) : (
        <TableLoadingProgress marginBottom={null} />
      )}
    </PaginationListContainer>
  );
};
