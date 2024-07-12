"use client"
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { PropsWithChildren } from 'react'

const UiProvider = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider
            withNormalizeCSS
            withGlobalStyles
            theme={{
                primaryColor: 'teal',
                colorScheme: 'dark',
                components: {
                    Table: {
                        defaultProps: {
                            striped: true,
                            highlightOnHover: true,
                            withBorder: true,
                            withColumnBorders: true,
                        }
                    }
                }
            }}
        >
            <NotificationsProvider position='bottom-right'>
                {children}
            </NotificationsProvider>
        </MantineProvider>
    )
}

export default UiProvider