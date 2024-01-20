"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// components
import { Button } from "~/components/atoms/button/Button";
import AuthForm from "~/components/templates/authForm/AuthForm";
// utils
import * as z from "zod";
import { userRegisteration, userLogin } from "~/lib/requests/authentication";

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

type AuthUserMutationProps = {
  username: string;
  password: string;
};
const authenticationSchema = z.object({
  username: z.string().min(5).max(10),
  password: z.string().min(5).max(30),
});
function AuthenticationPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const authUser = useMutation({
    mutationFn: ({ username, password }: AuthUserMutationProps) =>
      authUserMutation(username, password),
  });

  function authUserMutation(
    username: AuthUserMutationProps["username"],
    password: AuthUserMutationProps["password"],
  ) {
    if (isLogin) {
      return userLogin(username, password).then((result) => {
        if (result) return router.push("/");
      });
    }
    return userRegisteration(username, password).then((result) => {
      if (result) return router.push("/");
    });
  }

  const form = useForm<z.infer<typeof authenticationSchema>>({
    resolver: zodResolver(authenticationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit({
    username,
    password,
  }: z.infer<typeof authenticationSchema>) {
    authUser.mutate({ username, password });
  }

  function handleAuthTypeSwitch() {
    setIsLogin(!isLogin);
    form.clearErrors();
  }

  return (
    <main className="mt-32 flex w-full max-w-xs flex-col items-center justify-center gap-6 2xl:mt-52">
      <h1 className="text-4xl font-extrabold sm:text-5xl">
        {isLogin ? "Login" : "Register"}
      </h1>
      <AuthForm form={form} submitHandler={onSubmit} />
      <AuthTypeSwitch isLogin={isLogin} action={handleAuthTypeSwitch} />
    </main>
  );
}

export default AuthenticationPage;
