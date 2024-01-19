"use client";

import Link from "next/link";
import { Button } from "~/components/atoms/button/Button";

function AuthButton() {
  const user = null; // Get user from custom store hook

  function handleAuth() {
    // if (user) return LogoutUser(); // Logout user and route him to landing page
    // return // Route user to login page
  }

  return user ? (
    <Button onClick={handleAuth}>Logout</Button>
  ) : (
    <Link href="/authentication">
      <Button onClick={handleAuth}>Login</Button>
    </Link>
  );
}

export default AuthButton;
