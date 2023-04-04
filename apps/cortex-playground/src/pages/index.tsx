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
  CreateModelWithPresetForm,
  CreatePipelineForm,
  PipelinesTable,
  useModels,
  useUser,
} from "@instill-ai/toolkit";
import { usePipelines } from "@instill-ai/toolkit";
import {
  DestinationsTable,
  useDestinationsWithPipelines,
  useSourcesWithPipelines,
  SourcesTable,
  ModelsTable,
  usePipeline,
  PipelineTable,
} from "@instill-ai/toolkit";

const IndexPage = () => {
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

  const models = useModels({
    accessToken: null,
    enable: true,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        <CreatePipelineForm
          onCreate={null}
          accessToken={null}
          syncModelOnly={true}
        />
      </div>
    </Root>
  );
};

export default IndexPage;
