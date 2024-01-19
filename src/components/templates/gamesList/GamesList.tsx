"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/atoms/button/Button";
import DataTable from "~/components/organisms/dataTable/Datatable";
// types
import type { Game } from "~/lib/types/state";

function GamesList() {
  const user = "null";
  const gamesList: Game[] = [];
  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "id",
      header: "#",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <Button
              variant="tertiary"
              onClick={() => handleGameJoin(row.original)}
            >
              Join
            </Button>
          </div>
        );
      },
    },
  ];

  function handleGameJoin(game: Game) {
    // console.log("Joined game ", game);
  }

  if (!user) return <span>Please register/login to play!</span>;

  return (
    <div className="w-full max-w-7xl rounded-md shadow-xl">
      <DataTable columns={columns} data={gamesList} />
    </div>
  );
}

export default GamesList;
