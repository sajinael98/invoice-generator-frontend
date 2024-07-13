import React from 'react'
import { TableBodyProps } from './TableBody.d'
import { flexRender } from '@tanstack/react-table'
import { Flex, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconDatabase } from '@tabler/icons-react'

const TableBody = ({ rowModel }: TableBodyProps) => {
    return (
        <tbody>
            {rowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            {rowModel().rows.length == 0 && <Flex w='100%' h={400} justify='center' align='center'>
                <Stack align='center'>
                    <ThemeIcon size='xl' variant='light'>
                        <IconDatabase />
                    </ThemeIcon>
                    <Text fw={700}>No Data</Text>
                </Stack>
            </Flex>}
        </tbody>
    )
}

export default TableBody