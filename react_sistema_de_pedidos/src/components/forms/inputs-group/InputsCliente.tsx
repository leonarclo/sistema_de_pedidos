import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";

import { cargoOptions } from "@/constants/cargoOptions";
import { InputMasked } from "../../ui/input-mask";
import { InputPhone } from "../../ui/input-phone";
import { useFormContext } from "react-hook-form";
function InputsCliente() {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="cnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl className="rounded">
              <InputMasked mask="cnpj" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="empresa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Empresa</FormLabel>
            <FormControl className="rounded">
              <Input type="text" {...field} value={field.value || ""} />
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl className="rounded">
              <Input type="text" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cpfCliente"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CPF</FormLabel>
            <FormControl className="rounded">
              <InputMasked mask="cpf" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl className="rounded">
              <Input type="email" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="telefone1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone 1</FormLabel>
            <FormControl className="rounded">
              <InputPhone {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="telefone2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone 2</FormLabel>
            <FormControl className="rounded">
              <InputPhone {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="emailLogin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Sistema</FormLabel>
            <FormControl className="rounded">
              <Input type="email" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsCliente;
