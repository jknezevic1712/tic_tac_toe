import axios from "axios";

export function userRegisteration(username: string, password: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/register/", {
      username,
      password,
    })
    .then((res: { data: string }) => res)
    .catch((e) => console.log(e));
}

export function userLogin(username: string, password: string) {
  return axios
    .post("https://tictactoe.aboutdream.io/login/", {
      username,
      password,
    })
    .then((res: { data: string }) => res)
    .catch((e) => console.log(e));
}

export function userLogout() {
  const token = ""; // Get from store

  return axios
    .post("https://tictactoe.aboutdream.io/logout/", undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: { data: string }) => res)
    .catch((e) => console.log(e));
}
