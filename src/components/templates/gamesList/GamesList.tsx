"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/atoms/button/Button";
import DataTable from "~/components/organisms/dataTable/Datatable";
// utils
import { gamesList } from "~/lib/mockData";
// types
import type { Game } from "~/lib/types/state";
import type { ColumnDef } from "@tanstack/react-table";
import { useStore } from "~/lib/store/store";

function GamesList() {
  const router = useRouter();

  const user = useStore((state) => state.user);
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
    router.push(`/game/${game.id}`);
  }

  if (!user) return <span>Please register/login to play!</span>;

  return (
    <div className="w-full rounded-md shadow-xl">
      <DataTable columns={columns} data={gamesList} />
    </div>
  );
}

export default GamesList;
