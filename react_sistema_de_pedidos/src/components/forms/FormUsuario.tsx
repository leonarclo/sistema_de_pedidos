/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
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
import { LoadingSpinner } from "../ui/loading-spinner";
import { Check } from "lucide-react";
import { useRegistrarMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IUsuario } from "@/types";
import { useEffect } from "react";
import { useEditarUsuarioMutation } from "@/redux/api/usuariosApi";
import { closeModal } from "@/redux/features/modalSlice";
import { useToast } from "../ui/use-toast";

function FormUsuario() {
  const dispatch = useAppDispatch();
  const [inserirUsuario, { isLoading: inserindo, isSuccess: usuarioInserido }] =
    useRegistrarMutation();
  const [editarIsuario, { isLoading: editando, isSuccess: usuarioEditado }] =
    useEditarUsuarioMutation();

  const { toast } = useToast();

  const estaEditando = useAppSelector(
    (state) => state.editarUsuarioState.editarUsuario
  );

  useEffect(() => {
    if (usuarioInserido || usuarioEditado) {
      dispatch(closeModal("user"));
      toast({
        variant: "success",
        description: "Sucesso!",
      });
    }
  }, [usuarioEditado, usuarioInserido]);

  const NovoUsuarioSchema = z.object({
    usuario: z.string({ required_error: "Preenchimento obrigatório" }).min(3, {
      message: "O nome de usuário precisa conter no mínimo 3 letras",
    }),
    password: estaEditando
      ? z.string({}).optional()
      : z.string({ required_error: "Preenchimento obrigatório" }).min(6, {
          message: "A senha precisa conter pelo menos 6 caracteres",
        }),
    nomeCompleto: z
      .string({ required_error: "Preenchimento obrigatório" })
      .min(6, {
        message: "O nome completo precisa conter no mínimo 6 letras",
      }),
    departamento: z
      .string({ required_error: "Preenchimento obrigatório" })
      .min(2, {
        message: "O departamento precisa conter no mínimo 2 letras",
      }),
    email: z.string({ required_error: "Preenchimento obrigatório" }).email({
      message: "Insira um email válido",
    }),
    nivel: z.coerce
      .number({ required_error: "Preenchimento obrigatório" })
      .min(1, {
        message: "Insira um nível válido",
      }),
  });

  const form = useForm<z.infer<typeof NovoUsuarioSchema>>({
    resolver: zodResolver(NovoUsuarioSchema),
    defaultValues: {
      usuario: "",
      password: "",
      nomeCompleto: "",
      email: "",
      departamento: "",
      nivel: 0,
    },
  });

  function onSubmit(values: z.infer<typeof NovoUsuarioSchema>) {
    form.setValue("nivel", Number(values.nivel));
    if (estaEditando) {
      editarIsuario({ body: values, id: estaEditando.id });
    } else {
      inserirUsuario(values);
    }
    console.log(values);
  }

  useEffect(() => {
    if (estaEditando) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(estaEditando).forEach((key: any) =>
        form.setValue(key, estaEditando[key as keyof IUsuario])
      );
    }
  }, [estaEditando, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <div className="flex gap-6 items-center">
          <FormField
            control={form.control}
            name="usuario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário:</FormLabel>
                <FormControl className="rounded">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha:</FormLabel>
                <FormControl className="rounded">
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl className="rounded">
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nomeCompleto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo:</FormLabel>
              <FormControl className="rounded">
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-6 w-full">
          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Departamento:</FormLabel>
                <FormControl className="rounded w-full">
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nivel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível:</FormLabel>
                <Select
                  value={field.value.toString()}
                  onValueChange={field.onChange}
                >
                  <FormControl className="rounded w-40">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white ">
                    <SelectItem value="1">Consultor</SelectItem>
                    <SelectItem value="5">Editor</SelectItem>
                    <SelectItem value="7">ADM</SelectItem>
                    <SelectItem value="0">Inativo</SelectItem>
                    {estaEditando?.nivel == 9 ? (
                      <SelectItem value="9">Master</SelectItem>
                    ) : null}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded self-center"
        >
          {inserindo || (editando && <LoadingSpinner />)}
          {usuarioInserido || (usuarioEditado && <Check />)}
          {estaEditando ? "Salvar" : "Criar"}
        </Button>
      </form>
    </Form>
  );
}

export default FormUsuario;
