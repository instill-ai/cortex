import { Root } from "@/components/Root";

import {
  PipelinesTable,
  usePipelines,
  useWatchPipelines,
} from "@instill-ai/toolkit";

const PipelinesTablePage = () => {
  const pipelines = usePipelines({
    accessToken: null,
    enabled: true,
  });

  const pipelinesWatchState = useWatchPipelines({
    pipelineNames: pipelines.isSuccess ? pipelines.data.map((p) => p.name) : [],
    accessToken: null,
    enabled: pipelines.isSuccess && pipelines.data.length > 0,
  });

  return (
    <Root>
      <div className="flex w-[1200px] h-[600px]">
        <PipelinesTable
          pipelines={pipelines.isSuccess ? pipelines.data : []}
          pipelinesWatchState={
            pipelinesWatchState.isSuccess ? pipelinesWatchState.data : {}
          }
          isError={pipelines.isError}
          isLoading={
            pipelines.isLoading ||
            (pipelines.isSuccess && pipelines.data.length > 0)
              ? pipelinesWatchState.isLoading
              : false
          }
        />
      </div>
    </Root>
  );
};

export default PipelinesTablePage;
