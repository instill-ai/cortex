import { Root } from "@/components/Root";
import {
  ConfigureDestinationForm,
  CreatePipelineForm,
  useDestination,
} from "@instill-ai/toolkit";

const IndexPage = () => {
  const destination = useDestination({
    destinationName: "destination-connectors/destination-http",
    accessToken: null,
  });

  return (
    <Root>
      {/* <ConfigureProfileForm
        marginBottom={null}
        roles={[
          {
            label: "Manager (who makes decisions)",
            value: "manager",
          },
          {
            label:
              "AI Researcher (who devises ML algorithms, trains and evaluates models)",
            value: "ai-researcher",
          },
          {
            label:
              "AI Engineer (who prepares dataset and makes models delivered by AI Researchers production-ready)",
            value: "ai-engineer",
          },
          {
            label:
              "Data Engineer (who builds data pipeline for data analytics or applications)",
            value: "data-engineer",
          },
          {
            label:
              "Data Scientist (who analyses data for distilling business value)",
            value: "data-scientist",
          },
          {
            label:
              "Analytics Engineer (who possesses skills of both Data Scientist and Data Engineer)",
            value: "analytics-engineer",
          },
          {
            label: "Hobbyist (I love AI!)",
            value: "hobbyist",
          },
        ]}
        width="w-[600px]"
      /> */}
      <div className="w-[1200px] bg-instillGrey05">
        {destination.isSuccess ? (
          <ConfigureDestinationForm
            width={null}
            onConfigure={null}
            initStoreOnConfigure={true}
            onDelete={null}
            destination={destination.data}
          />
        ) : null}
      </div>
    </Root>
  );
};

export default IndexPage;
