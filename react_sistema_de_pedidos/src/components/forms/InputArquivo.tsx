import Dropzone from "../ui/dropzone";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FileCheck2Icon, XIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

function FileList({ files, onRemove }: FileListProps) {
  return (
    <div className="mt-4 space-y-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <FileCheck2Icon className="h-4 w-4" />
            <p className="text-sm font-medium">{file.name}</p>
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

function InputArquivo() {
  const form = useFormContext();

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
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const isValidFiles = Array.from(acceptedFiles).every((file) =>
      allowedTypes.some((type) => file.type.startsWith(type))
    );

    if (!isValidFiles) {
      form.setError("arquivos", {
        message:
          "Apenas imagens (JPG, PNG, GIF) e arquivos PDF são permitidos.",
        type: "typeError",
      });
      return;
    }

    const currentFiles = form.getValues("arquivos") || [];
    const updatedFiles = [...currentFiles, ...acceptedFiles];
    form.setValue("arquivos", updatedFiles);
    form.clearErrors("arquivos");
  }

  function removeFile(index: number) {
    const currentFiles = form.getValues("arquivos") || [];
    const updatedFiles = [...currentFiles];
    updatedFiles.splice(index, 1);
    form.setValue("arquivos", updatedFiles);
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
      {form.watch("arquivos") && form.watch("arquivos").length > 0 && (
        <FileList files={form.watch("arquivos")} onRemove={removeFile} />
      )}
    </>
  );
}

export default InputArquivo;
