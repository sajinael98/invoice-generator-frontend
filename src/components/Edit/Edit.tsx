import { useDocumentTitle } from '@mantine/hooks'
import { useResourceParams } from '@refinedev/core'
import { Edit as MantineEdit } from '@refinedev/mantine'
import React, { ComponentProps } from 'react'

const Edit = (props: ComponentProps<typeof MantineEdit>) => {
    const { resource, id } = useResourceParams()
    useDocumentTitle(`Update ${resource?.name}[${id}]`)

    return (
        <MantineEdit {...props}>
            {props.children}
        </MantineEdit>
    )
}

export default Edit