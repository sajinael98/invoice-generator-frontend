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
        redirectTo: '/',
        successNotification:{
          message:'Welcome'
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
      then: await signOut({ redirect: false })
    };
  },
  check: async () => {
    const session = await getSession()

    const expirationDate = new Date(session?.expires as string)
    const currentDate = new Date()
    
    if (expirationDate > currentDate && session?.user) {
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
    const session = await getSession()
    return session?.user.permissions ?? []
  },
  getIdentity: async () => {
    return {}
  },
  onError: async (error) => {
    if ([401, 403].includes(error.response?.status)) {
      return {
        logout: true,
      };
    }
    return { error };
  },
};
