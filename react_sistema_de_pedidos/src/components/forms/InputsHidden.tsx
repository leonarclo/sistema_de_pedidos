import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

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
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="data"
        render={({ field }) => (
          <FormItem hidden>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="chave"
        render={({ field }) => (
          <FormItem hidden>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputsHidden;
