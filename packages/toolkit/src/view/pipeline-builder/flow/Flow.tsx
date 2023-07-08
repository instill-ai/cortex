import { Dispatch, SetStateAction, forwardRef, useCallback } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  IsValidConnection,
  ReactFlow,
  ReactFlowInstance,
} from "reactflow";
import { shallow } from "zustand/shallow";

import { DestinationNode, AINode, SourceNode, BlockchainNode } from "../nodes";
import { CustomEdge } from "../CustomEdge";
import { FlowControl } from "./FlowControl";
import { useDroppable } from "@dnd-kit/core";
import { Icons, useToast } from "@instill-ai/design-system";
import {
  Nullable,
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "../../../lib";
import { PIPELINE_BUILDER_DROPPABLE_AREA_ID } from "..";

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setRightPanelIsOpen: state.setRightPanelIsOpen,
  setSelectedNode: state.setSelectedNode,
  selectedNode: state.selectedNode,
  resourceFormIsDirty: state.resourceFormIsDirty,
  rightPanelIsOpen: state.rightPanelIsOpen,
});

export type FlowProps = {
  setReactFlowInstance: Dispatch<SetStateAction<Nullable<ReactFlowInstance>>>;
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

const nodeTypes = {
  sourceNode: SourceNode,
  aiNode: AINode,
  destinationNode: DestinationNode,
  blockchainNode: BlockchainNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export const Flow = forwardRef<HTMLDivElement, FlowProps>((props, ref) => {
  const { setReactFlowInstance, accessToken, enableQuery } = props;
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setRightPanelIsOpen,
    setSelectedNode,
    selectedNode,
    resourceFormIsDirty,
    rightPanelIsOpen,
  } = usePipelineBuilderStore(pipelineBuilderSelector, shallow);

  const { setNodeRef } = useDroppable({
    id: PIPELINE_BUILDER_DROPPABLE_AREA_ID,
  });

  const isValidConnection: IsValidConnection = useCallback(() => {
    // Currently, we don't have limittation about which node can connect
    // to which node
    return true;
  }, []);

  const { toast } = useToast();

  return (
    <div className="relative flex-1">
      <button
        onClick={() => setRightPanelIsOpen((prev) => !prev)}
        className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center bg-semantic-bg-primary"
      >
        {rightPanelIsOpen ? (
          <Icons.ChevronRightDouble className="h-6 w-6 stroke-semantic-accent-default" />
        ) : (
          <Icons.ChevronLeftDouble className="h-6 w-6 stroke-semantic-accent-default" />
        )}
      </button>
      <div ref={setNodeRef} className="h-full w-full flex-1">
        <div ref={ref} className="h-full w-full flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesDelete={(nodes) => {
              if (nodes.some((node) => node.id === selectedNode?.id)) {
                setSelectedNode(null);
              }
            }}
            onNodesChange={(event) => {
              if (resourceFormIsDirty) {
                toast({
                  title: "You have unsaved changes",
                  description:
                    "Please save or discard your changes before editing another resource.",
                  size: "large",
                  variant: "alert-warning",
                });
                return;
              }

              onNodesChange(event);
            }}
            onEdgesChange={(event) => {
              if (resourceFormIsDirty) {
                toast({
                  title: "You have unsaved changes",
                  description:
                    "Please save or discard your changes before editing another resource.",
                  size: "large",
                  variant: "alert-warning",
                });
                return;
              }

              onEdgesChange(event);
            }}
            onInit={setReactFlowInstance}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            proOptions={{ hideAttribution: true }}
            isValidConnection={isValidConnection}
            selectNodesOnDrag={false}
            onNodeClick={(event, node) => {
              if (resourceFormIsDirty) {
                toast({
                  title: "You have unsaved changes",
                  description:
                    "Please save or discard your changes before editing another resource.",
                  size: "large",
                  variant: "alert-warning",
                });
              } else {
                setSelectedNode(node);
                setRightPanelIsOpen((prev) => {
                  if (!prev) {
                    return true;
                  } else {
                    return prev;
                  }
                });
              }
            }}
            onPaneClick={() => {
              if (resourceFormIsDirty) {
                toast({
                  title: "You have unsaved changes",
                  description:
                    "Please save or discard your changes before editing another resource.",
                  size: "large",
                  variant: "alert-warning",
                });
              } else {
                setSelectedNode(null);
              }
            }}

            // We disable the selection triggered by react-flow due to
            // it will redundantly trigger another time when selectNodesOnDrag
            // is set to false.
            // https://github.com/wbkd/react-flow/issues/1876
            // onSelectionChange={(params) => {
            //   setSelectedNode(params.nodes[0]);
            // }}
          >
            <Controls />
            <Background
              variant={BackgroundVariant.Dots}
              gap={16}
              color="#d1d5db"
            />
          </ReactFlow>
        </div>
      </div>
      <FlowControl accessToken={accessToken} enableQuery={enableQuery} />
    </div>
  );
});

Flow.displayName = "Flow";
