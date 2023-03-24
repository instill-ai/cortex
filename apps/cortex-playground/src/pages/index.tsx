import { Root } from "@/components/Root";
import {
  BasicSingleSelect,
  GrpcIcon,
  HttpIcon,
  MongoDbIcon,
  SingleSelectOption,
  SnowflakeIcon,
} from "@instill-ai/design-system";
import { PipelinesTable } from "@instill-ai/toolkit";
import { usePipelines } from "@instill-ai/toolkit";
import {
  DestinationsTable,
  useDestinationsWithPipelines,
  useSourcesWithPipelines,
  SourcesTable,
  useModelsWithInstances,
  ModelsTable,
  usePipeline,
  PipelineTable,
} from "@instill-ai/toolkit";

const IndexPage = () => {
  // const destinations = useDestinationsWithPipelines({ accessToken: null });
  // const sources = useSourcesWithPipelines({ accessToken: null });
  // const modelsWithInstances = useModelsWithInstances({ accessToken: null });
  // const pipeline = usePipeline({
  //   pipelineName: "pipelines/eee",
  //   accessToken: null,
  // });

  const pipelines = usePipelines({
    enable: true,
    accessToken: null,
  });

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

  return (
    <Root>
      <div className="w-[1200px]">
        {/* <DestinationsTable
          destinations={destinations.isSuccess ? destinations.data : null}
          marginBottom={null}
        /> */}
        {/* <SourcesTable
          sources={sources.isSuccess ? sources.data : null}
          marginBottom={null}
        /> */}
        {/* <ModelsTable
          models={
            modelsWithInstances.isSuccess ? modelsWithInstances.data : null
          }
          marginBottom={null}
        />
        <PipelineTable
          pipeline={pipeline.isSuccess ? pipeline.data : null}
          marginBottom={null}
        /> */}
        <PipelinesTable
          pipelines={pipelines.isSuccess ? pipelines.data : null}
          marginBottom={null}
        />
      </div>

      {/* <BasicSingleSelect
        id="test"
        label="select test"
        options={options}
        value={options[0]}
        disabled={true}
      /> */}
    </Root>
  );
};

export default IndexPage;
