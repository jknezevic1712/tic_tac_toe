"use client";

import { useState } from "react";
// utils
import { gameFields } from "~/lib/mockData";

type GameBoardProps = {
  params: {
    slug: string;
  };
};
function GameBoard({ params: { slug } }: GameBoardProps) {
  const [data, setData] = useState(gameFields);

  return (
    <main className="mb-16 mt-32 flex w-full max-w-7xl flex-col items-center justify-center gap-6 2xl:mt-52">
      <h1 className="mb-12 text-4xl font-extrabold sm:text-5xl">
        Game #{slug}
      </h1>

      <div className="grid h-full w-full grid-cols-3 content-center justify-center gap-3 p-6 md:gap-8">
        {data.map((field, idx) => {
          // console.log("FIELD ", field);

          return (
            <div
              key={field.id}
              className={`field-${idx} flex aspect-square w-full cursor-pointer items-center justify-center self-center justify-self-center rounded-sm border-2 transition-all hover:bg-slate-300 md:w-full`}
              // onClick={(e) => draw(e, 1)}
            >
              <span className="text-4xl font-extrabold">
                {field.checked ? "X" : ""}
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default GameBoard;
