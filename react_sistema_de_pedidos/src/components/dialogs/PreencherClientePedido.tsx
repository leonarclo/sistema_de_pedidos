/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useLazyBuscarPedidosQuery } from "@/redux/api/pedidoApi";
import { useFormContext } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { InputMasked } from "../ui/input-mask";

function PreencherClientePedido() {
  const form = useFormContext();
  const { toast } = useToast();

  const [buscarPorCnpj, { data, isSuccess }] = useLazyBuscarPedidosQuery();

  const handleCnpjClick = async () => {
    const cnpjValue = (
      document.querySelector("[name=cnpjValue]") as HTMLInputElement | null
    )?.value;
    const numCnpjValue = cnpjValue?.replace(/\D/g, "").trim();
    if (numCnpjValue?.length == 14) {
      buscarPorCnpj({ cnpj: cnpjValue });
      if (isSuccess && data) {
        form.setValue("empresa", data && data[0].empresa);
        form.setValue("cargoCliente", data && data[0].cargoCliente);
        form.setValue("nomeCliente", data && data[0].nomeCliente);
        form.setValue("cpfCliente", data && data[0].cpfCliente);
        form.setValue("email", data && data[0].email);
        form.setValue("telefone1", data && data[0].telefone1);
        form.setValue("telefone2", data && data[0].telefone2);
        form.setValue("emailLogin", data && data[0].emailLogin);

        form.setValue("cep", data && data[0].cep);
        form.setValue("logradouro", data && data[0].logradouro);
        form.setValue("bairro", data && data[0].bairro);
        form.setValue("cidade", data && data[0].cidade);
        form.setValue("estado", data && data[0].estado);
      } else {
        toast({
          variant: "error",
          description: "Cliente não encontrado!",
        });
      }
    } else {
      toast({
        variant: "error",
        description: "Número de CNPJ inválido!",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          style={{ cursor: "pointer" }}
          className="border p-4 bg-zinc-200 border-gray-400 hover:bg-zinc-300 z-2"
        >
          Preencher com CNPJ
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="p-4">
            Digite abaixo o CNPJ do cliente:
          </DialogTitle>
        </DialogHeader>
        <InputMasked mask="cnpj" name="cnpjValue" />
        <DialogFooter>
          <div className="grid gap-4 py-4">
            <DialogClose asChild>
              <Button
                variant={"default"}
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handleCnpjClick()}
              >
                Pesquisar
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PreencherClientePedido;
