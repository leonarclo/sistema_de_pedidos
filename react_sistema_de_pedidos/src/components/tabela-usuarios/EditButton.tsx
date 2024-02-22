/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { openModal } from "@/redux/features/modalSlice";
import { Pencil } from "lucide-react";
import { useAppDispatch } from "@/redux/store";

function EditButton({ row }: any) {
  const dispatch = useAppDispatch();

  const handleClickEditButton = async (e: any, row: any) => {
    e.stopPropagation();
    row.getIsSelected();
    dispatch(openModal("edit-user"));
    console.log("Valor da linha para editar:", row.original);
  };
  return (
    <Button
      onClick={(e) => handleClickEditButton(e, row)}
      style={{ cursor: "pointer" }}
      className="border p-4 border-gray-400 hover:bg-gray-300 z-20"
    >
      <Pencil />
    </Button>
  );
}

export default EditButton;
