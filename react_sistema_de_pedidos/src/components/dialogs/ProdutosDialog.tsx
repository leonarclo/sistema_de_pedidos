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
import { PlusIcon } from "lucide-react";
import FormProdutos from "../forms/FormProdutos";
import { editarProdutoState } from "@/redux/features/produtosSlice";

function ProdutosDialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modalState.modals["produtos"]);
  const estaEditando = useAppSelector(
    (state) => state.editarProdutoState.editarProduto
  );

  const handleOpenChange = (newOpenState: boolean) => {
    if (newOpenState) {
      dispatch(openModal("produtos"));
    } else {
      dispatch(closeModal("produtos"));
      dispatch(editarProdutoState(null));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {}}
          variant={"secondary"}
          size={"lg"}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded font-bold flex items-center gap-2 self-end mb-4"
        >
          <PlusIcon size={26} color="white" />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="pb-4">
            {estaEditando ? "Editando Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>
        <FormProdutos />
      </DialogContent>
    </Dialog>
  );
}

export default ProdutosDialog;
