"use client";

import { useState } from "react";
// components
import { Button } from "~/components/atoms/button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/organisms/form/Form";
import { Input } from "~/components/atoms/input/input";
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
    <main className="mt-32 flex flex-col items-center justify-center gap-6 2xl:mt-52">
      <h1 className="text-4xl font-extrabold">
        {isLogin ? "Login" : "Register"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-xs flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <AuthTypeSwitch isLogin={isLogin} action={handleAuthTypeSwitch} />
    </main>
  );
}

export default AuthenticationPage;
