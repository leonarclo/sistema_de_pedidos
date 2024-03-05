/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "@/redux/store";
import Dropzone from "../../ui/dropzone";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { FileCheck2Icon, XIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { IArquivo } from "@/types";
import { useEffect, useMemo, useState } from "react";

interface FileListProps {
  files: (File | IArquivo)[];
  onRemove: (index: number) => void;
}

function InputArquivo() {
  const form = useFormContext();
  const arquivos = useAppSelector((state) => state.arquivosState.arquivos);
  const editar = useAppSelector(
    (state) => state.editarPedidoState.editarPedido
  );

  const [filesToShow, setFilesToShow] = useState<(File | IArquivo)[]>([]);

  useEffect(() => {
    if (editar) {
      setFilesToShow(arquivos);
    }
  }, [editar, arquivos]);

  const transformedFiles = useMemo(
    () =>
      filesToShow.map((file) =>
        file instanceof File ? (file as File).name : file.arquivo
      ),
    [filesToShow, arquivos]
  );

  const filesToUpdate = filesToShow.filter((file) => file instanceof File);

  form.setValue("arquivos", filesToUpdate);

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      form.setError("arquivos", {
        message: "Adicione pelo menos um arquivo.",
        type: "typeError",
      });
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/gif",
      "image/png",
      "application/pdf",
    ];
    const isValidFiles = Array.from(acceptedFiles).every((file) =>
      allowedTypes.some((type) => file.type.startsWith(type))
    );

    if (!isValidFiles) {
      form.setError("arquivos", {
        message:
          "Apenas imagens (JPG, JPEG, PNG, GIF) e arquivos PDF são permitidos.",
        type: "typeError",
      });
      return;
    }

    const currentFiles = form.getValues("arquivos") || [];

    const newFiles = Array.from(acceptedFiles).filter(
      (file) =>
        !currentFiles.some(
          (currentFile: { name: string }) => currentFile.name === file.name
        )
    );

    form.clearErrors("arquivos");
    form.setValue("arquivos", transformedFiles);
    setFilesToShow([...filesToShow, ...newFiles]);
  }

  function removeFile(index: number) {
    const currentFiles = form.getValues("arquivos") || [];
    const updatedFiles = [...currentFiles];
    updatedFiles.splice(index, 1);
    form.setValue("arquivos", updatedFiles);

    if (editar) {
      const updatedFilesToShow = [...filesToShow];
      updatedFilesToShow.splice(index, 1);
      setFilesToShow(updatedFilesToShow);
    }
  }

  return (
    <>
      <FormField
        control={form.control}
        name="arquivos"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Dropzone
                {...field}
                dropMessage="Arraste ou clique aqui para adicionar arquivo(s)"
                handleOnDrop={handleOnDrop}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {(editar ||
        (form.watch("arquivos") && form.watch("arquivos").length > 0)) && (
        <FileList files={filesToShow} onRemove={removeFile} />
      )}
    </>
  );
}

function FileList({ files, onRemove }: FileListProps) {
  const editar = useAppSelector(
    (state) => state.editarPedidoState.editarPedido
  );

  return (
    <div className="mt-4 space-y-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <FileCheck2Icon className="h-4 w-4" />
            {editar ? (
              <p className="text-sm font-medium">
                {(file as IArquivo).arquivo}
              </p>
            ) : null}
            <p className="text-sm font-medium">{(file as File).name}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default InputArquivo;
