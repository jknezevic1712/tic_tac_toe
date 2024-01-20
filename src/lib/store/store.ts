import { create } from "zustand";
// types
import type { RootState } from "../types/state";
import { persist } from "zustand/middleware";

const useStore = create(
  persist<RootState>(
    () => ({
      user: null,
    }),
    {
      name: "ttt-storage",
    },
  ),
);

const setUser = (user: RootState["user"]) =>
  useStore.setState((state) => ({ ...state, user }));
const resetUser = () =>
  useStore.setState((state) => ({ ...state, user: null }));

export { useStore, setUser, resetUser };
