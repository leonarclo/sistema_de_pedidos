import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";

const loginSchema = z.object({
  usuario: z.string().min(3, {
    message: "O nome de usuário precisa conter no mínimo 3 letras",
  }),
  password: z.string().min(3, {
    message: "Senha muito pequena (mínimo 3 caracteres)",
  }),
});

function FormLogin() {
  const [login, { data, isLoading, isSuccess, isError }] = useLoginMutation();
  const { toast } = useToast();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const expirationDate = new Date();
      expirationDate.setHours(
        expirationDate.getHours() +
          import.meta.env.VITE_APP_TOKEN_EXPIRES_HOURS -
          3
      );

      Cookies.set("access_token", data.token, {
        expires: expirationDate,
      });
      navigate("/");
    }
    if (isError) {
      toast({
        variant: "error",
        description: "Credenciais inválidas ou usuário inexistente!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, isError]);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="usuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário:</FormLabel>
              <FormControl className="rounded">
                <Input {...field} className="w-80" autoFocus />
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
        <Button
          type="submit"
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded self-center"
        >
          {isLoading ? <LoadingSpinner /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}

export default FormLogin;
