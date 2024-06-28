"use client"
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";
import { AuthPage } from "@refinedev/mantine";
import { useLogin } from "@refinedev/core";

export default function Login() {
  // const data = await getData();
  const { mutate } = useLogin()


  return <AuthPage
    type="login"
    formProps={{
      initialValues: {
        email: 'admin@gmail.com',
        password: 'password'
      },
      onSubmit(values) {
        mutate(values)
      },
    }} />;
}

// async function getData() {
//   const { authenticated, redirectTo, error } = await authProviderServer.check();

//   return {
//     authenticated,
//     redirectTo,
//     error,
//   };
// }
