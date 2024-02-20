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

import { InputMasked } from "../ui/input-mask";
import { estadosOptions } from "@/constants/estadosOptions";

import { cepApi } from "@/lib/cep-api";
import { useState } from "react";
import { InputBRL } from "../ui/input-brl";
import { useFormContext } from "react-hook-form";

function InputsEndereco() {
  const form = useFormContext();
  const [cepValue, setCepValue] = useState<string>("");
  const handleCepInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCepValue(event.target.value);
  };

  const handleCepBlur = async () => {
    try {
      const data = await cepApi(cepValue, form);
      form.setValue("logradouro", data.street);
      form.setValue("bairro", data.neighborhood);
      form.setValue("cidade", data.city);
      form.setValue("estado", data.state);
      form.clearErrors(["logradouro", "bairro", "cidade", "estado"]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <>
      <FormField
        control={form.control}
        name="cep"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl className="rounded" onBlur={handleCepBlur}>
              <InputMasked
                type="text"
                mask="cep"
                {...field}
                onChange={(event) => {
                  handleCepInputChange(event);
                  field.onChange(event);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="logradouro"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logradouro</FormLabel>
            <FormControl className="rounded">
              <Input
                type="text"
                {...field}
                defaultValue={form.getValues().logradouro}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="numeroEndereco"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número</FormLabel>
            <FormControl className="rounded">
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="complemento"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complemento</FormLabel>
            <FormControl className="rounded">
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bairro"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bairro</FormLabel>
            <FormControl className="rounded">
              <Input
                type="text"
                {...field}
                defaultValue={form.getValues().bairro}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cidade"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade</FormLabel>
            <FormControl className="rounded">
              <Input
                type="text"
                {...field}
                defaultValue={form.getValues().cidade}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="estado"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado (UF)</FormLabel>
            <Select
              value={form.getValues().estado}
              onValueChange={(e) => {
                field.onChange(e);
              }}
            >
              <FormControl className="rounded w-64">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white ">
                {estadosOptions.map((status) => (
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
        name="fretePreco"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frete (R$)</FormLabel>
            <FormControl className="rounded">
              <InputBRL {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="transportadora"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Transportadora</FormLabel>
            <FormControl className="rounded">
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsEndereco;
