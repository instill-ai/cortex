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
  useDeployModel,
  useModel,
  usePipeline,
  useUnDeployModel,
  useWatchModel,
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

  const model = useModel({
    modelName: "models/yoyo",
    accessToken: null,
    enabled: true,
  });
  const modelWatchState = useWatchModel({
    modelName: "models/yoyo",
    accessToken: null,
    enabled: true,
  });
  const deployModel = useDeployModel();
  const unDeployModel = useUnDeployModel();

  return (
    <Root>
      <div className="w-[1200px] bg-semantic-bg-primary rounded-xxs  product-headings-heading-1 border-xxs border-semantic-bg-secondary">
        <p className="font-medium text-3xl">Hello</p>
      </div>
    </Root>
  );
};

export default IndexPage;
