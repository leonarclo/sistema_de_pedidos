import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import FormNovoPedido from "../forms/FormNovoPedido";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal, openModal } from "@/redux/features/modalSlice";
import { editarPedidoState } from "@/redux/features/pedidoSlice";
import { itensPedidoState } from "@/redux/features/itensPedidoSlice";

function NovoPedidoDialog() {
  const dispatch = useAppDispatch();
  const editando = useAppSelector(
    (state) => state.editarPedidoState.editarPedido
  );
  const isOpen = useAppSelector((state) => state.modalState.modals["edit"]);

  const handleOpenChange = (newOpenState: boolean) => {
    if (newOpenState) {
      dispatch(openModal("edit"));
    } else {
      dispatch(closeModal("edit"));
      dispatch(editarPedidoState(null));
      dispatch(itensPedidoState([]));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {}}
          variant={"secondary"}
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold flex items-center gap-2"
        >
          <PlusIcon size={26} color="white" />
          <p>Novo Pedido</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="pb-4">
            {editando?.chave ? "Editando Pedido" : "Novo Pedido"}
          </DialogTitle>
        </DialogHeader>
        <FormNovoPedido />
      </DialogContent>
    </Dialog>
  );
}

export default NovoPedidoDialog;
