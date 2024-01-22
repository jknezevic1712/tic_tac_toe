"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// components
import { Button } from "~/components/atoms/button/Button";
// utils
import { userLogout } from "~/lib/requests/authentication";
import { useStore } from "~/lib/store/store";

function AuthButton() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const logoutUser = useMutation({
    mutationFn: () => userLogout(user!.token),
  });

  function handleAuth() {
    router.push("/authentication");

    if (user) {
      logoutUser.mutate();
    }
  }

  return <Button onClick={handleAuth}>{user ? "Logout" : "Login"}</Button>;
}

export default AuthButton;
