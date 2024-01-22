import axios from "axios";
// types
import type { Game, RootState } from "../types/state";
// utils
import { setCurrentGame, setGamesList } from "../store/store";

export function fetchGames(userToken: string, url?: string) {
  return axios
    .get(url ?? "https://tictactoe.aboutdream.io/games/", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((res: { data: RootState["gamesList"] }) => {
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

export function joinGame(userToken: string, gameId: number) {
  console.log("AXIOS joinGame, ", userToken, ", ", gameId);
  return axios
    .post(`https://tictactoe.aboutdream.io/games/${gameId}/join/`, undefined, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .catch((e) => {
      console.log("Error fetching games list, ", e);
    });
}

export function fetchGame(userToken: string, gameId: number) {
  return axios
    .get(`https://tictactoe.aboutdream.io/games/${gameId}/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((res: { data: Game }) => {
      setCurrentGame(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log("Error fetching games list, ", e);
      return null;
    });
}

export function makeMove(
  userToken: string,
  gameId: number,
  move: { row: number; col: number },
) {
  return axios
    .post(`https://tictactoe.aboutdream.io/games/${gameId}/move/`, move, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(async () => {
      await fetchGame(userToken, gameId);
    })
    .catch((e) => {
      console.log("Error fetching games list, ", e);
    });
}
