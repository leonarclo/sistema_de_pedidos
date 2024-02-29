/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "../ui/debounce-input";

export function Filters({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue() as string | undefined;

  return (
    <div className="pb-2">
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border-gray-200 rounded text-gray-400"
        list={column.id + "list"}
      />
    </div>
  );
}
