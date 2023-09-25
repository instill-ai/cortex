import { Dialog, Icons } from "@instill-ai/design-system";
import { Nullable } from "../../../lib";
import { AIResourceForm } from "../../ai";
import { BlockchainResourceForm } from "../../blockchain";
import { DataResourceForm } from "../../data";
import {
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "../usePipelineBuilderStore";
import { shallow } from "zustand/shallow";

export type CreateResourceDialogProps = {
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

const selector = (state: PipelineBuilderStore) => ({
  state: state.createResourceDialogState,
  updateState: state.updateCreateResourceDialogState,
});

export const CreateResourceDialog = (props: CreateResourceDialogProps) => {
  const { accessToken, enableQuery } = props;
  const {
    state: { open, connectorDefinition, connectorType, onCreated },
    updateState,
  } = usePipelineBuilderStore(selector, shallow);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        updateState((prev) => ({
          ...prev,
          open: e,
        }));
      }}
    >
      <Dialog.Content className="flex max-h-[700px] !max-w-[1048px] flex-col overflow-y-auto">
        <div className="flex flex-col">
          <div className="mb-5 flex flex-col ">
            <div className="mb-4 flex h-12 w-12 rounded-[10px] border border-semantic-bg-line shadow-xxs">
              <Icons.IntersectSquare className="m-auto h-6 w-6 stroke-semantic-fg-secondary" />
            </div>
            <p className="text-semantic-fg-primary product-body-text-1-semibold">
              Add Resource
            </p>
            <p className="text-semantic-fg-disabled product-body-text-3-regular">
              Setup your resource to build your pipeline.
            </p>
          </div>
          {connectorType === "CONNECTOR_TYPE_AI" && connectorDefinition ? (
            <AIResourceForm
              aiDefinition={connectorDefinition}
              aiResource={null}
              accessToken={accessToken}
              onSubmit={onCreated ? onCreated : undefined}
              enableBackButton={true}
              onBack={() => {
                updateState(() => ({
                  open: false,
                  connectorType: null,
                  connectorDefinition: null,
                  onCreated: null,
                }));
              }}
              enableQuery={enableQuery}
            />
          ) : null}
          {connectorType === "CONNECTOR_TYPE_BLOCKCHAIN" &&
          connectorDefinition ? (
            <BlockchainResourceForm
              blockchainDefinition={connectorDefinition}
              blockchainResource={null}
              accessToken={accessToken}
              enableBackButton={true}
              onSubmit={onCreated ? onCreated : undefined}
              onBack={() => {
                updateState(() => ({
                  open: false,
                  connectorType: null,
                  connectorDefinition: null,
                  onCreated: null,
                }));
              }}
              enableQuery={enableQuery}
            />
          ) : null}
          {connectorType === "CONNECTOR_TYPE_DATA" && connectorDefinition ? (
            <DataResourceForm
              dataDefinition={connectorDefinition}
              dataResource={null}
              accessToken={accessToken}
              enableBackButton={true}
              onSubmit={onCreated ? onCreated : undefined}
              onBack={() => {
                updateState(() => ({
                  open: false,
                  connectorType: null,
                  connectorDefinition: null,
                  onCreated: null,
                }));
              }}
              enableQuery={enableQuery}
            />
          ) : null}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
