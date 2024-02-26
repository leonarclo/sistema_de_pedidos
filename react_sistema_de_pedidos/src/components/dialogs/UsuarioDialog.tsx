import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormUsuario from "../forms/FormUsuario";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal, openModal } from "@/redux/features/modalSlice";
import { editarUsuarioState } from "@/redux/features/usuariosSlice";

function UsuarioDialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modalState.modals["user"]);

  const handleOpenChange = (newOpenState: boolean) => {
    if (newOpenState) {
      dispatch(openModal("user"));
    } else {
      dispatch(closeModal("user"));
      dispatch(editarUsuarioState(null));
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
          Criar Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="pb-4">Novo Usuário</DialogTitle>
        </DialogHeader>
        <FormUsuario />
      </DialogContent>
    </Dialog>
  );
}

export default UsuarioDialog;
