import { cn } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

export interface InputPhoneProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  value: string;
}

const InputPhone = React.forwardRef<HTMLInputElement, InputPhoneProps>(
  ({ className, name, placeholder, value }, ref) => {
    const { setValue } = useFormContext();
    const ajusta = (v: string) => {
      const digitos = !v ? "" : v.replace(/[^\d]/g, "");
      if (!digitos || digitos.length < 10) return v;
      const corte = digitos.length === 10 ? 6 : 7;
      const max = digitos.length > 11 ? 11 : digitos.length;
      return `(${digitos.substring(0, 2)}) ${digitos.substring(
        2,
        corte
      )}-${digitos.substring(corte, max)}`;
    };

    const maskBuilder = (v: string) => {
      if (!v || v.length === 0) return "";
      const a = ajusta(v);
      return a.length > 14 ? "(99) 99999-9999" : "(99) 9999-99999";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, ajusta(e.target.value));
    };

    return (
      <InputMask
        name={name}
        value={value}
        className={cn(
          "flex h-8 w-full rounded-md border border-zinc-400 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        maskChar=""
        onChange={handleChange}
        mask={maskBuilder(value)}
        placeholder={placeholder}
        inputRef={ref}
      />
    );
  }
);

InputPhone.displayName = "InputPhone";

export { InputPhone };
