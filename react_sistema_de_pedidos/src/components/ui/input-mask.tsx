import * as React from "react";
import InputMask from "react-input-mask";

import { cn } from "@/lib/utils";

const MASK_TYPE = {
  phone: "(99) 99999999" || "(99) 99999999999",
  cnpj: "99.999.999/9999-99",
  cep: "99999-999",
  cpf: "999.999.999-99",
} as const;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: keyof typeof MASK_TYPE;
}

const InputMasked = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, ...props }, ref) => {
    return (
      <InputMask
        type={type}
        alwaysShowMask={false}
        mask={MASK_TYPE[mask]}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        inputRef={ref}
        {...props}
      />
    );
  }
);
InputMasked.displayName = "InputMasked";

export { InputMasked };
