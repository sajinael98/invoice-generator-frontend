"use client"

import { Table } from '@mantine/core'
import { MissionResponse } from '@modules/missions/types'
import { DeleteButton, EditButton, List } from '@refinedev/mantine'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTable } from "@refinedev/react-table";
import TableHeader from '@components/Table/TableHeader'
import TableBody from '@components/Table/TableBody'

const MissionsListPage = () => {
    const columns = React.useMemo<ColumnDef<MissionResponse>[]>(() => [
        {
            id: 'title',
            accessorKey: 'title',
            header: 'Title'
        },
        {
            id: 'rate',
            accessorKey: 'rate',
            header: 'Rate'
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
                <TableHeader headerGroups={getHeaderGroups} />
                <TableBody rowModel={getRowModel} />
            </Table>
        </List>
    )
}

export default MissionsListPage
