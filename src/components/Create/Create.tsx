import { useDocumentTitle } from '@mantine/hooks'
import { useResource } from '@refinedev/core'
import { Create as CreateMantine } from '@refinedev/mantine'
import React, { ComponentProps } from 'react'

const Create = (props: ComponentProps<typeof CreateMantine>) => {
    const { resource } = useResource()
    useDocumentTitle(`Create ${resource?.name}`)
    
    return (
        <CreateMantine {...props}>
            {props.children}
        </CreateMantine>
    )
}

export default Create