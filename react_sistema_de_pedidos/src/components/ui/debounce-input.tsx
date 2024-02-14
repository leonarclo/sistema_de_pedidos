import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce: initialDebounceValue = 500,
  className,
  ...rest
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> & {
    dynamicDebounce?: number;
  }) {
  const [value, setValue] = useState(initialValue);
  const [debounceValue, setDebounceValue] = useState(initialDebounceValue);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onChange(e.target.value);
    }, debounceValue);
  };

  useEffect(() => {
    if (typeof rest.dynamicDebounce !== "undefined") {
      setDebounceValue(rest.dynamicDebounce);
    }
  }, [rest.dynamicDebounce]);

  return (
    <input
      {...rest}
      value={value}
      onChange={handleInputChange}
      className={cn(
        "flex h-8 w-full rounded-md border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
}
