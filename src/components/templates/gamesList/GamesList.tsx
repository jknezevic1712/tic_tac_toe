"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button } from "~/components/atoms/button/Button";
import DataTable from "~/components/organisms/dataTable/Datatable";
// utils
import { fetchGames } from "~/lib/requests/games";
import { useStore } from "~/lib/store/store";
// types
import type { Game } from "~/lib/types/state";
import type { ColumnDef } from "@tanstack/react-table";

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
    queryFn: async () => await fetchGames(user!.token),
    staleTime: 5000,
    refetchOnMount: "always",
  });

  function handleGameJoin(game: Game) {
    // console.log("Joined game ", game);
    router.push(`/game/${game.id}`);
  }

  if (!user) return <span>Please register/login to play!</span>;

  return (
    <div className="flex w-full flex-col rounded-md shadow-xl">
      {/* <Button className="mb-4 w-fit self-end">Create New</Button> */}
      <DataTable columns={columns} data={gamesList} userToken={user.token} />
    </div>
  );
}

export default GamesList;
