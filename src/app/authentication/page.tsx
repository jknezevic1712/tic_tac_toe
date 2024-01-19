"use client";

import { useState } from "react";
// components
import { Button } from "~/components/atoms/button/Button";
import AuthForm from "~/components/templates/authForm/AuthForm";
// utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
        </>
      )}
    </p>
  );
}

const authenticationSchema = z.object({
  username: z.string().min(5).max(10),
  password: z.string().min(5).max(30),
});
function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm<z.infer<typeof authenticationSchema>>({
    resolver: zodResolver(authenticationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof authenticationSchema>) {
    console.log(values);
  }

  function handleAuthTypeSwitch() {
    setIsLogin(!isLogin);
    form.clearErrors();
  }

  return (
    <main className="mt-32 flex w-full max-w-xs flex-col items-center justify-center gap-6 2xl:mt-52">
      <h1 className="text-4xl font-extrabold">
        {isLogin ? "Login" : "Register"}
      </h1>
      <AuthForm form={form} submitHandler={onSubmit} />
      <AuthTypeSwitch isLogin={isLogin} action={handleAuthTypeSwitch} />
    </main>
  );
}

export default AuthenticationPage;
