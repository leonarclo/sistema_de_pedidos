/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { IProduto } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Trash } from "lucide-react";
import EditButton from "./EditButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRemoverProdutoMutation } from "@/redux/api/pedidoApi";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { categoriaString } from "@/lib/categoriaString";

export const columns: ColumnDef<IProduto>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "produto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "categoria",
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
    cell: (props) => <>{categoriaString(props.getValue())}</>,
  },
  {
    id: "edit",
    cell: ({ row }) => <EditButton row={row} />,
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const [remover, { isSuccess, isError }] = useRemoverProdutoMutation();
      const { toast } = useToast();

      useEffect(() => {
        if (isSuccess) {
          toast({
            variant: "success",
            description: "Sucesso!",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        if (isError) {
          toast({
            variant: "error",
            description:
              "Houve um erro ao remover este produto. Atualize a página e tente novamente",
          });
        }
      }, [isSuccess, isError]);

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              style={{ cursor: "pointer" }}
              className="border p-4 border-gray-400 hover:bg-gray-300 z-2"
            >
              <Trash />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="flex flex-col gap-3 p-4 pb-10">
                Tem certeza que deseja remover o produto:{" "}
                <p>{row.original.produto}</p>
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant={"default"}
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => remover({ id: row.original.id })}
                >
                  Sim
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant={"outline"} className="hover:bg-slate-200">
                  Não
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
