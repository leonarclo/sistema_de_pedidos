import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

function InputsHidden() {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="consultor"
        render={({ field }) => (
          <FormItem hidden>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="categoriaGrupo"
        render={({ field }) => (
          <FormItem hidden>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsHidden;
