import { Root } from "@/components/Root";
import {
  ConfigureSourceForm,
  useSourceWithPipelines,
} from "@instill-ai/toolkit";

const ConfigureSourcePage = () => {
  const sourceWithPipelines = useSourceWithPipelines({
    enabled: true,
    sourceName: "source-connectors/source-http",
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
