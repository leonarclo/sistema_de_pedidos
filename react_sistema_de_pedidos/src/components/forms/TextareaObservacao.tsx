import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";

function TextareaObservacao() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="observacoes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Observações:</FormLabel>
          <FormControl className="h-[250px]">
            <Textarea className="resize-none rounded" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextareaObservacao;
