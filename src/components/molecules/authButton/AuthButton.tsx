"use client";

import { Button } from "~/components/atoms/button/Button";

function AuthButton() {
  const user = null; // Get user from custom store hook

  function handleAuth() {
    // if (user) return LogoutUser(); // Logout user and route him to landing page
    // return // Route user to login page
  }

  return (
    <div>
      <Button onClick={handleAuth}>{user ? "Logout" : "Login"}</Button>
    </div>
  );
}

export default AuthButton;
