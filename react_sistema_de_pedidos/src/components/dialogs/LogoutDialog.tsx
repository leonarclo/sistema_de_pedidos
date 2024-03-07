/* eslint-disable react-hooks/exhaustive-deps */
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
import { useLogoutMutation } from "@/redux/api/authApi";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutDialog() {
  const dispatch = useAppDispatch();
  const [logout, { isLoading, isSuccess, error, isError }] =
    useLogoutMutation();
  const isOpen = useAppSelector((state) => state.modalState.modals["logout"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  const handleOpenChange = (newOpenState: boolean) => {
    if (newOpenState) {
      dispatch(openModal("logout"));
    } else {
      dispatch(closeModal("logout"));
    }
  };

  const handleYesClick = () => {
    dispatch(closeModal("logout"));
    logout();
  };

  const handleNoClick = () => {
    dispatch(closeModal("logout"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          style={{ cursor: "pointer" }}
          className="border p-4 border-gray-400 hover:bg-gray-300 z-2"
        >
          {isLoading ? <LoadingSpinner /> : "Sair"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="p-4">
            Tem certeza que deseja sair?
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant={"default"}
            className="bg-green-500 hover:bg-green-600"
            onClick={() => handleYesClick()}
          >
            Sim
          </Button>
          <Button
            variant={"outline"}
            className="hover:bg-slate-200"
            onClick={() => handleNoClick()}
          >
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
