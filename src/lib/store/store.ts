import { create } from "zustand";
// types
import type { Game, RootState } from "../types/state";
import { persist } from "zustand/middleware";

const initialState: RootState = {
  user: null,
  gamesList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  currentGame: null,
};

const useStore = create(
  persist(() => initialState, {
    name: "ttt-storage",
  }),
);

const resetState = () => useStore.setState(() => ({ ...initialState }));
const setUser = (user: RootState["user"]) =>
  useStore.setState((state) => ({ ...state, user }));
const setGamesList = (gamesList: RootState["gamesList"]) =>
  useStore.setState((state) => ({ ...state, gamesList }));
const setCurrentGame = (currentGame: Game) =>
  useStore.setState((state) => ({ ...state, currentGame }));

export { useStore, resetState, setUser, setGamesList, setCurrentGame };
