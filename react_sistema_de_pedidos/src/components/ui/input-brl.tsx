import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DECIMAL_SIZE = 2;

const formatCurrency = (value: number | string): string => {
  const valueString = `${value}`;
  if (!/\D/.test(valueString.replace(".", ""))) {
    const parts = valueString.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return parts.join(",");
  }
  return valueString;
};

const InputBRL = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, type, ...props }, ref) => {
    const [currentValue, setCurrentValue] = React.useState<string>(
      formatCurrency(value)
    );

    React.useEffect(() => {
      if (value === "" || value === undefined || value === null) {
        setCurrentValue("");
        return;
      }

      setCurrentValue(formatCurrency(value));
    }, [value]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueRemoved = event.target.value.replace(/[^0-9]/g, "");

      if (valueRemoved === "") {
        onChange({ ...event, target: { ...event.target, value: "" } });
        setCurrentValue("");
        return;
      }

      const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
      const newValue = [
        valueRemoved.slice(0, sizeSlice),
        ".",
        valueRemoved.slice(sizeSlice),
      ].join("");

      onChange({
        ...event,
        target: {
          ...event.target,
          value: formatCurrency(newValue),
        },
      });
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={currentValue}
        onChange={handleOnChange}
        ref={ref}
        {...props}
      />
    );
  }
);

InputBRL.displayName = "InputBRL";

export { InputBRL };
