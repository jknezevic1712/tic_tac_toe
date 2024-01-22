"use client";
// components
import { Button } from "~/components/atoms/button/Button";
// utils
import "~/styles/gameBoard.css";
import { useStore } from "~/lib/store/store";
import { fetchGame, makeMove } from "~/lib/requests/games";
import { useQuery } from "@tanstack/react-query";

type GameBoardProps = {
  params: {
    slug: string;
  };
};
function GameBoard({ params: { slug } }: GameBoardProps) {
  const user = useStore((state) => state.user);
  const currentGame = useStore((state) => state.currentGame);

  useQuery({
    queryKey: ["fetch-game", slug],
    queryFn: async () => await fetchGame(user!.token, +slug),
    refetchInterval: 5000,
  });

  function showCorrectSymbol(field: number | null) {
    if (!field) return "";
    else if (field === +user!.id) return "X";
    return "O";
  }

  if (!currentGame) return <span>Loading...</span>;

  return (
    <main className="mb-16 mt-32 flex w-full max-w-7xl flex-col items-center justify-center gap-6 2xl:mt-52">
      <h1 className="mb-12 text-4xl font-extrabold sm:text-5xl">
        Game #{slug}
      </h1>

      <div className="flex w-3/4 flex-wrap items-start md:w-1/2 xl:w-1/3">
        {currentGame?.board.map((row, rowIdx) =>
          row.map((field, fieldIdx) => (
            <Button
              key={rowIdx.toString() + fieldIdx.toString()}
              type="button"
              variant="board"
              className={`field-${fieldIdx} flex h-24 w-1/3 cursor-pointer items-center justify-center transition-all hover:bg-slate-300`}
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
          )),
        )}
      </div>
    </main>
  );
}

export default GameBoard;
