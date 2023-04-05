import { Root } from "@/components/Root";
import {
  GrpcIcon,
  HttpIcon,
  MongoDbIcon,
  SingleSelectOption,
  SnowflakeIcon,
} from "@instill-ai/design-system";
import {
  useModels,
  useUser,
  ModelConfigurationFields,
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
        {/* <CreatePipelineForm
          onCreate={null}
          accessToken={null}
          syncModelOnly={true}
        /> */}
        <ModelConfigurationFields
          model={models.data ? models.data[1] : null}
          marginBottom={null}
        />
      </div>
    </Root>
  );
};

export default IndexPage;
