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
    pipeline_errored: 12,
  },
  {
    pipeline_id: "Pipeline-name-3",
    watchState: "STATE_ACTIVE",
    pipeline_completed: 20,
    pipeline_errored: 12,
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
    id: "select",
    header: ({ table }) => (
      <div className="text-left">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="text h-4 w-4"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="h-4 w-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pipeline_id",
    header: () => <div className="text-left">Pipeline Id</div>,
  },
  {
    accessorKey: "watchState",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Tag variant="lightGreen" className="border-0" size={"sm"}>
            Active
          </Tag>
        </div>
      );
    },
  },
  {
    accessorKey: "pipeline_completed",
    header: () => <div className="text-center">Completed Triggers</div>,
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
    header: () => <div className="text-center">Errored Triggers</div>,
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
  render: () => <DataTable columns={columns} data={data} />,
};
