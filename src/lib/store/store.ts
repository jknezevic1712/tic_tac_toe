import { create } from "zustand";
// types
import type { RootState } from "../types/state";
import { persist } from "zustand/middleware";

const initialState: RootState = {
  user: null,
  gamesList: [],
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

export { useStore, resetState, setUser, setGamesList };
