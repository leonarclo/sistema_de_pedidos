import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import moment from "moment";
import { Textarea } from "../../ui/textarea";

function InputsAdm() {
  const form = useFormContext();

  return (
    <>
      <div className="flex flex-col">
        <FormField
          control={form.control}
          name="planilhaVendas"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md min-h-12">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Planilha de Vendas:</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licencaGerada"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md min-h-12">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Licença Gerada:</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assinatura"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md min-h-12">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Assinatura:</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chat"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md min-h-12">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Chat:</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="posVenda"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md min-h-12">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Pós-Venda:</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="notaFiscal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nota Fiscal:</FormLabel>
              <FormControl className="rounded">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unidadeNegocio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unidade de Negócio:</FormLabel>
              <FormControl className="rounded">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="previsaoEntrega"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previsão de Entrega:</FormLabel>
              <FormControl className="rounded">
                <Input
                  {...field}
                  value={
                    field.value
                      ? moment(field.value).format("YYYY-MM-DD")
                      : "" || ""
                  }
                  type="date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codigoRastreio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Rastreio:</FormLabel>
              <FormControl className="rounded">
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="numeroSerie"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Números de Série:</FormLabel>
            <FormControl className="w-[10vw] h-[200px]">
              <Textarea
                className="resize-none rounded"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsAdm;
