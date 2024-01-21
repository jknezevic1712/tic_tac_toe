import axios from "axios";
// types
import type { Game } from "../types/state";
// utils

export function fetchGames(userToken: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/games/", undefined, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((res: { data: Game }) => {
      // console.log("games list data, ", res.data);
      return [res.data];
    })
    .catch((e) => {
      // console.log("Error fetching games list, ", e);
      return null;
    });
}
