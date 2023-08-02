import { SourceForm } from "./SourceForm";
import { AIForm } from "./AIForm";
import { DestinationForm } from "./DestinationForm";
import { BlockchainForm } from "./BlockchainForm";
import { PipelineForm } from "./PipelineForm";
import { Nullable, usePipelineBuilderStore } from "../../../lib";

export type RightPanelProps = {
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

export const RightPanel = (props: RightPanelProps) => {
  const { accessToken, enableQuery } = props;
  const selectedNode = usePipelineBuilderStore((state) => state.selectedNode);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6 flex w-full items-center justify-center rounded-sm bg-semantic-bg-base-bg">
        <p className="py-2 text-semantic-fg-primary product-body-text-1-semibold">
          {selectedNode
            ? selectedNode.data.connector.name.split("/")[1]
            : "Pipeline Properties"}
        </p>
      </div>
      {/* 
        We use this additional pb to cope with Browser eaten up parent's padding when it is
        scrollable.
      */}
      <div className="flex w-full pb-10">
        {selectedNode &&
        selectedNode.data.connectorType === "CONNECTOR_TYPE_OPERATOR" ? (
          <SourceForm
            source={selectedNode.data.connector}
            accessToken={accessToken}
            enableQuery={enableQuery}
          />
        ) : null}
        {selectedNode &&
        selectedNode.data.connectorType === "CONNECTOR_TYPE_AI" ? (
          <AIForm ai={selectedNode.data.connector} accessToken={accessToken} />
        ) : null}
        {selectedNode &&
        selectedNode.data.connectorType === "CONNECTOR_TYPE_DATA" ? (
          <DestinationForm
            destination={selectedNode.data.connector}
            accessToken={accessToken}
            enableQuery={enableQuery}
          />
        ) : null}
        {selectedNode &&
        selectedNode.data.connectorType === "CONNECTOR_TYPE_BLOCKCHAIN" ? (
          <BlockchainForm
            blockchain={selectedNode.data.connector}
            accessToken={accessToken}
          />
        ) : null}
        {!selectedNode ? (
          <PipelineForm accessToken={accessToken} enableQuery={enableQuery} />
        ) : null}
      </div>
    </div>
  );
};
