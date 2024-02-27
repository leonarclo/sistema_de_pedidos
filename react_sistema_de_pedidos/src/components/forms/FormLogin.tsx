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
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  usuario: z.string().min(3, {
    message: "O nome de usuário precisa conter no mínimo 3 letras",
  }),
  password: z.string().min(3, {
    message: "Senha muito pequena (mínimo 3 caracteres)",
  }),
});

function FormLogin() {
  const [login, { data, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = ((location.state as any)?.from.pathname as string) || "/";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.removeItem("token");
      localStorage.setItem("token", data.token);
      navigate("/");
    }
  }, [isSuccess, navigate, from, data]);

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
              <FormControl>
                <Input {...field} className="w-96" />
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
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          className="bg-emerald-500 text-white rounded self-center"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
}

export default FormLogin;
