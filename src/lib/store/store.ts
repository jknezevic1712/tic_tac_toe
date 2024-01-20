import { create } from "zustand";
// types
import type { RootState } from "../types/state";

const useStore = create<RootState>(() => ({
  user: null,
}));

const setUser = (user: RootState["user"]) =>
  useStore.setState((state) => ({ ...state, user }));
const resetUser = () =>
  useStore.setState((state) => ({ ...state, user: null }));

export { useStore, setUser, resetUser };
