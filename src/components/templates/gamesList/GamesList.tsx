"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button } from "~/components/atoms/button/Button";
import DataTable from "~/components/organisms/dataTable/Datatable";
// utils
import { createNewGame, fetchGames, joinGame } from "~/lib/requests/games";
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
      cell: ({ row }) => (
        <div className="text-right">
          <Button
            variant="tertiary"
            onClick={() => handleGameJoin(row.original)}
            disabled={canUserJoinGame(row.original)}
          >
            {isUserAlreadyInThatGame(row.original) ? "Continue" : "Join"}
          </Button>
        </div>
      ),
    },
  ];

  useQuery({
    queryKey: ["fetch-games"],
    queryFn: async () => await fetchGames(user!.token),
  });

  function canUserJoinGame(game: Game) {
    if (game.status === "finished") return true;
    else if (
      game.status === "progress" &&
      (game.first_player.id === +user!.id ||
        game.second_player!.id === +user!.id)
    )
      return false;
    else if (game.status === "open") return false;
    return true;
  }

  function isUserAlreadyInThatGame(game: Game) {
    if (
      game.first_player.username === user!.username ||
      game.second_player?.username === user!.username
    )
      return true;
    return false;
  }

  async function handleCreateNewGame() {
    await createNewGame(user!.token).then((newGame) => {
      if (newGame) return handleGameJoin(newGame);
    });
  }

  async function handleGameJoin(game: Game) {
    if (isUserAlreadyInThatGame(game)) return router.push(`/game/${game.id}`);

    await joinGame(user!.token, game.id);
    router.push(`/game/${game.id}`);
  }

  if (!user) return <span>Please register/login to play!</span>;

  return (
    <div className="flex w-full flex-col rounded-md shadow-xl">
      <Button className="mb-4 w-fit self-end" onClick={handleCreateNewGame}>
        Create New
      </Button>
      <DataTable columns={columns} data={gamesList} userToken={user.token} />
    </div>
  );
}

export default GamesList;
