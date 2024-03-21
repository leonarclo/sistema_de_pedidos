import { statusOptions } from "@/constants/statusOptions";
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
import { useFormContext } from "react-hook-form";
import moment from "moment";

function InputsDetalhes() {
  const today = new Date();
  today.setHours(today.getHours() - 3);

  const maxDate = today.toISOString().split("T")[0];

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
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="leadData"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data Lead</FormLabel>
            <FormControl className="rounded">
              <Input
                {...field}
                value={
                  field.value
                    ? moment.utc(field.value).format("YYYY-MM-DD")
                    : "" || ""
                }
                type="date"
                max={maxDate}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsDetalhes;
