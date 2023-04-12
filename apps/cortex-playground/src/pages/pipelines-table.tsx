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
      <div className="w-[1200px]">
        <PipelinesTable
          pipelines={pipelines.data ?? null}
          pipelinesWatchState={
            pipelinesWatchState.isSuccess ? pipelinesWatchState.data : null
          }
          marginBottom={null}
          isError={pipelines.isError}
        />
      </div>
    </Root>
  );
};

export default PipelinesTablePage;
