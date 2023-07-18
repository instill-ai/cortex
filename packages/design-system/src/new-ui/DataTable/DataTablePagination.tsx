import { Table } from "@tanstack/react-table";
import { Button } from "../Button";
import { Icons } from "../Icons";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end py-8">
      <Button
        className="h-10 gap-x-3 !rounded-r-none rounded-l-[8px]"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icons.ArrowNarrowLeft className="h-4 w-4 stroke-semantic-fg-secondary" />
        Previous
      </Button>
      {table.getPageOptions().map((e, index) => (
        <Button
          className="h-10 w-10 !rounded-none"
          variant="secondaryGrey"
          size="sm"
          onClick={() => table.setPageIndex(index)}
          key={`table-page-button-${index}`}
          disabled={index === table.options.state.pagination?.pageIndex}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        className="h-10 gap-x-3 !rounded-l-none rounded-r-[8px]"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
        <Icons.ArrowNarrowRight className="h-4 w-4 stroke-semantic-fg-secondary" />
      </Button>
    </div>
  );
}
