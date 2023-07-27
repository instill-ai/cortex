import { Table } from "@tanstack/react-table";
import { Button } from "../Button";
import { Icons } from "../Icons";
import cn from "clsx";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end py-4">
      <Button
        className="gap-x-2 !rounded-r-none rounded-l-sm !border-semantic-bg-line !py-2.5 px-4"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icons.ArrowNarrowLeft className="h-5 w-5 stroke-semantic-fg-secondary" />
        <span className="product-body-text-3-semibold">Previous</span>
      </Button>
      {table.getPageOptions().map((e, index) => (
        <Button
          className={cn(
            "!rounded-none border-l-0 !border-semantic-bg-line !py-2.5 px-2.5",
            table.getPageCount() === index + 1 && "border-r-0"
          )}
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
        className="gap-x-2 !rounded-l-none rounded-r-sm !border-semantic-bg-line !py-2.5 px-4"
        variant="secondaryGrey"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="product-body-text-3-semibold">Next</span>
        <Icons.ArrowNarrowRight className="h-5 w-5 stroke-semantic-fg-secondary" />
      </Button>
    </div>
  );
}
