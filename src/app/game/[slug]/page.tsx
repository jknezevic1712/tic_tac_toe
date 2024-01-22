"use client";
import { useQuery } from "@tanstack/react-query";
// components
import { Button } from "~/components/atoms/button/Button";
// utils
import "~/styles/gameBoard.css";
import { useStore } from "~/lib/store/store";
import { fetchGame, makeMove } from "~/lib/requests/games";
import Link from "next/link";

type GameBoardProps = {
  params: {
    slug: string;
  };
};
function GameBoard({ params: { slug } }: GameBoardProps) {
  const user = useStore((state) => state.user);
  const currentGame = useStore((state) => state.currentGame);
  let fieldID = 0;

  useQuery({
    queryKey: ["fetch-game", slug],
    queryFn: async () => await fetchGame(user!.token, +slug),
    refetchInterval: 1500,
  });

  function showCorrectSymbol(field: number | null) {
    if (!field) return "";
    else if (field === +user!.id) return "X";
    return "O";
  }

  if (!currentGame) return <span>Loading...</span>;

  return (
    <main className="mb-16 mt-32 flex w-full max-w-7xl flex-col items-center justify-center gap-6 2xl:mt-52">
      <h1 className="mb-12 border-b-4 border-zinc-950 p-1 text-4xl font-extrabold sm:text-5xl">
        Game #{slug}
      </h1>

      {(currentGame.winner ?? currentGame.status === "finished") && (
        <div className="mb-12 flex flex-col items-center justify-center gap-3">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {currentGame.winner
              ? currentGame.winner?.username + " won!"
              : "Draw!"}
          </h2>
          <Link href={"/"}>
            <Button variant="tertiary">Go Back</Button>
          </Link>
        </div>
      )}

      <div className="flex w-3/4 flex-wrap items-start md:w-1/2 xl:w-1/3">
        {currentGame?.board.map((row, rowIdx) =>
          row.map((field, fieldIdx) => {
            fieldID++;

            return (
              <Button
                key={fieldID}
                type="button"
                variant="board"
                className={`field-${fieldID} flex h-24 w-1/3 cursor-pointer items-center justify-center transition-all hover:bg-slate-300`}
                disabled={
                  field ? true : false || currentGame.status === "finished"
                }
                onClick={() =>
                  makeMove(user!.token, +slug, { row: rowIdx, col: fieldIdx })
                }
              >
                <span className="text-4xl font-extrabold">
                  {showCorrectSymbol(field)}
                </span>
              </Button>
            );
          }),
        )}
      </div>
    </main>
  );
}

export default GameBoard;
