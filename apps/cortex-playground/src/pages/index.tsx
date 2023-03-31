import { Root } from "@/components/Root";
import {
  BasicSingleSelect,
  GrpcIcon,
  HttpIcon,
  MongoDbIcon,
  SingleSelectOption,
  SnowflakeIcon,
} from "@instill-ai/design-system";
import {
  ConfigurePipelineForm,
  ConfigureProfileForm,
  PipelinesTable,
  useUser,
} from "@instill-ai/toolkit";
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

  const pipeline = usePipeline({
    pipelineName: `pipelines/yoyomne`,
    accessToken: null,
    enable: true,
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

  const user = useUser({
    enable: true,
    accessToken: null,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        /*{" "}
        <ConfigureProfileForm
          user={user.isSuccess ? user.data : null}
          roles={options}
          marginBottom={null}
          width={null}
          accessToken={null}
          onConfigure={null}
        />{" "}
        */
      </div>
    </Root>
  );
};

export default IndexPage;
