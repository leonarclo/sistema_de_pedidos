/* eslint-disable @typescript-eslint/no-explicit-any */
import { closeModal, openModal } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

function DeleteProdutoDialog({ row }: any) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.modalState.modals["delete-produto"]
  );

  const handleOpenChange = (newOpenState: boolean) => {
    if (newOpenState) {
      console.log(row.original.produto);
      dispatch(openModal("delete-produto"));
    } else {
      dispatch(closeModal("delete-produto"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          style={{ cursor: "pointer" }}
          className="border p-4 border-gray-400 hover:bg-gray-300 z-2"
        >
          <Trash size={26} className="text-gray-800" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="pb-4">Remover Produto</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProdutoDialog;
