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
    enable: models.isSuccess,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        <ModelsTable
          models={models.data ?? null}
          modelsWatchState={
            modelsWatchState.isSuccess ? modelsWatchState.data : null
          }
          marginBottom={null}
          isError={models.isError}
        />
      </div>
    </Root>
  );
};

export default ModelsTablePage;
