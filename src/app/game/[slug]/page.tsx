"use client";

import { useState } from "react";
// components
import { Button } from "~/components/atoms/button/Button";
// utils
import "~/styles/gameBoard.css";
import { gameFields } from "~/lib/mockData";

type GameBoardProps = {
  params: {
    slug: string;
  };
};
function GameBoard({ params: { slug } }: GameBoardProps) {
  // const [data, setData] = useState(gameFields);

  return (
    <main className="mb-16 mt-32 flex w-full max-w-7xl flex-col items-center justify-center gap-6 2xl:mt-52">
      <h1 className="mb-12 text-4xl font-extrabold sm:text-5xl">
        Game #{slug}
      </h1>

      <div className="flex w-3/4 flex-wrap items-start md:w-1/2 xl:w-1/3">
        {gameFields.map((field, idx) => {
          // console.log("FIELD ", field);

          return (
            <Button
              key={field.id}
              type="button"
              variant="board"
              className={`field-${idx} flex h-24 w-1/3 cursor-pointer items-center justify-center transition-all hover:bg-slate-300`}
              disabled={field.checked ? true : false}
              // onClick={(e) => draw(e, 1)}
            >
              <span className="text-4xl font-extrabold">
                {field.checked ? "X" : ""}
              </span>
            </Button>
          );
        })}
      </div>
    </main>
  );
}

export default GameBoard;
