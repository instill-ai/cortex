import { Root } from "@/components/Root";

import {
  useWatchDestinations,
  DestinationsTable,
  useDestinationsWithPipelines,
} from "@instill-ai/toolkit";

const DestinationsTablePage = () => {
  const destinations = useDestinationsWithPipelines({
    accessToken: null,
    enable: true,
  });

  const destinationsWatchState = useWatchDestinations({
    destinationNames: destinations.isSuccess
      ? destinations.data.map((p) => p.name)
      : [],
    accessToken: null,
    enable: destinations.isSuccess && destinations.data.length > 0,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        <DestinationsTable
          destinations={destinations.isSuccess ? destinations.data : []}
          destinationsWatchState={
            destinationsWatchState.isSuccess ? destinationsWatchState.data : {}
          }
          isError={destinations.isError}
          isLoading={
            destinations.isLoading ||
            (destinations.isSuccess && destinations.data.length > 0)
              ? destinationsWatchState.isLoading
              : false
          }
        />
      </div>
    </Root>
  );
};

export default DestinationsTablePage;
