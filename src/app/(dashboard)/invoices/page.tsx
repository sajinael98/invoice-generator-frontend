"use client"

import TableBody from '@components/Table/TableBody'
import TableHeader from '@components/Table/TableHeader'
import { Badge, Table } from '@mantine/core'
import { InvoiceResponse, Status } from '@modules/invoices/types'
import { DeleteButton, EditButton, List } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

const InvoicesListPage = () => {
    const columns = React.useMemo<ColumnDef<InvoiceResponse>[]>(() => [
        {
            id: 'customerName',
            accessorKey: 'customerName',
            header: 'Customer'
        },
        {
            id: 'invoiceDate',
            accessorKey: 'invoiceDate',
            header: 'Date'
        },
    
        {
            id: 'status',
            accessorKey: 'status',
            header: 'Status',
            cell: function render({ getValue }) {
                const status: Status = getValue() as Status

                let color;
                if (status === Status.PENDING.toLocaleUpperCase()) {
                    color = 'red'
                } else if (status === Status.STARTED.toLocaleUpperCase()) {
                    color = 'orange'
                } else if (status === Status.COMPLETED.toLocaleUpperCase()) {
                    color = 'green'
                }
                return <Badge color={color}>{status}</Badge>
            }
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

    const { getHeaderGroups, getRowModel } = useTable({
        columns
    })

    return (
        <List>
            <Table>
                <TableHeader headerGroups={getHeaderGroups()} />
                <TableBody rows={getRowModel().rows} />
            </Table>
        </List>
    )
}

export default InvoicesListPage