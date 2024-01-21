"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/atoms/button/Button";
import DataTable from "~/components/organisms/dataTable/Datatable";
// utils
import { fetchGames } from "~/lib/requests/games";
import { setGamesList, useStore } from "~/lib/store/store";
// types
import type { Game } from "~/lib/types/state";
import type { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

function GamesList() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const gamesList = useStore((state) => state.gamesList);
  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "id",
      header: "#",
    },
    {
      accessorKey: "first_player.username",
      header: "Created by",
    },
    {
      accessorKey: "status",
      header: "Status",
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

  useQuery({
    queryKey: ["fetch-games"],
    queryFn: async () => {
      const games = await fetchGames(user!.token);
      games && setGamesList(games);
    },
    staleTime: 15000,
  });

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
