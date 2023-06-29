import { Root } from "@/components/Root";
import {
  ConfigureDestinationForm,
  useConnectorWithPipelines,
} from "@instill-ai/toolkit";

const ConfigureSourcePage = () => {
  const destination = useConnectorWithPipelines({
    enabled: true,
    connectorName: "connectors/hello",
    accessToken: null,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        {destination.isSuccess && destination.data ? (
          <ConfigureDestinationForm
            width="w-full"
            destination={destination.data}
            onConfigure={(init) => init()}
            onDelete={(init) => init()}
            disabledDelete={false}
            accessToken={null}
            disabledConfigure={false}
          />
        ) : null}
      </div>
    </Root>
  );
};

export default ConfigureSourcePage;
