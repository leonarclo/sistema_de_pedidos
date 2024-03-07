/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@tanstack/react-table";
import { useMemo } from "react";
import { DebouncedInput } from "../ui/debounce-input";

export function Filters({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      column.id === "status" || column.id === "categoria"
        ? Array.from(column.getFacetedUniqueValues().keys()).sort()
        : [],
    [column.getFacetedUniqueValues()]
  );

  return (
    <div className="pb-2">
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: string) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue as string) ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
        className="border-gray-200 rounded text-gray-400"
        list={column.id + "list"}
      />
    </div>
  );
}
