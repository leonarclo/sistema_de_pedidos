/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Pagination } from "./Pagination";
import { Filters } from "./Filters";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IPedido } from "@/types";
import { pedidoState } from "@/redux/features/pedidoSlice";
import { openModal } from "@/redux/features/modalSlice";
import {
  useLazyBuscarArquivosQuery,
  useLazyBuscarItemQuery,
} from "@/redux/api/pedidoApi";
import { getStatusColor } from "@/constants/statusColors";
import DateFilter from "./DateFilter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useAppDispatch();
  const [triggerBuscarItens] = useLazyBuscarItemQuery();
  const [triggerBuscarArquivos] = useLazyBuscarArquivosQuery();
  const usuario = useAppSelector((state) => state.getUserState.usuario);
  // const userEdit = usuario && usuario?.nivel >= 5;
  const userAdm = usuario && usuario?.nivel >= 5;

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    autoResetPageIndex: true,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility: {
        // edit: userEdit ? true : false,
        consultor: userAdm ? true : false,
      },
    },
  });

  const handleTableRowClick = async (row: any) => {
    dispatch(pedidoState(row.original as IPedido));
    dispatch(openModal("info"));
    triggerBuscarItens(row.original.id);
    triggerBuscarArquivos(row.original.id);
  };

  return (
    <div className="rounded-md border">
      {<DateFilter column={table.getColumn("data")} />}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: `${header.getSize()}px`,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filters column={header.column} />
                      </div>
                    ) : null}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() => handleTableRowClick(row)}
                className={`hover:bg-zinc-200 cursor-pointer z-10 ${
                  row.index % 2 == 0 ? "bg-zinc-100" : "bg-zinc-50"
                }`}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`
                      ${
                        cell.column.id === "status"
                          ? getStatusColor(cell.getValue() as string)
                          : ""
                      } h-[46px]`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-23 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 px-2 py-6">
        <Pagination table={table} />
      </div>
    </div>
  );
}

export default DataTable;
