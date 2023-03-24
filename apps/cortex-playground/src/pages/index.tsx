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
  DestinationsTable,
  useDestinationsWithPipelines,
} from "@instill-ai/toolkit";

const IndexPage = () => {
  const destinations = useDestinationsWithPipelines({ accessToken: null });

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
        <DestinationsTable
          destinations={destinations.isSuccess ? destinations.data : null}
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
