import { Root } from "@/components/Root";
import {
  ChangeModelStateToggle,
  ChangePipelineStateToggle,
  useActivatePipeline,
  useDeActivatePipeline,
  useDeployModel,
  useModel,
  usePipeline,
  useUnDeployModel,
  useWatchModel,
  useWatchPipeline,
} from "@instill-ai/toolkit";

const ResourceTogglePage = () => {
  // You should change the modelName and PipelineName to the name of your model and pipeline you
  // are testing with.

  const modelName = "models/yolo";
  const pipelineName = "pipelines/yolo-async";

  const model = useModel({
    modelName,
    accessToken: null,
    enable: true,
  });
  const modelWatchState = useWatchModel({
    modelName,
    accessToken: null,
    enable: true,
  });
  const deployModel = useDeployModel();
  const unDeployModel = useUnDeployModel();

  const pipeline = usePipeline({
    pipelineName,
    accessToken: null,
    enable: true,
  });

  const watchPipelineState = useWatchPipeline({
    pipelineName,
    accessToken: null,
    enable: true,
  });

  const activatePipeline = useActivatePipeline();
  const deactivatePipeline = useDeActivatePipeline();

  return (
    <Root>
      <div className="w-[1200px]">
        <ChangeModelStateToggle
          model={model.data ? model.data : null}
          modelWatchState={
            modelWatchState.isSuccess ? modelWatchState.data.state : null
          }
          switchOn={deployModel}
          switchOff={unDeployModel}
          marginBottom="mb-10"
          accessToken={null}
        />
      </div>
      <div className="w-[1200px]">
        <ChangePipelineStateToggle
          pipeline={pipeline.data ? pipeline.data : null}
          pipelineWatchState={
            watchPipelineState.isSuccess ? watchPipelineState.data.state : null
          }
          switchOn={activatePipeline}
          switchOff={deactivatePipeline}
          marginBottom="mb-10"
          accessToken={null}
        />
      </div>
    </Root>
  );
};

export default ResourceTogglePage;
