export type Game = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  username: string;
  token: string;
};
export type RootState = {
  user: User | null;
};
