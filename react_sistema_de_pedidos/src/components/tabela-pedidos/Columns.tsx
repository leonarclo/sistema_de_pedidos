/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPedido } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import EditButton from "./EditButton";
import dateBetweenFilterFn from "./DateBetweenFilter";
import moment from "moment";
import RevisionDialog from "../dialogs/RevisionDialog";

export function fetchPedidoColumns(): ColumnDef<IPedido>[] {
  return [
    {
      accessorKey: "status",
      id: "status",
      maxSize: 150,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p className="w-[120px] text-start">{row.getValue("status")}</p>;
      },
    },
    {
      accessorKey: "consultor",
      id: "consultor",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Consultor(a)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="truncate text-center">{row.getValue("consultor")}</p>
        );
      },
    },
    {
      accessorKey: "data",
      id: "data",
      filterFn: dateBetweenFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="w-[130px] text-center">
            {moment(row.getValue("data")).format("DD-MM-YYYY HH:mm")}
          </p>
        );
      },
    },
    {
      accessorKey: "cnpj",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CNPJ
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p className="w-[160px] text-center">{row.getValue("cnpj")}</p>;
      },
    },
    {
      accessorKey: "empresa",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Empresa
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="max-w-[300px] truncate">{row.getValue("empresa")}</p>
        );
      },
    },
    {
      accessorKey: "categoriaGrupo",
      id: "categoria",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Categoria
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p className="text-center">{row.getValue("categoria")}</p>;
      },
    },
    {
      accessorKey: "emailLogin",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email Login
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="w-[160px] truncate">{row.getValue("emailLogin")}</p>
        );
      },
    },
    {
      id: "edit",
      cell: ({ row }) => {
        return (
          <div className="w-[60px] flex justify-end">
            <EditButton row={row} />
          </div>
        );
      },
    },
    {
      id: "revisoes",
      cell: ({ row }) => {
        return (
          <div className="w-[60px] flex justify-end">
            <RevisionDialog row={row} />
          </div>
        );
      },
    },
  ];
}
