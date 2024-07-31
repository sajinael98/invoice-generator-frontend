import React from 'react'
import { TableHeaderProps } from './TableHeader.d'
import { flexRender } from '@tanstack/react-table'
import { Box, Group } from '@mantine/core'
import { ColumnSorter } from '../ColumnSorter'
import { ColumnFilter } from '../ColumnFilter'

const TableHeader = ({ headerGroups }: TableHeaderProps) => {
    return (
        <thead>
        {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                        <th key={header.id}>
                            {!header.isPlaceholder && (
                                <Group spacing="xs" noWrap>
                                    <Box>
                                        {flexRender(
                                            header.column.columnDef
                                                .header,
                                            header.getContext(),
                                        )}
                                    </Box>
                                    {header.id !== 'actions' && <Group spacing="xs" noWrap>
                                        <ColumnSorter
                                            column={header.column}
                                        />
                                        <ColumnFilter
                                            column={header.column}
                                        />
                                    </Group>}
                                </Group>
                            )}
                        </th>
                    );
                })}
            </tr>
        ))}
    </thead>
    )
}

export default React.memo(TableHeader)