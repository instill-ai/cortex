import { Table } from "@tanstack/react-table";

import { Button } from "../Button";
import { Icons } from "../Icons";
import { Select } from "../Select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        className="gap-x-2"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icons.ChevronLeft className="h-4 w-4 stroke-semantic-fg-secondary" />
        Previous
      </Button>
      <Button
        className="gap-x-2"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
        <Icons.ChevronRight className="h-4 w-4 stroke-semantic-fg-secondary" />
      </Button>
    </div>
  );
}
