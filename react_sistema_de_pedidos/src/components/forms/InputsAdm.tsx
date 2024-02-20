import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import moment from "moment";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { Textarea } from "../ui/textarea";

function InputsAdm() {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="planilhaVendas"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
      <FormField
        control={form.control}
        name="notaFiscal"
        defaultValue=""
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
        defaultValue=""
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
      <FormField
        control={form.control}
        name="previsaoEntrega"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="pb-[6px]">Previsão de Entrega:</FormLabel>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      moment(field.value).format("YYYY-MM-DD")
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  locale={ptBR}
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date <= new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="codigoRastreio"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Código de Rastreio:</FormLabel>
            <FormControl className="rounded">
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="numeroSerie"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Números de Série:</FormLabel>
            <FormControl className="w-[10vw] h-[200px]">
              <Textarea className="resize-none rounded" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsAdm;
