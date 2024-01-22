import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "~/components/atoms/button/Button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "~/components/molecules/table/Table";
// utils
import { fetchGames } from "~/lib/requests/games";
// types
import type { RootState } from "~/lib/types/state";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: RootState["gamesList"] & {
    results: TData[];
  };
  userToken: string;
}

function DataTable<TData, TValue>({
  columns,
  data,
  userToken,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  async function fetchPage(url?: string) {
    console.log("url ", url);
    await fetchGames(userToken, url);
  }

  function statusColor(status: "open" | "progress" | "finished") {
    if (status === "open") return "bg-green-400";
    else if (status === "progress") return "bg-yellow-400";
    return "bg-rose-400";
  }

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="p-4 font-extrabold text-zinc-600"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  // console.log("CELL ", cell);
                  return (
                    <TableCell
                      key={cell.id}
                      className={`bg-opacity-70 p-3
                        ${cell.column.id === "first_player_username" && "font-bold"}`}
                    >
                      <span
                        className={`${cell.column.id === "status" ? statusColor(cell.row.getValue("status")) + " rounded-sm p-2" : ""}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 border-t-2 border-zinc-100 p-4 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchPage(data.previous ?? undefined)}
          disabled={!data.previous}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchPage(data.next ?? undefined)}
          disabled={!data.next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default DataTable;
