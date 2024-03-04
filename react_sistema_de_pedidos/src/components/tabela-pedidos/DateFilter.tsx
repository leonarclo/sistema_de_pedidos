/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "../ui/debounce-input";
import moment from "moment";
import { Button } from "../ui/button";

interface DateFilterProps<TData> {
  column?: Column<TData, any>; // Tornar column opcional
}

function DateFilter<TData>({ column }: DateFilterProps<TData>) {
  if (!column) {
    return null;
  }
  const columnFilterValue = column.getFilterValue();

  const values = columnFilterValue as [string, string];
  const startDate = values?.[0];
  const endDate = values?.[1];

  return (
    <div className="flex items-center gap-2 justify-end p-6 mb-4">
      <div className="flex gap-2">
        <DebouncedInput
          className="rounded p-4"
          type="date"
          debounce={200}
          value={startDate ? moment(startDate).format("YYYY-MM-DD") : ""}
          onChange={(value) => {
            column.setFilterValue((old: [string, string]) => [value, old?.[1]]);
          }}
        />
        <DebouncedInput
          className="rounded p-4"
          type="date"
          debounce={200}
          value={endDate ? moment(endDate).format("YYYY-MM-DD") : ""}
          onChange={(value) => {
            column.setFilterValue((old: [string, string]) => [old?.[0], value]);
          }}
        />
      </div>
      <div className="h-1" />
      <Button
        variant={"link"}
        onClick={() => {
          column.setFilterValue([]); // Limpa os valores do filtro
        }}
      >
        Limpar
      </Button>
    </div>
  );
}

export default DateFilter;
