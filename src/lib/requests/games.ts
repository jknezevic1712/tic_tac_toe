import axios from "axios";
// types
import type { RootState } from "../types/state";
// utils
import { setGamesList } from "../store/store";

export function fetchGames(userToken: string, url?: string) {
  return axios
    .get(url ?? "https://tictactoe.aboutdream.io/games/", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((res: { data: RootState["gamesList"] }) => {
      // console.log("AXIOS fetchGames, ", res.data);
      setGamesList(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log("Error fetching games list, ", e);
      return null;
    });
}

export function createNewGame(userToken: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/games/", undefined, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(async () => {
      await fetchGames(userToken);
    })
    .catch((e) => {
      console.log("Error fetching games list, ", e);
    });
}
