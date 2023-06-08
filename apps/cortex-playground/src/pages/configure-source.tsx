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
