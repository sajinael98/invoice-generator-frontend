import { accessControlPorvider } from "@providers/access-control-provider";
import { authProvider } from "@providers/auth-provider";
import { provider as dataProvider } from "@providers/data-provider";
import SessionProvider from "@providers/session-provider";
import UiProvider from "@providers/ui-provider";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/mantine";

import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Refine",
  description: "Generated by create refine app",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <UiProvider>
            <Suspense>
              <RefineKbarProvider>
                {/* <DevtoolsProvider> */}
                <Refine
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerProvider}
                  dataProvider={dataProvider}
                  authProvider={authProvider}
                  accessControlProvider={accessControlPorvider}
                  resources={[
                    {
                      name: "users",
                      list: "/users",
                      create: "/users/create",
                      edit: "/users/edit/:id",
                    },
                    {
                      name: 'workers',
                      list: '/workers',
                      create: '/workers/create',
                      edit: '/workers/edit/:id',
                    },
                    {
                      name: 'customers',
                      list: '/customers',
                      create: '/customers/create',
                      edit: '/customers/edit/:id'
                    },
                    {
                      name: 'missions',
                      list: '/missions',
                      create: '/missions/create',
                      edit: '/missions/edit/:id'
                    },
                    {
                      name: 'invoices',
                      list: '/invoices',
                      create: '/invoices/create',
                      edit: '/invoices/edit/:id',
                    }
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "SMJUok-UvWd6Q-1HkzYq",
                  }}
                >
                  {children}
                  <RefineKbar />
                </Refine>
                {/* </DevtoolsProvider> */}
              </RefineKbarProvider>
            </Suspense>
          </UiProvider>
        </SessionProvider>
      </body>
    </html >
  );
}
