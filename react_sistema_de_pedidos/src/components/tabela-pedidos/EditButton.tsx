/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { editarPedidoState } from "@/redux/features/pedidoSlice";
import { IPedido } from "@/types";
import { openModal } from "@/redux/features/modalSlice";
import { Pencil } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import {
  useLazyBuscarArquivosQuery,
  useLazyBuscarItemQuery,
} from "@/redux/api/pedidoApi";

function EditButton({ row }: any) {
  const dispatch = useAppDispatch();
  const [triggerBuscarItens] = useLazyBuscarItemQuery();
  const [triggerBuscarArquivos] = useLazyBuscarArquivosQuery();

  const handleClickEditButton = async (e: any, row: any) => {
    e.stopPropagation();
    row.getIsSelected();
    dispatch(openModal("edit"));
    dispatch(editarPedidoState(row.original as IPedido));
    triggerBuscarItens(row.original.id);
    triggerBuscarArquivos(row.original.id);
    console.log("Valor da linha para editar:", row.original);
  };
  return (
    <Button
      onClick={(e) => handleClickEditButton(e, row)}
      style={{ cursor: "pointer" }}
      className="border p-3 border-gray-400 hover:bg-gray-300 z-20"
    >
      <Pencil />
    </Button>
  );
}

export default EditButton;
