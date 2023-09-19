import dynamic from "next/dynamic";
import { Button, Icons } from "@instill-ai/design-system";

import {
  GeneralPageProp,
  useModels,
  useUser,
  useWatchUserModels,
} from "../../lib";

const ModelsTable = dynamic(
  () => import("./ModelsTable").then((mod) => mod.ModelsTable),
  { ssr: false }
);

export type ModelHubListPageMainViewProps = GeneralPageProp;

export const ModelHubListPageMainView = (
  props: ModelHubListPageMainViewProps
) => {
  const { router, enableQuery, accessToken } = props;

  /* -------------------------------------------------------------------------
   * Query resource data
   * -----------------------------------------------------------------------*/

  const user = useUser({
    accessToken,
    enabled: enableQuery,
  });
  const models = useModels({
    enabled: enableQuery && user.isSuccess,
    accessToken,
  });
  const modelsWatchState = useWatchUserModels({
    modelNames:
      user.isSuccess && models.isSuccess ? models.data.map((p) => p.name) : [],
    enabled: enableQuery && models.isSuccess && models.data.length > 0,
    accessToken,
  });
  const isLoadingResource =
    models.isLoading || (models.isSuccess && models.data.length > 0)
      ? modelsWatchState.isLoading
      : false;

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-col">
      <div className="mb-14">
        <Button
          className="gap-x-2"
          variant="primary"
          size="lg"
          onClick={() => {
            if (!user.isSuccess) return;
            router.push(`/${user.data.id}/model-hub/create`);
          }}
        >
          <Icons.Plus className="h-5 w-5 stroke-semantic-bg-primary" />
          Add Model
        </Button>
      </div>
      <ModelsTable
        models={models.isSuccess ? models.data : []}
        modelsWatchState={
          modelsWatchState.isSuccess ? modelsWatchState.data : {}
        }
        isError={models.isError || modelsWatchState.isError}
        isLoading={isLoadingResource}
      />
    </div>
  );
};
