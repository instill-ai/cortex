import { Button, Icons } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

import { GeneralPageProp, useUser, useUserPipelines } from "../../lib";
import {
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "../pipeline-builder";
import dynamic from "next/dynamic";

const PipelinesTable = dynamic(
  () => import("./PipelinesTable").then((mod) => mod.PipelinesTable),
  { ssr: false }
);

export type PipelineListPageMainViewProps = GeneralPageProp;

const selector = (state: PipelineBuilderStore) => ({
  setPipelineId: state.setPipelineId,
  setPipelineName: state.setPipelineName,
  updatePipelineIsNew: state.updatePipelineIsNew,
});

export const PipelineListPageMainView = (
  props: PipelineListPageMainViewProps
) => {
  const { router, enableQuery, accessToken } = props;

  const { entity } = router.query;

  const { setPipelineId, setPipelineName, updatePipelineIsNew } =
    usePipelineBuilderStore(selector, shallow);

  /* -------------------------------------------------------------------------
   * Query resource data
   * -----------------------------------------------------------------------*/

  const user = useUser({
    accessToken,
    enabled: enableQuery,
  });

  const pipelines = useUserPipelines({
    userName: user.isSuccess ? user.data.name : null,
    enabled: enableQuery && user.isSuccess,
    accessToken,
  });

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

            const randomName = uniqueNamesGenerator({
              dictionaries: [adjectives, colors, animals],
              separator: "-",
            });
            setPipelineId(randomName);
            setPipelineName(`${user.data.name}/pipelines/${randomName}`);
            router.push(`/${entity}/pipelines/${randomName}`);
            updatePipelineIsNew(() => true);
          }}
        >
          <Icons.Plus className="h-4 w-4 stroke-semantic-bg-primary" />
          Add Pipeline
        </Button>
      </div>
      <PipelinesTable
        pipelines={pipelines.data ? pipelines.data : []}
        isError={pipelines.isError}
        isLoading={pipelines.isLoading}
        accessToken={accessToken}
      />
    </div>
  );
};
