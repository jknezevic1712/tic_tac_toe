export type Game = {
  id: number;
  board: number[][];
  winner: {
    id: number;
    username: string;
  } | null;
  first_player: {
    id: number;
    username: string;
  };
  second_player: {
    id: number;
    username: string;
  } | null;
  created: string;
  status: "open" | "progress" | "finished";
};

export type User = {
  id: string;
  username: string;
  token: string;
};
export type RootState = {
  user: User | null;
  gamesList: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
  };
  currentGame: Game | null;
};
