import axios from "axios";
// components
import { toast } from "sonner";
// types
import type { User } from "../types/state";
// utils
import { setUser, resetState } from "../store/store";

export function userRegisteration(username: string, password: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/register/", {
      username,
      password,
    })
    .then(async () => userLogin(username, password))
    .catch((e) =>
      toast.error("Error creating a new game!", {
        description: e.response.data.errors[0].message,
      }),
    );
}

export function userLogin(username: string, password: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/login/", {
      username,
      password,
    })
    .then((res: { data: User }) => {
      setUser(res.data);
      toast.success("Successfully logged in!");
      return true;
    })
    .catch((e) => {
      toast.error("Error creating a new game!", {
        description: e.response.data.errors[0].message,
      });
      return false;
    });
}

export function userLogout(userToken: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/logout/", undefined, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(() => {
      resetState();
      toast.success("Logged out successfully!");
    })
    .catch((e) =>
      toast.error("Error creating a new game!", {
        description: e.response.data.errors[0].message,
      }),
    );
}
