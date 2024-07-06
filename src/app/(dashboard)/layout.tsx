import { Authenticated } from '@refinedev/core'
import { ThemedLayoutV2 } from '@refinedev/mantine'
import React, { PropsWithChildren } from 'react'

const layout = ({ children }: PropsWithChildren) => {
    return (
        <Authenticated key='authenticated-routes'>
            <ThemedLayoutV2>
                {children}
            </ThemedLayoutV2>
        </Authenticated>
    )
}

export default layout