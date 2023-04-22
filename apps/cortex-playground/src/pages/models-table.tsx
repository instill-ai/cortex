import { Root } from "@/components/Root";
import { ModelsTable } from "@instill-ai/toolkit";

import { useModels, useWatchModels } from "@instill-ai/toolkit";

const ModelsTablePage = () => {
  const models = useModels({
    accessToken: null,
    enable: true,
  });

  const modelsWatchState = useWatchModels({
    modelNames: models.isSuccess ? models.data.map((p) => p.name) : [],
    accessToken: null,
    enable: models.isSuccess && models.data.length > 0,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        <ModelsTable
          models={models.isSuccess ? models.data : []}
          modelsWatchState={
            modelsWatchState.isSuccess ? modelsWatchState.data : {}
          }
          isError={models.isError}
          isLoading={
            models.isLoading || (models.isSuccess && models.data.length > 0)
              ? modelsWatchState.isLoading
              : false
          }
        />
      </div>
    </Root>
  );
};

export default ModelsTablePage;
