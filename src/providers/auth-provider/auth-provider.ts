"use client";

import type { AuthProvider } from "@refinedev/core";
import { getSession, signIn, signOut } from "next-auth/react";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await signIn('CredentialsSignIn', {
      email,
      password,
      redirect: false
    })
    if (!response) {
      return {
        success: false
      }
    }

    if (response.ok) {
      return {
        success: true,
        redirectTo: '/', successNotification: {
          message: 'sadasdas',
          description: 'sadasdasdsa'
        }
      }
    }
    return {
      success: false,
      redirectTo: '/login'
    };
  },
  logout: async () => {
    return {
      success: false,
      redirectTo: "/login",
      then: await signOut()
    };
  },
  check: async (p) => {
    const session = await getSession()
    if (session?.user) {
      return {
        authenticated: true
      }
    }
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    throw Error("not implemented!")
  },
  getIdentity: async () => {
    throw Error("not implemented!")
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }
    return { error };
  },
};
