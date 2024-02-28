import { statusOptions } from "@/constants/statusOptions";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { useFormContext } from "react-hook-form";
import moment from "moment";

function InputsDetalhes() {
  const form = useFormContext();
  return (
    <>
      <FormField
        defaultValue="Aberta"
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl className="rounded w-64">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.name}
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
        name="leadOrigem"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Origem Lead</FormLabel>
            <FormControl className="rounded" autoFocus={true}>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="leadData"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="pb-[4px] mt-1">Data Lead</FormLabel>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "min-w-[200px] flex h-8 w-full border border-zinc-400 bg-background px-3 py-2",
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
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsDetalhes;
