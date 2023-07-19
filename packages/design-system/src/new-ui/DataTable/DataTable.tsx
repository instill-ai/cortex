"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "../Table";
import * as React from "react";
import { DataTablePagination } from "./DataTablePagination";
import { Input } from "../Input";
import { Nullable } from "../../types/general";
import { Skeleton } from "../Skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize: number;
  searchPlaceholder: Nullable<string>;
  searchKey: Nullable<string>;
  isLoading: boolean;
  loadingRows: Nullable<number>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  searchPlaceholder,
  searchKey,
  isLoading,
  loadingRows,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        {searchKey && (
          <Input.Root className="w-1/4">
            <Input.Core
              type="text"
              placeholder={searchPlaceholder || ""}
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
            />
          </Input.Root>
        )}
      </div>
      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Head key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Head>
                );
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <>
              {[...Array(loadingRows || 6).keys()].map((e) => (
                <Table.Row key={`table-skeleton-row-${e}`}>
                  {[...Array(columns.length).keys()].map((e) => (
                    <Table.Cell key={`table-skeleton-cell-${e}`}>
                      <Skeleton className="h-5" />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </>
          ) : (
            <>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Table.Row
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </Table.Cell>
                </Table.Row>
              )}
            </>
          )}
        </Table.Body>
      </Table.Root>

      <DataTablePagination table={table} />
    </div>
  );
}
