import { Root } from "@/components/Root";
import {
  GrpcIcon,
  HttpIcon,
  MongoDbIcon,
  SingleSelectOption,
  SnowflakeIcon,
} from "@instill-ai/design-system";
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
  const options: SingleSelectOption[] = [
    {
      value: "grpc",
      label: "gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-",
      startIcon: (
        <GrpcIcon
          width="w-[30px]"
          height="h-[30px]"
          color="fill-black"
          position="my-auto"
        />
      ),
    },
    {
      value: "http",
      label: "HTTP",
      startIcon: (
        <HttpIcon
          width="w-[30px]"
          height="h-[30px]"
          color="fill-black"
          position="my-auto"
        />
      ),
    },
    {
      value: "snowflake",
      label: "Snowflake",
      startIcon: (
        <SnowflakeIcon width="w-[30px]" height="h-[30px]" position="my-auto" />
      ),
    },
    {
      value: "mongodb",
      label: "MongoDB",
      startIcon: (
        <MongoDbIcon width="w-[30px]" height="h-[30px]" position="my-auto" />
      ),
    },
  ];

  const model = useModel({
    modelName: "models/yoyo",
    accessToken: null,
    enable: true,
  });
  const modelWatchState = useWatchModel({
    modelName: "models/yoyo",
    accessToken: null,
    enable: true,
  });
  const deployModel = useDeployModel();
  const unDeployModel = useUnDeployModel();

  const pipeline = usePipeline({
    pipelineName: "pipelines/yoyo-async",
    accessToken: null,
    enable: true,
  });

  const watchPipelineState = useWatchPipeline({
    pipelineName: "pipelines/yoyo-async",
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
