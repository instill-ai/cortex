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
    enable: sources.isSuccess && sources.data.length > 0,
  });

  return (
    <Root>
      <div className="w-[1200px] h-[600px]">
        <SourcesTable
          sources={sources.isSuccess ? sources.data : []}
          sourcesWatchState={
            sourcesWatchState.isSuccess ? sourcesWatchState.data : {}
          }
          isError={sources.isError}
          isLoading={
            sources.isLoading || (sources.isSuccess && sources.data.length > 0)
              ? sourcesWatchState.isLoading
              : false
          }
        />
      </div>
    </Root>
  );
};

export default SourcesTablePage;
