import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

import { cargoOptions } from "@/constants/cargoOptions";
import { InputMasked } from "../ui/input-mask";
import { InputPhone } from "../ui/input-phone";
import { useFormContext } from "react-hook-form";
function InputsCliente() {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="cnpj"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl className="rounded">
              <InputMasked mask="cnpj" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="empresa"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Empresa</FormLabel>
            <FormControl className="rounded">
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cargoCliente"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cargo</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl className="rounded w-64">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {cargoOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
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
        name="nomeCliente"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl className="rounded">
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cpfCliente"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>CPF</FormLabel>
            <FormControl className="rounded">
              <InputMasked mask="cpf" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl className="rounded">
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="telefone1"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone 1</FormLabel>
            <FormControl className="rounded">
              <InputPhone {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="telefone2"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone 2</FormLabel>
            <FormControl className="rounded">
              <InputPhone {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="emailLogin"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Sistema</FormLabel>
            <FormControl className="rounded">
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsCliente;
