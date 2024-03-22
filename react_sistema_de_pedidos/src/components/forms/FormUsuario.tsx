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
  const [
    inserirUsuario,
    { isLoading: inserindo, isSuccess: inserido, isError: erroInserir },
  ] = useRegistrarMutation();
  const [
    editarUsuario,
    { isLoading: editando, isSuccess: editado, isError: erroEditar },
  ] = useEditarUsuarioMutation();

  const { toast } = useToast();

  const estaEditando = useAppSelector(
    (state) => state.editarUsuarioState.editarUsuario
  );

  const usuario = useAppSelector((state) => state.getUserState.usuario);

  useEffect(() => {
    if (inserido || editado) {
      dispatch(closeModal("user"));
      toast({
        variant: "success",
        description: "Sucesso!",
      });
    } else if (erroInserir || erroEditar) {
      toast({
        variant: "error",
        description: "Usuário inválido ou já existe!",
      });
    }
  }, [editado, inserido, erroInserir, erroEditar]);

  const NovoUsuarioSchema = z.object({
    usuario: z.string({ required_error: "Preenchimento obrigatório" }).min(3, {
      message: "O nome de usuário precisa conter no mínimo 3 letras",
    }),
    password: estaEditando
      ? z
          .string({})
          .min(6, {
            message: "A senha precisa conter pelo menos 6 caracteres",
          })
          .optional()
          .or(z.literal(""))
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
      .min(1, {
        message: "Selecione um departamento",
      }),
    email: z.string({ required_error: "Preenchimento obrigatório" }).email({
      message: "Insira um email válido",
    }),
    nivel: z.coerce.number({ required_error: "Preenchimento obrigatório" }),
  });

  const form = useForm<z.infer<typeof NovoUsuarioSchema>>({
    resolver: zodResolver(NovoUsuarioSchema),
    defaultValues: {
      usuario: "",
      password: "",
      nomeCompleto: "",
      email: "",
      departamento: "",
      nivel: 1,
    },
  });

  function onSubmit(values: z.infer<typeof NovoUsuarioSchema>) {
    form.setValue("nivel", Number(values.nivel));
    if (estaEditando) {
      editarUsuario({ body: values, id: estaEditando.id });
    } else {
      inserirUsuario(values);
    }
  }

  useEffect(() => {
    if (estaEditando) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(estaEditando).forEach((key: any) =>
        form.setValue(key, estaEditando[key as keyof IUsuario])
      );
    }
  }, [estaEditando, form]);

  useEffect(() => {
    if (estaEditando && estaEditando?.nivel == 7) {
      form.setValue("nivel", 7);
    }
  }, [form]);

  const setores = [
    "Pós-venda",
    "Comercial",
    "Gerência",
    "Administrativo",
    "Faturamento",
    "Liticação",
    "Financeiro",
    "TI",
    "Expedição",
    "Assistência",
    "Suporte Técnico",
    "Marketing",
    "Desenvolvimento",
    "Outro",
  ];

  const sortedSetores = setores.sort((a, b) => {
    if (a === "Outro") return 1;
    if (b === "Outro") return -1;
    return a.localeCompare(b);
  });

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
                  <Input {...field} type="password" value={field.value || ""} />
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
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="rounded w-64">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {sortedSetores.map((setor) => (
                      <SelectItem key={setor} value={setor}>
                        {setor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    <SelectItem value="1" className="cursor-pointer">
                      Consultor
                    </SelectItem>
                    <SelectItem value="5" className="cursor-pointer">
                      Editor
                    </SelectItem>
                    {estaEditando && (
                      <SelectItem value="0" className="cursor-pointer">
                        Inativo
                      </SelectItem>
                    )}
                    {estaEditando && estaEditando?.nivel == 7 && (
                      <SelectItem value="7" className="cursor-pointer">
                        ADM
                      </SelectItem>
                    )}
                    {usuario?.nivel == 9 ? (
                      <>
                        <SelectItem value="7" className="cursor-pointer">
                          ADM
                        </SelectItem>
                        <SelectItem value="9" className="cursor-pointer">
                          Master
                        </SelectItem>
                      </>
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
          {inserido || (editado && <Check />)}
          {estaEditando ? "Salvar" : "Criar"}
        </Button>
      </form>
    </Form>
  );
}

export default FormUsuario;
