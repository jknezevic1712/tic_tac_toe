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

  return (
    <div className="flex items-center justify-center gap-3 lg:gap-6">
      {user && (
        <span>
          Hello, <strong>{user.username}</strong>
        </span>
      )}
      <Button onClick={handleAuth}>{user ? "Logout" : "Login"}</Button>
    </div>
  );
}

export default AuthButton;
