import { useMemo, useState } from "react";

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
} from "../../lib";
import { ModelTablePlaceholder } from "./ModelTablePlaceholder";

export type ModelsTableProps = {
  models: Nullable<Model[]>;
  marginBottom: Nullable<string>;
};

export const ModelsTable = ({ models, marginBottom }: ModelsTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<Nullable<string>>(null);

  const searchedModels = useSearchedResources({
    resources: models || null,
    searchTerm,
  });

  const searchedModelPages = useMemo(() => {
    return chunk(searchedModels, env("NEXT_PUBLIC_LIST_PAGE_SIZE"));
  }, [searchedModels]);

  const stateOverviewCounts = useStateOverviewCounts(searchedModels);

  const tableHeadItems = useMemo<TableHeadItem[]>(() => {
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
      },
      {
        key: "model-name",
        item: <></>,
      },
      {
        key: "model-source-head",
        item: "Model source",
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
          <table className="table-auto border-collapse">
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
                        state={model.state}
                        padding="py-2 pl-6"
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
