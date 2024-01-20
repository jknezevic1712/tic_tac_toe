"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// components
import { Button } from "~/components/atoms/button/Button";
// utils
import { userLogout } from "~/lib/requests/authentication";

function AuthButton() {
  const router = useRouter();
  const user = null; // Get user from store
  const logoutUser = useMutation({
    mutationFn: () => userLogout(),
  });

  function handleAuth() {
    if (user) {
      logoutUser.mutate();
      return router.push("/");
    }
    return router.push("/authentication");
  }

  return <Button onClick={handleAuth}>{user ? "Logout" : "Login"}</Button>;
}

export default AuthButton;
