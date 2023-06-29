import { Root } from "@/components/Root";
import {
  ConfigureSourceForm,
  useConnectorWithPipelines,
} from "@instill-ai/toolkit";

const ConfigureSourcePage = () => {
  const sourceWithPipelines = useConnectorWithPipelines({
    enabled: true,
    connectorName: "connectors/source-http",
    accessToken: null,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        {sourceWithPipelines.isSuccess && sourceWithPipelines.data ? (
          <ConfigureSourceForm
            width="w-full"
            source={sourceWithPipelines.data}
            onDelete={(init) => init()}
            disabledDelete={false}
            accessToken={null}
            disabledConfigure={false}
            onConfigure={(init) => init()}
          />
        ) : null}
      </div>
    </Root>
  );
};

export default ConfigureSourcePage;
