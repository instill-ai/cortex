import { Root } from "@/components/Root";

import {
  SourcesTable,
  useSourcesWithPipelines,
  useWatchSources,
} from "@instill-ai/toolkit";

const SourcesTablePage = () => {
  const sources = useSourcesWithPipelines({
    accessToken: null,
    enable: true,
  });

  const sourcesWatchState = useWatchSources({
    sourceNames: sources.isSuccess ? sources.data.map((p) => p.name) : [],
    accessToken: null,
    enable: sources.isSuccess,
  });

  return (
    <Root>
      <div className="w-[1200px] h-[600px]">
        <SourcesTable
          sources={sources.data ?? null}
          sourcesWatchState={
            sourcesWatchState.isSuccess ? sourcesWatchState.data : null
          }
          marginBottom={null}
          isError={sources.isError}
          isLoading={sources.isLoading || sourcesWatchState.isLoading}
        />
      </div>
    </Root>
  );
};

export default SourcesTablePage;
