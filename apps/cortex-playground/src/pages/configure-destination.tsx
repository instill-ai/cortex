import { Root } from "@/components/Root";
import {
  ConfigureDestinationForm,
  useDestinationWithPipelines,
} from "@instill-ai/toolkit";

const ConfigureSourcePage = () => {
  const destination = useDestinationWithPipelines({
    enabled: true,
    destinationName: "destination-connectors/hello",
    accessToken: null,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        {destination.isSuccess && destination.data ? (
          <ConfigureDestinationForm
            width="w-full"
            destination={destination.data}
            onConfigure={null}
            onDelete={null}
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
