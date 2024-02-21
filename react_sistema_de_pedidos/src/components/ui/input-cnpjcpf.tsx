import { cn } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

export interface InputCPFCNPJProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  value: string;
}

const InputCPFCNPJ = React.forwardRef<HTMLInputElement, InputCPFCNPJProps>(
  ({ className, name, placeholder, value }, ref) => {
    const { setValue } = useFormContext();
    const ajusta = (v: string) => {
      return !v ? "" : v.replace(/[^\d]/g, "");
    };

    const maskBuilder = (v: string) => {
      if (!v || v.length === 0) return "";
      const a = ajusta(v);
      return a.length > 11 ? "99.999.999/9999-99" : "999.999.999-999";
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

InputCPFCNPJ.displayName = "InputCPFCNPJ";

export { InputCPFCNPJ };
