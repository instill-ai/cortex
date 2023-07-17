import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { PipelineState } from "../../types/general";
import { Tag } from "../Tag";
import { Checkbox } from "../Checkbox";

const meta: Meta<typeof DataTable> = {
  title: "Components/NewUi/DataTable",
};

export default meta;

type Story = StoryObj<typeof DataTable>;

// Fetch data from your API here.
const data: PipelineTriggerCount[] = [
  {
    pipeline_id: "Pipeline-name-1",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-2",
    watchState: "STATE_ERROR",
    pipeline_completed: 20,
    pipeline_errored: 132,
  },
  {
    pipeline_id: "Pipeline-name-3",
    watchState: "STATE_ERROR",
    pipeline_completed: 23,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-1",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-2",
    watchState: "STATE_ERROR",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-3",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-1",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-2",
    watchState: "STATE_ERROR",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-3",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-1",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 2,
  },
  {
    pipeline_id: "Pipeline-name-2",
    watchState: "STATE_ERROR",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-3",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-1",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-2",
    watchState: "STATE_ERROR",
    pipeline_completed: 20,
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-3",
    watchState: "STATE_ERROR",
    pipeline_completed: 20,
    pipeline_errored: 32,
  },
];

export type PipelineTriggerCount = {
  pipeline_id: string;
  pipeline_completed: number;
  pipeline_errored: number;
  watchState: PipelineState;
};

const columns: ColumnDef<PipelineTriggerCount>[] = [
  {
    accessorKey: "pipeline_id",
    header: () => <div className="w-auto text-left">Pipeline Id</div>,
    cell: ({ row }) => {
      return (
        <div className="flex min-w-[600px] flex-row gap-x-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="h-5 w-5"
          />
          <div className="w-auto">{row.getValue("pipeline_id")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "watchState",
    header: () => <div className="max-w-[80px] text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Tag
            variant={
              row.getValue("watchState") === "STATE_ACTIVE"
                ? "lightGreen"
                : "lightRed"
            }
            className="border-0"
            size={"sm"}
          >
            Active
          </Tag>
        </div>
      );
    },
  },
  {
    accessorKey: "pipeline_completed",
    header: () => (
      <div className="min-w-[120px] text-center">Completed Triggers</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center text-semantic-fg-secondary">
          {row.getValue("pipeline_completed")}
        </div>
      );
    },
  },
  {
    accessorKey: "pipeline_errored",
    header: () => (
      <div className="min-w-[100px] text-center">Errored Triggers</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center text-semantic-fg-secondary">
          {row.getValue("pipeline_errored")}
        </div>
      );
    },
  },
];

export const Default: Story = {
  render: () => <DataTable columns={columns} data={data}  pageSize={6}/>,
};
