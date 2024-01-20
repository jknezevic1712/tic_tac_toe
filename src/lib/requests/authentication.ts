import axios from "axios";
// types
import type { User } from "../types/state";
// utils
import { setUser, resetUser } from "../store/store";

export function userRegisteration(username: string, password: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/register/", {
      username,
      password,
    })
    .then(async () => await userLogin(username, password))
    .catch((e) => console.log(e));
}

export function userLogin(username: string, password: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/login/", {
      username,
      password,
    })
    .then((res: { data: User }) => {
      setUser(res.data);
      return true;
    })
    .catch(() => false);
}

export function userLogout(userToken: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/logout/", undefined, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(() => resetUser())
    .catch((e) => console.log(e));
}
