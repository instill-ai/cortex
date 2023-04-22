import { Root } from "@/components/Root";

import {
  PipelinesTable,
  usePipelines,
  useWatchPipelines,
} from "@instill-ai/toolkit";

const PipelinesTablePage = () => {
  const pipelines = usePipelines({
    accessToken: null,
    enable: true,
  });

  const pipelinesWatchState = useWatchPipelines({
    pipelineNames: pipelines.isSuccess ? pipelines.data.map((p) => p.name) : [],
    accessToken: null,
    enable: pipelines.isSuccess,
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
          isLoading={pipelines.isLoading || pipelinesWatchState.isLoading}
        />
      </div>
    </Root>
  );
};

export default PipelinesTablePage;
