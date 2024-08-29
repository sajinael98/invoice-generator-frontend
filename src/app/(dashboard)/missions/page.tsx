"use client"

import { Table } from '@mantine/core'
import { IMission } from '@modules/missions/types'
import { DeleteButton, EditButton, List } from '@refinedev/mantine'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTable } from "@refinedev/react-table";
import TableHeader from '@components/Table/TableHeader'
import TableBody from '@components/Table/TableBody'
import { useDocumentTitle } from '@mantine/hooks'

const MissionsListPage = () => {
    useDocumentTitle('missions')
    
    const columns = React.useMemo<ColumnDef<IMission>[]>(() => [
        {
            id: 'title',
            accessorKey: 'title',
            header: 'Title'
        },
        {
            id: 'hourlyRate',
            accessorKey: 'hourlyRate',
            header: 'Hourly Rate'
        },
        {
            id: 'estimatedMins',
            accessorKey: 'estimatedMins',
            header: 'Estimated Mins'
        },
        {
            id: "actions",
            accessorKey: "id",
            header: "Actions",
            cell: function render({ getValue }) {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "4px",
                        }}
                    >
                        <EditButton recordItemId={getValue() as number} />
                        <DeleteButton recordItemId={getValue() as number} />
                    </div>
                );
            },
        },
    ], [])

    const { getHeaderGroups, getRowModel } = useTable({ columns })

    return (
        <List>
            <Table>
                <TableHeader headerGroups={getHeaderGroups()} />
                <TableBody rows={getRowModel().rows} />
            </Table>
        </List>
    )
}

export default MissionsListPage
