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
        className="gap-x-2 !rounded-r-none rounded-l-sm border-semantic-bg-line hover:border-semantic-bg-line"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icons.ArrowNarrowLeft className="h-5 w-5 stroke-semantic-fg-secondary" />
        <span className="px-2 product-body-text-3-semibold">Previous</span>
      </Button>
      {table.getPageOptions().map((e, index) => (
        <Button
          className="!rounded-none border-semantic-bg-line hover:border-semantic-bg-line"
          variant="secondaryGrey"
          size="sm"
          onClick={() => table.setPageIndex(index)}
          key={`table-page-button-${index}`}
          disabled={index === table.options.state.pagination?.pageIndex}
        >
          <span className="px-2 product-body-text-3-semibold">{index + 1}</span>
        </Button>
      ))}
      <Button
        className="gap-x-2 !rounded-l-none rounded-r-sm border-semantic-bg-line hover:border-semantic-bg-line"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="px-2 product-body-text-3-semibold">Next</span>
        <Icons.ArrowNarrowRight className="h-5 w-5 stroke-semantic-fg-secondary" />
      </Button>
    </div>
  );
}
