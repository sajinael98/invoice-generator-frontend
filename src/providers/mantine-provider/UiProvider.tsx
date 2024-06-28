"use client"
import { MantineProvider } from '@mantine/core'
import React, { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

const UiProvider = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider
            withNormalizeCSS
            withGlobalStyles
        >
            <SessionProvider >
                {children}
            </SessionProvider>
        </MantineProvider>
    )
}

export default UiProvider