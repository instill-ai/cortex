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
    <div className="flex items-center justify-end py-8">
      <Button
        className="h-10 !rounded-none"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icons.ChevronLeft className="h-4 w-4 stroke-semantic-fg-secondary" />
        Previous
      </Button>
      {[...Array(4).keys()].map((e, index) => (
        <Button
          className="h-10 w-10 !rounded-none"
          variant="secondaryGrey"
          size="sm"
          onClick={() => table.setPageIndex(index + 1)}
          disabled={!table.getCanNextPage()}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        className="h-10 !rounded-none"
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
