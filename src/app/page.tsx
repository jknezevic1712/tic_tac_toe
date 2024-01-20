import GamesList from "~/components/templates/gamesList/GamesList";

export default function HomePage() {
  return (
    <main className="flex w-full max-w-7xl flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Tic Tac Toe</h1>
        <GamesList />
      </div>
    </main>
  );
}
