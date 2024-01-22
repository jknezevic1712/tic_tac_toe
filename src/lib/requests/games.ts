import axios from "axios";
// components
import { toast } from "sonner";
// types
import type { Game, RootState } from "../types/state";
import { APIErrorResponse } from "../types/utility";
// utils
import { setCurrentGame, setGamesList } from "../store/store";

export function fetchGames(userToken: string, url?: string) {
  let correctUrl;

  if (url) {
    correctUrl = url.slice(0, 4) + "s" + url.slice(4);
  }

  return axios
    .get(correctUrl ?? "https://tictactoe.aboutdream.io/games/", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((res: { data: RootState["gamesList"] }) => {
      setGamesList(res.data);
      toast.success("Updated games!");
      return res.data;
    })
    .catch((e: APIErrorResponse) => {
      toast.error("Error while updating games!", {
        description: e.response.data.errors[0].message,
      });
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
    .then(async (res: { data: Game }) => {
      await fetchGames(userToken);
      toast.success("Game created!");
      return res.data;
    })
    .catch((e: APIErrorResponse) => {
      toast.error("Error creating a new game!", {
        description: e.response.data.errors[0].message,
      });
      return null;
    });
}

export function joinGame(userToken: string, gameId: number) {
  return axios
    .post(`https://tictactoe.aboutdream.io/games/${gameId}/join/`, undefined, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(() => toast.success("Joined game!"))
    .catch((e: APIErrorResponse) => {
      toast.error("Error joining the game!", {
        description: e.response.data.errors[0].message,
      });
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
    .catch((e: APIErrorResponse) => {
      toast.error("Error fetching game data!", {
        description: e.response.data.errors[0].message,
      });
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
      toast.success("Move made!");
    })
    .catch((e: APIErrorResponse) => {
      toast.error("Error making the move!", {
        description: e.response.data.errors[0].message,
      });
    });
}
