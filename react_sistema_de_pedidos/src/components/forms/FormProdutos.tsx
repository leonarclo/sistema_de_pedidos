import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useEditarProdutoMutation,
  useInserirProdutoMutation,
} from "@/redux/api/pedidoApi";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal } from "@/redux/features/modalSlice";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Check } from "lucide-react";
import { IProduto } from "@/types";

const produtoSchema = z.object({
  produto: z.string().min(3, {
    message: "O nome do produto precisa conter no mínimo 3 letras",
  }),
  categoria: z.coerce.number().min(1, {
    message: "Selecione um tipo de produto",
  }),
});

function FormProdutos() {
  const dispatch = useAppDispatch();
  const [
    inserirProduto,
    { isLoading: inserindo, isSuccess: inserido, isError: erroInserir },
  ] = useInserirProdutoMutation();
  const [
    editarProduto,
    { isLoading: editando, isSuccess: editado, isError: erroEditar },
  ] = useEditarProdutoMutation();

  const { toast } = useToast();

  const estaEditando = useAppSelector(
    (state) => state.editarProdutoState.editarProduto
  );

  useEffect(() => {
    if (inserido || editado) {
      dispatch(closeModal("produtos"));
      toast({
        variant: "success",
        description: "Sucesso!",
      });
    } else if (erroInserir || erroEditar) {
      toast({
        variant: "error",
        description: "Ops... tente novamente!",
      });
    }
  }, [editado, inserido]);

  const form = useForm<z.infer<typeof produtoSchema>>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      produto: "",
      categoria: 0,
    },
  });

  function onSubmit(values: z.infer<typeof produtoSchema>) {
    if (estaEditando) {
      editarProduto({ body: values, id: estaEditando.id });
    } else {
      inserirProduto(values);
    }
    console.log(values);
  }

  useEffect(() => {
    if (estaEditando) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(estaEditando).forEach((key: any) =>
        form.setValue(key, estaEditando[key as keyof IProduto])
      );
    }
  }, [estaEditando, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="produto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto:</FormLabel>
              <FormControl className="rounded">
                <Input {...field} className="w-96" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria:</FormLabel>
              <Select
                value={field.value.toString()}
                onValueChange={field.onChange}
              >
                <FormControl className="rounded w-40">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem value="1" className="cursor-pointer">
                    Venda
                  </SelectItem>
                  <SelectItem value="2" className="cursor-pointer">
                    Contrato
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded self-center"
        >
          {inserindo || (editando && <LoadingSpinner />)}
          {inserido || (editado && <Check />)}
          {estaEditando ? "Salvar" : "Criar"}
        </Button>
      </form>
    </Form>
  );
}

export default FormProdutos;
