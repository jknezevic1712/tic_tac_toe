"use client";

import { useState } from "react";
// components
import { Button } from "~/components/atoms/button/Button";
import InputWithLabel from "~/components/molecules/inputWithLabel/InputWithLabel";

function AuthTypeSwitch({
  isLogin,
  action,
}: {
  isLogin: boolean;
  action: () => void;
}) {
  return (
    <p>
      {isLogin ? (
        <>
          Don&apos;t have an account?{" "}
          <Button className="text-base" variant="link" onClick={action}>
            Register now!
          </Button>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <Button className="text-base" variant="link" onClick={action}>
            Login now!
          </Button>
          {/* "cursor-pointer border-b border-zinc-950 p-1 lg:transition-all lg:hover:rounded-md lg:hover:border-transparent lg:hover:bg-zinc-950 lg:hover:text-zinc-100" */}
        </>
      )}
    </p>
  );
}

function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);

  function handleAuthTypeSwitch() {
    setIsLogin(!isLogin);
  }

  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-extrabold sm:text-sm">
        {isLogin ? "Login" : "Register"}
      </h1>

      <form className="flex flex-col gap-3">
        <InputWithLabel label="Username" type="text" autoFocus />
        <InputWithLabel label="Password" type="password" />
        <Button>Submit</Button>
      </form>

      <AuthTypeSwitch isLogin={isLogin} action={handleAuthTypeSwitch} />
    </main>
  );
}

export default AuthenticationPage;
