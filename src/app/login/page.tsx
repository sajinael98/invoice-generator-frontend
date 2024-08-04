"use client"
import { useLogin } from "@refinedev/core";
import { AuthPage } from "@refinedev/mantine";

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
